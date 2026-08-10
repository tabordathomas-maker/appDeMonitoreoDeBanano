import { useEffect, useState } from "react";
import { getDatos } from "../services/api";
import MetricCard from "../components/MetricCard";
import ConnectionStatus from "../components/ConnectionStatus";
import BananaVisualization from "../components/BananaVisualization";
import SensorChart from "../components/SensorChart";


const REFRESH_INTERVAL = 10000;

function Dashboard() {
    const [datos, setDatos] = useState([]);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    async function cargarDatos() {
        try {
            setLoading(true);

            const resultado = await getDatos(100);

            setDatos(resultado);
            setConnected(true);
        } catch (error) {
            console.error("Error obteniendo datos:", error);
            setConnected(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarDatos();

        const interval = setInterval(
            cargarDatos,
            REFRESH_INTERVAL
        );

        return () => clearInterval(interval);
    }, []);

    const actual = datos[0];

    const datosGrafica = [...datos]
    .reverse()
    .map((item) => ({
        fecha: item.fecha_registro,

        temperatura:
            item.ambiente?.temperatura ?? 0,

        humedad:
            item.ambiente?.humedad ?? 0,

        luminosidad:
            item.ambiente?.luminosidad_lux ?? 0,

        aire:
            item.calidad_aire_raw ?? 0,
    }));


    if (!actual && loading) {
        return (
            <div className="dashboard-loading">
                Cargando datos del cultivo...
            </div>
        );
    }

    return (
        <main className="dashboard">

            <header className="dashboard-header">

                <div>
                    <h1>🍌 Monitoreo de Banano</h1>
                    <p>
                        Sistema de monitoreo ambiental y de color
                    </p>
                </div>

                <ConnectionStatus
                    connected={connected}
                    loading={loading}
                />

            </header>

            {actual && (
                <>
                    <section className="metrics-grid">

                        <MetricCard
                            icon="🌡️"
                            title="Temperatura"
                            value={actual.ambiente.temperatura}
                            unit="°C"
                        />

                        <MetricCard
                            icon="💧"
                            title="Humedad"
                            value={actual.ambiente.humedad}
                            unit="%"
                        />

                        <MetricCard
                            icon="☀️"
                            title="Luminosidad"
                            value={actual.ambiente.luminosidad_lux}
                            unit="lux"
                        />

                        <MetricCard
                            icon="☁️"
                            title="Calidad del aire"
                            value={actual.calidad_aire_raw}
                            unit=""
                        />

                    </section>

                    <section className="banana-section">

                            <BananaVisualization
                                colorHex={actual.color_hex}
                                colorRgb={actual.color_rgb}
                                colorPuro={actual.color_puro}
                            />

                    </section>

                    <section className="charts-grid">

                    <SensorChart
                        title="Temperatura (°C)"
                        data={datosGrafica}
                        dataKey="temperatura"
                        unit="°C"
                        color="#16803c"
                    />

                    <SensorChart
                        title="Humedad (%)"
                        data={datosGrafica}
                        dataKey="humedad"
                        unit="%"
                        color="#1688e8"
                    />

                    <SensorChart
                        title="Luminosidad (lux)"
                        data={datosGrafica}
                        dataKey="luminosidad"
                        unit="lux"
                        color="#f59e0b"
                    />

                    <SensorChart
                        title="Calidad del aire (raw)"
                        data={datosGrafica}
                        dataKey="aire"
                        unit="raw"
                        color="#7050d6"
                    />

                </section>

                    <section className="last-update">

                        Última medición:{" "}
                        {new Date(
                            actual.fecha_registro
                        ).toLocaleString()}

                    </section>
                </>
            )}

        </main>
    );
}

export default Dashboard;
