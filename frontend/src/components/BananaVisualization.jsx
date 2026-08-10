import { useMemo } from "react";

function BananaVisualization({ colorHex, colorRgb }) {
    const r = colorRgb?.r ?? 197;
    const g = colorRgb?.g ?? 247;
    const b = colorRgb?.b ?? 192;

    const bananaColor = colorHex || `rgb(${r}, ${g}, ${b})`;

    const darkColor = `rgb(
        ${Math.max(r - 45, 0)},
        ${Math.max(g - 45, 0)},
        ${Math.max(b - 45, 0)}
    )`;

    const lightColor = `rgb(
        ${Math.min(r + 35, 255)},
        ${Math.min(g + 35, 255)},
        ${Math.min(b + 35, 255)}
    )`;

    /*
     * Clasificación visual aproximada.
     * NO representa una medición científica de maduración.
     */
    const estado = useMemo(() => {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        // Marrón / muy oscuro
        if (r > g && g > b && r > 100 && g < 150) {
            return "Muy maduro";
        }

        // Amarillo
        if (r > 170 && g > 150 && b < 130) {
            return "Amarillo maduro";
        }

        // Verde amarillento
        if (g >= r && g > b) {
            if (r > 150) {
                return "Verde claro";
            }

            return "Verde";
        }

        // Colores muy oscuros
        if (max - min < 30 && max < 100) {
            return "Muy maduro";
        }

        return "En transición";
    }, [r, g, b]);

    const showSpots =
        estado === "Amarillo maduro" ||
        estado === "Muy maduro";

    return (
        <div className="banana-visualization">

            <div className="banana-title">
                <span>Estado del banano</span>

                <span className="banana-status">
                    {estado}
                </span>
            </div>

            <div className="banana-container">

                <svg
                    viewBox="0 0 600 500"
                    className="banana-svg"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <defs>

                        <linearGradient
                            id="bananaBodyGradient"
                            x1="15%"
                            y1="10%"
                            x2="85%"
                            y2="90%"
                        >
                            <stop
                                offset="0%"
                                stopColor={lightColor}
                            />

                            <stop
                                offset="35%"
                                stopColor={bananaColor}
                            />

                            <stop
                                offset="75%"
                                stopColor={bananaColor}
                            />

                            <stop
                                offset="100%"
                                stopColor={darkColor}
                            />
                        </linearGradient>

                        <linearGradient
                            id="stemGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#8bc34a"
                            />

                            <stop
                                offset="100%"
                                stopColor="#285c19"
                            />
                        </linearGradient>

                        <filter
                            id="bananaDropShadow"
                            x="-30%"
                            y="-30%"
                            width="160%"
                            height="170%"
                        >
                            <feDropShadow
                                dx="0"
                                dy="15"
                                stdDeviation="12"
                                floodOpacity="0.18"
                            />
                        </filter>
                    </defs>

                    {/* Sombra */}
                    <ellipse
                        cx="310"
                        cy="430"
                        rx="205"
                        ry="24"
                        fill="#000"
                        opacity="0.10"
                    />

                    {/* BANANO */}
                    <path
                        d="
                            M 110 165

                            C 135 230,
                              175 300,
                              245 345

                            C 320 393,
                              405 397,
                              477 347

                            C 520 317,
                              540 276,
                              538 235

                            C 536 215,
                              514 207,
                              500 224

                            C 480 249,
                              450 267,
                              415 271

                            C 367 277,
                              326 256,
                              293 224

                            C 260 192,
                              237 150,
                              222 105

                            C 214 80,
                              190 66,
                              166 76

                            C 142 87,
                              124 117,
                              110 165

                            Z
                        "
                        fill="url(#bananaBodyGradient)"
                        stroke="#171717"
                        strokeWidth="10"
                        strokeLinejoin="round"
                        filter="url(#bananaDropShadow)"
                    />

                    {/* Parte interior clara */}
                    <path
                        d="
                            M 135 170

                            C 168 242,
                              208 290,
                              268 326

                            C 332 365,
                              407 367,
                              471 329

                            C 431 353,
                              369 355,
                              315 328

                            C 245 293,
                              193 238,
                              158 165

                            Z
                        "
                        fill={lightColor}
                        opacity="0.35"
                    />

                    {/* Brillo principal */}
                    <path
                        d="
                            M 175 128

                            C 196 188,
                              236 244,
                              292 279
                        "
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="17"
                        strokeLinecap="round"
                        opacity="0.70"
                    />

                    {/* Segundo brillo */}
                    <path
                        d="
                            M 196 126

                            C 216 176,
                              245 216,
                              280 240
                        "
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="7"
                        strokeLinecap="round"
                        opacity="0.55"
                    />

                    {/* Tallo */}
                    <path
                        d="
                            M 158 82
                            C 145 65,
                              143 43,
                              150 25

                            L 190 22

                            C 185 45,
                              190 66,
                              205 91

                            Z
                        "
                        fill="url(#stemGradient)"
                        stroke="#171717"
                        strokeWidth="9"
                        strokeLinejoin="round"
                    />

                    {/* Parte superior del tallo */}
                    <path
                        d="
                            M 148 27
                            C 151 15,
                              169 8,
                              190 15

                            L 190 27

                            C 174 22,
                              160 25,
                              148 27

                            Z
                        "
                        fill="#254d16"
                        stroke="#171717"
                        strokeWidth="7"
                    />

                    {/* Manchas */}
                    {showSpots && (
                        <g fill="#60401c">

                            <circle
                                cx="275"
                                cy="300"
                                r="7"
                                opacity="0.65"
                            />

                            <circle
                                cx="320"
                                cy="333"
                                r="5"
                                opacity="0.70"
                            />

                            <circle
                                cx="365"
                                cy="345"
                                r="8"
                                opacity="0.55"
                            />

                            <circle
                                cx="420"
                                cy="326"
                                r="5"
                                opacity="0.65"
                            />

                            <circle
                                cx="455"
                                cy="300"
                                r="7"
                                opacity="0.55"
                            />

                            <circle
                                cx="250"
                                cy="275"
                                r="4"
                                opacity="0.50"
                            />

                        </g>
                    )}

                </svg>

            </div>

            <div className="banana-color-info">

                <div>
                    <span className="color-label">
                        Color detectado
                    </span>

                    <strong>
                        {colorHex}
                    </strong>
                </div>

                <div>
                    <span className="color-label">
                        RGB
                    </span>

                    <strong>
                        {r}, {g}, {b}
                    </strong>
                </div>

            </div>

        </div>
    );
}

export default BananaVisualization;