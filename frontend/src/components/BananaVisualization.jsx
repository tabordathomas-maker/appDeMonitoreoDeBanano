import { useMemo } from "react";
import { Info } from "lucide-react";



/* ============================================================
   NORMALIZAR RGB
============================================================ */

function normalizeRgb(colorRgb, colorHex) {
    if (colorRgb && typeof colorRgb === "object") {
        return {
            r: Number(colorRgb.r ?? colorRgb.R ?? 0),
            g: Number(colorRgb.g ?? colorRgb.G ?? 0),
            b: Number(colorRgb.b ?? colorRgb.B ?? 0),
        };
    }

    if (Array.isArray(colorRgb)) {
        return {
            r: Number(colorRgb[0] ?? 0),
            g: Number(colorRgb[1] ?? 0),
            b: Number(colorRgb[2] ?? 0),
        };
    }

    if (typeof colorRgb === "string") {
        const values = colorRgb.match(/\d+(?:\.\d+)?/g);

        if (values?.length >= 3) {
            return {
                r: Number(values[0]),
                g: Number(values[1]),
                b: Number(values[2]),
            };
        }
    }

    if (typeof colorHex === "string") {
        const hex = colorHex
            .replace("#", "")
            .trim();

        if (/^[0-9a-fA-F]{6}$/.test(hex)) {
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16),
            };
        }
    }

    // Amarillo por defecto
    return {
        r: 244,
        g: 230,
        b: 66,
    };
}


/* ============================================================
   RGB -> HSV
============================================================ */

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const d = max - min;

    let h = 0;

    if (d !== 0) {
        if (max === r) {
            h = ((g - b) / d) % 6;
        } else if (max === g) {
            h = (b - r) / d + 2;
        } else {
            h = (r - g) / d + 4;
        }

        h *= 60;

        if (h < 0) {
            h += 360;
        }
    }

    return {
        h,
        s: max === 0 ? 0 : d / max,
        v: max,
    };
}


/* ============================================================
   CLASIFICAR COLOR
============================================================ */

function classifyColor(r, g, b) {
    const { h, s, v } = rgbToHsv(r, g, b);

    if (v < 0.25) {
        return {
            label: "Muy maduro",
            index: 96,
        };
    }

    if (
        h >= 75 &&
        h <= 150 &&
        s > 0.18
    ) {
        return {
            label: "Verde",
            index: 28,
        };
    }

    if (
        h >= 35 &&
        h < 75 &&
        s > 0.18 &&
        r >= g * 0.92
    ) {
        return {
            label: "Amarillo",
            index: 78,
        };
    }

    if (
        r > 95 &&
        r > g * 1.08 &&
        g > b * 1.08
    ) {
        return {
            label: "Muy maduro",
            index: 92,
        };
    }

    if (
        r > 170 &&
        g > 145 &&
        b < 140
    ) {
        return {
            label: "Amarillo",
            index: 78,
        };
    }

    if (
        g >= r * 0.95 &&
        g > b * 1.08
    ) {
        return {
            label: "Verde",
            index: 28,
        };
    }

    return {
        label: "Maduro",
        index: 60,
    };
}


/* ============================================================
   COMPONENTE
============================================================ */

