import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
} from "recharts";
import { MoreVertical } from "lucide-react";

function formatDateTime(value) {
    if (!value) return "";

    return new Date(value).toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
}

function formatAxisDate(value) {
    if (!value) return "";

    return new Date(value).toLocaleString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function SensorChart({ title, data, dataKey, unit, color }) {
    return (
        <article className="chart-card">
            <div className="chart-header">
                <h3 style={{ color }}>{title}</h3>
                <button type="button" className="chart-menu" title="Opciones">
                    <MoreVertical size={19} />
                </button>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 12, right: 8, left: -12, bottom: 8 }}
                    >
                        <CartesianGrid
                            stroke="#edf0ed"
                            strokeDasharray="2 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="fecha"
                            tickFormatter={formatAxisDate}
                            tick={{ fontSize: 10, fill: "#626b66" }}
                            axisLine={{ stroke: "#dfe4df" }}
                            tickLine={false}
                            minTickGap={22}
                        />

                        <YAxis
                            tick={{ fontSize: 10, fill: "#626b66" }}
                            axisLine={false}
                            tickLine={false}
                            width={32}
                        />

                        <Tooltip
                            labelFormatter={formatDateTime}
                            contentStyle={{
                                borderRadius: "10px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                            }}
                            formatter={(value) => [
                                `${Number(value).toFixed(1)} ${unit}`,
                                title,
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={2.5}
                            dot={{
                                r: 3.2,
                                fill: color,
                                stroke: "#fff",
                                strokeWidth: 1.5,
                            }}
                            activeDot={{
                                r: 6,
                                fill: color,
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                            isAnimationActive
                            animationDuration={450}
                        />

                        {data.length > 5 && (
                            <Brush
                                dataKey="fecha"
                                height={18}
                                stroke={color}
                                travellerWidth={8}
                                tickFormatter={formatAxisDate}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </article>
    );
}

export default SensorChart;
