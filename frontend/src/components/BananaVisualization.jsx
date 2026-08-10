import { useMemo } from "react";
import { Info } from "lucide-react";

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
        const hex = colorHex.replace("#", "").trim();
        if (/^[0-9a-fA-F]{6}$/.test(hex)) {
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16),
            };
        }
    }

    return { r: 244, g: 230, b: 66 };
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;

    if (d !== 0) {
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;

        h *= 60;
        if (h < 0) h += 360;
    }

    return { h, s: max === 0 ? 0 : d / max, v: max };
}

function classifyColor(r, g, b) {
    const { h, s, v } = rgbToHsv(r, g, b);

    if (v < 0.25) return { label: "Muy maduro", index: 96 };
    if (h >= 75 && h <= 150 && s > 0.18) return { label: "Verde", index: 28 };
    if (h >= 35 && h < 75 && s > 0.18 && r >= g * 0.92) {
        return { label: "Amarillo", index: 78 };
    }

    if (r > 95 && r > g * 1.08 && g > b * 1.08) {
        return { label: "Muy maduro", index: 92 };
    }

    if (r > 170 && g > 145 && b < 140) {
        return { label: "Amarillo", index: 78 };
    }

    if (g >= r * 0.95 && g > b * 1.08) return { label: "Verde", index: 28 };

    return { label: "Maduro", index: 60 };
}

function BananaVisualization({ colorHex, colorRgb, colorPuro }) {
    const { r, g, b } = normalizeRgb(colorRgb, colorHex);

    const safeR = Math.max(0, Math.min(255, r));
    const safeG = Math.max(0, Math.min(255, g));
    const safeB = Math.max(0, Math.min(255, b));

    const bananaColor = `rgb(${safeR}, ${safeG}, ${safeB})`;

    const darkColor = `rgb(
        ${Math.max(safeR - 48, 0)},
        ${Math.max(safeG - 48, 0)},
        ${Math.max(safeB - 48, 0)}
    )`;

    const lightColor = `rgb(
        ${Math.min(safeR + 38, 255)},
        ${Math.min(safeG + 38, 255)},
        ${Math.min(safeB + 38, 255)}
    )`;

    const colorInfo = useMemo(() => {
        const estado = String(colorPuro ?? "").trim().toLowerCase();

        if (estado.includes("muy maduro") || estado.includes("muy_maduro") || estado.includes("very ripe")) {
            return { label: "Muy maduro", index: 96 };
        }
        if (estado.includes("amarillo") || estado.includes("yellow")) {
            return { label: "Amarillo", index: 78 };
        }
        if (estado === "maduro" || estado.includes("maduro")) {
            return { label: "Maduro", index: 60 };
        }
        if (estado.includes("verde") || estado.includes("green")) {
            return { label: "Verde", index: 28 };
        }

        return classifyColor(safeR, safeG, safeB);
    }, [colorPuro, safeR, safeG, safeB]);

    const showSpots =
        colorInfo.label === "Amarillo" ||
        colorInfo.label === "Muy maduro";

    const displayHex =
        typeof colorHex === "string" && colorHex.trim()
            ? colorHex.toUpperCase()
            : `#${[safeR, safeG, safeB].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;

    return (
        <div className="banana-visualization">
            <div className="banana-panel-title">
                <h2>Estado del banano</h2>
                <span
                    className="banana-status"
                    style={{
                        backgroundColor: `rgba(${safeR}, ${safeG}, ${safeB}, .16)`,
                        color: darkColor,
                    }}
                >
                    {colorInfo.label}
                </span>
            </div>

            <div className="banana-main">
                <div className="banana-container">
                    <svg
                        viewBox="0 0 600 500"
                        className="banana-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label={`Banano con color detectado ${displayHex}`}
                    >
                        <defs>
                            <linearGradient id="bananaBodyGradient" x1="15%" y1="10%" x2="85%" y2="90%">
                                <stop offset="0%" stopColor={lightColor} />
                                <stop offset="32%" stopColor={bananaColor} />
                                <stop offset="72%" stopColor={bananaColor} />
                                <stop offset="100%" stopColor={darkColor} />
                            </linearGradient>

                            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8bc34a" />
                                <stop offset="100%" stopColor="#285c19" />
                            </linearGradient>

                            <filter id="bananaDropShadow" x="-30%" y="-30%" width="160%" height="170%">
                                <feDropShadow dx="0" dy="15" stdDeviation="12" floodOpacity="0.18" />
                            </filter>
                        </defs>

                        <ellipse cx="310" cy="430" rx="205" ry="24" fill="#000" opacity="0.10" />

                        <path
                            d="M 110 165 C 135 230, 175 300, 245 345 C 320 393, 405 397, 477 347 C 520 317, 540 276, 538 235 C 536 215, 514 207, 500 224 C 480 249, 450 267, 415 271 C 367 277, 326 256, 293 224 C 260 192, 237 150, 222 105 C 214 80, 190 66, 166 76 C 142 87, 124 117, 110 165 Z"
                            fill="url(#bananaBodyGradient)"
                            stroke="#171717"
                            strokeWidth="10"
                            strokeLinejoin="round"
                            filter="url(#bananaDropShadow)"
                            style={{ transition: "fill 0.5s ease" }}
                        />

                        <path
                            d="M 135 170 C 168 242, 208 290, 268 326 C 332 365, 407 367, 471 329 C 431 353, 369 355, 315 328 C 245 293, 193 238, 158 165 Z"
                            fill={lightColor}
                            opacity="0.35"
                        />

                        <path
                            d="M 175 128 C 196 188, 236 244, 292 279"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="17"
                            strokeLinecap="round"
                            opacity="0.70"
                        />

                        <path
                            d="M 196 126 C 216 176, 245 216, 280 240"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="7"
                            strokeLinecap="round"
                            opacity="0.55"
                        />

                        <path
                            d="M 158 82 C 145 65, 143 43, 150 25 L 190 22 C 185 45, 190 66, 205 91 Z"
                            fill="url(#stemGradient)"
                            stroke="#171717"
                            strokeWidth="9"
                            strokeLinejoin="round"
                        />

                        <path
                            d="M 148 27 C 151 15, 169 8, 190 15 L 190 27 C 174 22, 160 25, 148 27 Z"
                            fill="#254d16"
                            stroke="#171717"
                            strokeWidth="7"
                        />

                        {showSpots && (
                            <g fill="#60401c">
                                <circle cx="275" cy="300" r="7" opacity="0.65" />
                                <circle cx="320" cy="333" r="5" opacity="0.70" />
                                <circle cx="365" cy="345" r="8" opacity="0.55" />
                                <circle cx="420" cy="326" r="5" opacity="0.65" />
                                <circle cx="455" cy="300" r="7" opacity="0.55" />
                                <circle cx="250" cy="275" r="4" opacity="0.50" />
                            </g>
                        )}
                    </svg>
                </div>

                <div className="banana-details">
                    <div className="detected-color-row">
                        <div>
                            <span className="detail-label">Color detectado</span>
                            <strong className="hex-value">{displayHex}</strong>
                        </div>

                        <span
                            className="color-swatch"
                            style={{ backgroundColor: bananaColor }}
                            title={`Color detectado: ${displayHex}`}
                        />
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">RGB</span>
                        <strong>{safeR}, {safeG}, {safeB}</strong>
                    </div>

                    <div className="detail-row visual-index-row">
                        <span className="detail-label">Índice visual de color</span>
                        <strong className="visual-index">{colorInfo.index}%</strong>
                        <p>
                            <Info size={18} />
                            Índice visual basado en el color detectado.
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default BananaVisualization;
