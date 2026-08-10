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


function formatDateTime(value) {
    if (!value) return "";

    const date = new Date(value);

    return date.toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}


function formatAxisDate(value) {
    if (!value) return "";

    const date = new Date(value);

    return date.toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}


function SensorChart({
    title,
    data,
    dataKey,
    unit,
    color,
}) {
    return (
        <div className="chart-card">

            <div className="chart-header">
                <div>
                    <h3>{title}</h3>

                    <span>
                        Evolución en el tiempo
                    </span>
                </div>
            </div>

            <div className="chart-container">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 20,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="fecha"
                            tickFormatter={formatAxisDate}
                            tick={{
                                fontSize: 11,
                            }}
                            minTickGap={40}
                        />

                        <YAxis
                            tick={{
                                fontSize: 11,
                            }}
                        />

                        <Tooltip
                            labelFormatter={(value) =>
                                formatDateTime(value)
                            }
                            contentStyle={{
                                borderRadius: "10px",
                                border: "1px solid #e5e7eb",
                                boxShadow:
                                    "0 5px 20px rgba(0,0,0,0.08)",
                            }}
                            formatter={(value) => [
                                `${value} ${unit}`,
                                title,
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            dot={{
                                r: 3,
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />

                        <Brush
                            dataKey="fecha"
                            height={25}
                            stroke={color}
                            travellerWidth={10}
                            tickFormatter={formatAxisDate}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default SensorChart;