function BananaVisualization({
    colorHex,
    colorRgb,
    colorPuro,
}) {

  

    /* ========================================================
       COLOR
    ======================================================== */

    const {
        r,
        g,
        b,
    } = normalizeRgb(
        colorRgb,
        colorHex
    );

    const safeR = Math.max(
        0,
        Math.min(255, r)
    );

    const safeG = Math.max(
        0,
        Math.min(255, g)
    );

    const safeB = Math.max(
        0,
        Math.min(255, b)
    );


    /* ========================================================
       ESTADO
    ======================================================== */

    const colorInfo = useMemo(() => {

        const estado = String(
            colorPuro ?? ""
        )
            .trim()
            .toLowerCase();


        if (
            estado.includes("muy maduro") ||
            estado.includes("muy_maduro") ||
            estado.includes("very ripe")
        ) {
            return {
                label: "Muy maduro",
                index: 96,
            };
        }


        if (
            estado.includes("amarillo") ||
            estado.includes("yellow")
        ) {
            return {
                label: "Amarillo",
                index: 78,
            };
        }


        if (
            estado === "maduro" ||
            estado.includes("maduro")
        ) {
            return {
                label: "Maduro",
                index: 60,
            };
        }


        if (
            estado.includes("verde") ||
            estado.includes("green")
        ) {
            return {
                label: "Verde",
                index: 28,
            };
        }


        return classifyColor(
            safeR,
            safeG,
            safeB
        );

    }, [
        colorPuro,
        safeR,
        safeG,
        safeB,
    ]);


    /* ========================================================
       HSV DEL COLOR DETECTADO
    ======================================================== */

    const hsv = useMemo(() => {
        return rgbToHsv(
            safeR,
            safeG,
            safeB
        );
    }, [
        safeR,
        safeG,
        safeB,
    ]);


    /* ========================================================
       FILTRO DE COLOR
       
       La ilustración original es verde.

       Aproximadamente:
       verde referencia = 90°
    ======================================================== */

    const bananaFilter = useMemo(() => {

        const referenceHue = 90;

        let hueRotation =
            hsv.h - referenceHue;

        /*
         * Evitamos rotaciones enormes.
         */
        while (hueRotation > 180) {
            hueRotation -= 360;
        }

        while (hueRotation < -180) {
            hueRotation += 360;
        }


        /*
         * Saturación.
         */
        const saturation =
            Math.max(
                0.75,
                Math.min(
                    1.7,
                    0.8 + hsv.s * 0.9
                )
            );


        /*
         * Brillo.
         *
         * No queremos que un RGB oscuro convierta toda
         * la ilustración en una silueta negra.
         */
        const brightness =
            Math.max(
                0.75,
                Math.min(
                    1.15,
                    0.82 + hsv.v * 0.30
                )
            );


        /*
         * Estados especiales.
         */

        if (
            colorInfo.label === "Muy maduro"
        ) {
            return `
                hue-rotate(${hueRotation}deg)
                saturate(0.80)
                brightness(0.82)
            `;
        }


        if (
            colorInfo.label === "Maduro"
        ) {
            return `
                hue-rotate(${hueRotation}deg)
                saturate(1.05)
                brightness(0.96)
            `;
        }


        return `
            hue-rotate(${hueRotation}deg)
            saturate(${saturation})
            brightness(${brightness})
        `;

    }, [
        hsv.h,
        hsv.s,
        hsv.v,
        colorInfo.label,
    ]);


    /* ========================================================
       HEX
    ======================================================== */

    const displayHex =
        typeof colorHex === "string" &&
        colorHex.trim()

            ? colorHex.toUpperCase()

            : `#${[
                safeR,
                safeG,
                safeB,
            ]
                .map((value) =>
                    value
                        .toString(16)
                        .padStart(2, "0")
                )
                .join("")
                .toUpperCase()}`;


    /* ========================================================
       RGB
    ======================================================== */

    const displayRgb =
        `${safeR}, ${safeG}, ${safeB}`;


    /* ========================================================
       RENDER
    ======================================================== */

    return (
        <div className="banana-visualization">

            {/* ==================================================
                TÍTULO
            =================================================== */}

            <div className="banana-panel-title">

                <h2>
                    Estado del banano
                </h2>

                <span
                    className="banana-status"
                    style={{
                        backgroundColor:
                            `rgba(
                                ${safeR},
                                ${safeG},
                                ${safeB},
                                0.16
                            )`,

                        color:
                            `rgb(
                                ${Math.max(safeR - 50, 0)},
                                ${Math.max(safeG - 50, 0)},
                                ${Math.max(safeB - 50, 0)}
                            )`,
                    }}
                >
                    {colorInfo.label}
                </span>

            </div>


            {/* ==================================================
                CONTENIDO
            =================================================== */}

            <div className="banana-main">


                {/* ==============================================
                    BANANO
                =============================================== */}

                <div
                    className="banana-container"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >

                  <img
                        src="/banana_reference_transparent.png"
                        alt={`Banano en estado ${colorInfo.label}`}
                        className="banana-reference-image"
                        style={{
                            width: "320px",
                            maxWidth: "100%",
                            height: "auto",
                            display: "block",
                            filter: bananaFilter,
                            transition: "filter 0.7s ease",
                        }}
                    />

                </div>


                {/* ==============================================
                    INFORMACIÓN
                =============================================== */}

                <div className="banana-details">


                    {/* ------------------------------------------
                        COLOR
                    ------------------------------------------- */}

                    <div className="detected-color-row">

                        <div>

                            <span className="detail-label">
                                Color detectado
                            </span>

                            <strong className="hex-value">
                                {displayHex}
                            </strong>

                        </div>


                        <span
                            className="color-swatch"
                            style={{
                                backgroundColor:
                                    `rgb(
                                        ${safeR},
                                        ${safeG},
                                        ${safeB}
                                    )`,
                            }}
                            title={
                                `Color detectado: ${displayHex}`
                            }
                        />

                    </div>


                    {/* ------------------------------------------
                        RGB
                    ------------------------------------------- */}

                    <div className="detail-row">

                        <span className="detail-label">
                            RGB
                        </span>

                        <strong>
                            {displayRgb}
                        </strong>

                    </div>


                    {/* ------------------------------------------
                        ÍNDICE
                    ------------------------------------------- */}

                    <div
                        className="detail-row visual-index-row"
                    >

                        <span
                            className="detail-label"
                        >
                            Índice visual de color
                        </span>

                        <strong
                            className="visual-index"
                        >
                            {colorInfo.index}%
                        </strong>


                        <p>
                            <Info size={18} />

                            Índice visual basado en
                            el color detectado.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BananaVisualization;