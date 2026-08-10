import { useEffect, useMemo, useState } from "react";
import {
    BarChart3,
    CalendarDays,
    Clock3,
    Cloud,
    Droplets,
    Home,
    RefreshCw,
    Sun,
    Thermometer,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Brush,
} from "recharts";

import { getDatos } from "../services/api";
import MetricCard from "../components/MetricCard";
import ConnectionStatus from "../components/ConnectionStatus";
import BananaVisualization from "../components/BananaVisualization";
import SensorChart from "../components/SensorChart";

const REFRESH_INTERVAL = 30000;
const DASHBOARD_DATA_LIMIT = 100;
const HISTORY_DATA_LIMIT = 500;

function formatDateTime(value) {
    if (!value) return "—";

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

function formatShortDate(value) {
    if (!value) return "—";
    return new Date(value).toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function getRgb(item) {
    const rgb = item?.color_rgb;
    if (!rgb) return { r: 0, g: 0, b: 0 };
    if (Array.isArray(rgb)) return { r: Number(rgb[0] ?? 0), g: Number(rgb[1] ?? 0), b: Number(rgb[2] ?? 0) };
    return {
        r: Number(rgb.r ?? rgb.R ?? 0),
        g: Number(rgb.g ?? rgb.G ?? 0),
        b: Number(rgb.b ?? rgb.B ?? 0),
    };
}

function getMaturity(item) {
    const text = String(item?.color_puro ?? item?.estado ?? "").trim().toLowerCase();

    if (text.includes("muy maduro") || text.includes("muy_maduro") || text.includes("very ripe")) return "Muy maduro";
    if (text.includes("amarillo") || text.includes("yellow")) return "Amarillo";
    if (text === "maduro" || text.includes("maduro")) return "Maduro";
    if (text.includes("verde") || text.includes("green")) return "Verde";

    const rgb = getRgb(item);
    // Fallback por RGB cuando el backend no trae el estado explícitamente.
    if (rgb.g > rgb.r * 1.15 && rgb.g > rgb.b * 1.15) return "Verde";
    if (rgb.r > 160 && rgb.g > 130 && rgb.b < 120) return "Amarillo";
    if (rgb.r > 130 && rgb.g > 90 && rgb.g <= 150 && rgb.b < 100) return "Maduro";
    if (rgb.r > 90 && rgb.g < 100 && rgb.b < 90) return "Muy maduro";
    return "En evaluación";
}

function getDateKey(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function DataTable() {
    const [datos, setDatos] = useState([]);
    const [search, setSearch] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [maturityFilter, setMaturityFilter] = useState("todos");
    const [page, setPage] = useState(1);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState("");
    const pageSize = 12;

    async function cargarHistorial() {
        try {
            setLoadingHistory(true);
            setHistoryError("");
            const resultado = await getDatos({
                limit: HISTORY_DATA_LIMIT,
                desde: dateFrom || null,
                hasta: dateTo || null,
                estado: maturityFilter,
            });
            setDatos(Array.isArray(resultado) ? resultado : []);
            setPage(1);
        } catch (error) {
            console.error("Error obteniendo historial:", error);
            setHistoryError(error.message || "No fue posible cargar el historial.");
        } finally {
            setLoadingHistory(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(cargarHistorial, 150);
        return () => clearTimeout(timer);
    }, [dateFrom, dateTo, maturityFilter]);

    useEffect(() => {
        const interval = setInterval(cargarHistorial, 60000);
        return () => clearInterval(interval);
    }, [dateFrom, dateTo, maturityFilter]);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) return datos;

        return datos.filter((item) => {
            const rgb = getRgb(item);
            const maturity = getMaturity(item);

            return [
                formatDateTime(item.fecha_registro),
                item.color_hex,
                item.color_puro,
                maturity,
                `${rgb.r}, ${rgb.g}, ${rgb.b}`,
            ].some((value) => String(value ?? "").toLowerCase().includes(term));
        });
    }, [datos, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const hasFilters = Boolean(search || dateFrom || dateTo || maturityFilter !== "todos");

    function clearFilters() {
        setSearch("");
        setDateFrom("");
        setDateTo("");
        setMaturityFilter("todos");
        setPage(1);
    }

    return (
        <section className="history-panel">
            <div className="page-heading">
                <div>
                    <h2>Historial de mediciones</h2>
                    <p>Los filtros de fecha y estado se aplican directamente en MongoDB mediante FastAPI.</p>
                </div>
                <div className="history-count">{filtered.length}{filtered.length === HISTORY_DATA_LIMIT ? "+" : ""} mediciones</div>
            </div>

            <div className="history-toolbar">
                <div className="history-filter-group history-search-group">
                    <label htmlFor="history-search">Buscar en resultados</label>
                    <input
                        id="history-search"
                        className="history-search"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                        placeholder="Buscar por color, RGB o estado..."
                    />
                </div>

                <div className="history-filter-group">
                    <label htmlFor="date-from">Desde</label>
                    <input
                        id="date-from"
                        className="history-date"
                        type="date"
                        value={dateFrom}
                        max={dateTo || undefined}
                        onChange={(event) => {
                            setDateFrom(event.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="history-filter-group">
                    <label htmlFor="date-to">Hasta</label>
                    <input
                        id="date-to"
                        className="history-date"
                        type="date"
                        value={dateTo}
                        min={dateFrom || undefined}
                        onChange={(event) => {
                            setDateTo(event.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="history-filter-group">
                    <label htmlFor="maturity-filter">Estado del banano</label>
                    <select
                        id="maturity-filter"
                        className="history-select"
                        value={maturityFilter}
                        onChange={(event) => {
                            setMaturityFilter(event.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="Verde">🟢 Verde</option>
                        <option value="Amarillo">🟡 Amarillo</option>
                        <option value="Maduro">🟠 Maduro</option>
                        <option value="Muy maduro">🟤 Muy maduro</option>
                    </select>
                </div>

                <button className="clear-filters" type="button" onClick={clearFilters} disabled={!hasFilters}>
                    Limpiar filtros
                </button>
            </div>

            <div className="active-filters">
                {dateFrom && <span>Desde: <strong>{dateFrom}</strong></span>}
                {dateTo && <span>Hasta: <strong>{dateTo}</strong></span>}
                {maturityFilter !== "todos" && <span>Estado: <strong>{maturityFilter}</strong></span>}
                {search && <span>Búsqueda local: <strong>“{search}”</strong></span>}
                {!dateFrom && !dateTo && maturityFilter === "todos" && !search && (
                    <span>Mostrando como máximo las últimas {HISTORY_DATA_LIMIT} mediciones.</span>
                )}
            </div>

            {historyError && <div className="history-error">{historyError}</div>}

            <div className="table-wrap">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Temperatura</th>
                            <th>Humedad</th>
                            <th>Luminosidad</th>
                            <th>Calidad aire</th>
                            <th>Color</th>
                            <th>RGB</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingHistory && (
                            <tr><td colSpan="8" className="empty-table">Consultando MongoDB...</td></tr>
                        )}
                        {!loadingHistory && rows.map((item) => {
                            const rgb = getRgb(item);
                            const color = item.color_hex || `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                            const maturity = getMaturity(item);
                            return (
                                <tr key={item._id ?? `${item.fecha_registro}-${item.color_hex}`}>
                                    <td>{formatDateTime(item.fecha_registro)}</td>
                                    <td>{Number(item.ambiente?.temperatura ?? 0).toFixed(1)} °C</td>
                                    <td>{Number(item.ambiente?.humedad ?? 0).toFixed(1)} %</td>
                                    <td>{Number(item.ambiente?.luminosidad_lux ?? 0).toFixed(1)} lux</td>
                                    <td>{Number(item.calidad_aire_raw ?? 0).toFixed(0)}</td>
                                    <td>
                                        <span className="table-color">
                                            <span className="table-swatch" style={{ backgroundColor: color }} />
                                            {item.color_hex || "—"}
                                        </span>
                                    </td>
                                    <td>{rgb.r}, {rgb.g}, {rgb.b}</td>
                                    <td><span className={`maturity-pill maturity-${maturity.toLowerCase().replace(/\s+/g, "-")}`}>{maturity}</span></td>
                                </tr>
                            );
                        })}
                        {!loadingHistory && !rows.length && (
                            <tr><td colSpan="8" className="empty-table">No hay mediciones que coincidan con los filtros seleccionados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <span>Mostrando {rows.length} de {filtered.length}{filtered.length === HISTORY_DATA_LIMIT ? " (máximo consultado)" : ""}</span>
                <div>
                    <button disabled={currentPage <= 1 || loadingHistory} onClick={() => setPage((value) => value - 1)}>Anterior</button>
                    <strong>Página {currentPage} de {totalPages}</strong>
                    <button disabled={currentPage >= totalPages || loadingHistory} onClick={() => setPage((value) => value + 1)}>Siguiente</button>
                </div>
            </div>
        </section>
    );
}

function FullGraphs({ datosGrafica }) {
    const [variable, setVariable] = useState("temperatura");
    const configs = {
        temperatura: { label: "Temperatura", unit: "°C", color: "#2da052", key: "temperatura" },
        humedad: { label: "Humedad", unit: "%", color: "#2589e8", key: "humedad" },
        luminosidad: { label: "Luminosidad", unit: "lux", color: "#f59e0b", key: "luminosidad" },
        aire: { label: "Calidad del aire", unit: "raw", color: "#7654d8", key: "aire" },
    };
    const selected = configs[variable];

    return (
        <section className="graphs-page">
            <div className="page-heading">
                <div>
                    <h2>Gráficas de sensores</h2>
                    <p>Visualización interactiva de las mediciones almacenadas en el backend.</p>
                </div>
                <label className="select-label">
                    Sensor
                    <select value={variable} onChange={(event) => setVariable(event.target.value)}>
                        <option value="temperatura">Temperatura</option>
                        <option value="humedad">Humedad</option>
                        <option value="luminosidad">Luminosidad</option>
                        <option value="aire">Calidad del aire</option>
                    </select>
                </label>
            </div>

            <div className="large-chart-card">
                <div className="large-chart-header">
                    <div>
                        <h3>{selected.label}</h3>
                        <span>Últimas {datosGrafica.length} mediciones de la ventana reciente · {selected.unit}</span>
                    </div>
                </div>
                <div className="large-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={datosGrafica} margin={{ top: 10, right: 20, left: 5, bottom: 5 }}>
                            <defs>
                                <linearGradient id="sensorFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={selected.color} stopOpacity={0.28} />
                                    <stop offset="100%" stopColor={selected.color} stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e7ece8" />
                            <XAxis dataKey="fecha" tickFormatter={formatShortDate} minTickGap={35} />
                            <YAxis />
                            <Tooltip labelFormatter={formatDateTime} formatter={(value) => [`${Number(value).toFixed(2)} ${selected.unit}`, selected.label]} />
                            <Area type="monotone" dataKey={selected.key} stroke={selected.color} fill="url(#sensorFill)" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            <Brush dataKey="fecha" height={25} tickFormatter={formatShortDate} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="large-chart-card">
                <div className="large-chart-header">
                    <div>
                        <h3>Comparación ambiental</h3>
                        <span>Temperatura, humedad y luminosidad a lo largo del tiempo</span>
                    </div>
                </div>
                <div className="large-chart comparison-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={datosGrafica} margin={{ top: 10, right: 20, left: 5, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e7ece8" />
                            <XAxis dataKey="fecha" tickFormatter={formatShortDate} minTickGap={35} />
                            <YAxis />
                            <Tooltip labelFormatter={formatDateTime} />
                            <Legend />
                            <Line type="monotone" dataKey="temperatura" name="Temperatura °C" stroke="#2da052" dot={false} strokeWidth={2} />
                            <Line type="monotone" dataKey="humedad" name="Humedad %" stroke="#2589e8" dot={false} strokeWidth={2} />
                            <Line type="monotone" dataKey="luminosidad" name="Luminosidad lux" stroke="#f59e0b" dot={false} strokeWidth={2} />
                            <Brush dataKey="fecha" height={25} tickFormatter={formatShortDate} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}

function Sidebar({ activePage, onNavigate }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo" aria-label="Monitoreo de banano">🍌</div>
            <nav className="sidebar-nav">
                <button className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} type="button" onClick={() => onNavigate("dashboard")}>
                    <Home size={25} strokeWidth={1.8} />
                    <span>Dashboard</span>
                </button>
                <button className={`nav-item ${activePage === "historial" ? "active" : ""}`} type="button" onClick={() => onNavigate("historial")}>
                    <Clock3 size={25} strokeWidth={1.8} />
                    <span>Historial</span>
                </button>
                <button className={`nav-item ${activePage === "graficas" ? "active" : ""}`} type="button" onClick={() => onNavigate("graficas")}>
                    <BarChart3 size={25} strokeWidth={1.8} />
                    <span>Gráficas</span>
                </button>
            </nav>
        </aside>
    );
}

function Dashboard() {
    const [datos, setDatos] = useState([]);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(null);
    const [activePage, setActivePage] = useState("dashboard");

    async function cargarDatos() {
        try {
            setLoading(true);
            const resultado = await getDatos({ limit: DASHBOARD_DATA_LIMIT });
            setDatos(Array.isArray(resultado) ? resultado : []);
            setConnected(true);
            setLastRefresh(new Date());
        } catch (error) {
            console.error("Error obteniendo datos:", error);
            setConnected(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarDatos();
        const interval = setInterval(cargarDatos, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const actual = datos[0];

    const datosGrafica = useMemo(() => [...datos].reverse().map((item) => {
        const rgb = getRgb(item);
        return {
            fecha: item.fecha_registro,
            temperatura: Number(item.ambiente?.temperatura ?? 0),
            humedad: Number(item.ambiente?.humedad ?? 0),
            luminosidad: Number(item.ambiente?.luminosidad_lux ?? 0),
            aire: Number(item.calidad_aire_raw ?? 0),
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
        };
    }), [datos]);

    if (!actual && loading) {
        return (
            <div className="dashboard-loading">
                <div><div className="loading-banana">🍌</div><p>Cargando datos del cultivo...</p></div>
            </div>
        );
    }

    return (
        <div className="app-shell">
            <Sidebar activePage={activePage} onNavigate={setActivePage} />

            <main className="dashboard">
                <header className="dashboard-header">
                    <div className="brand-block">
                        <div className="brand-title"><span className="brand-banana">🍌</span><h1>Monitoreo de Banano</h1></div>
                        <p>Sistema de monitoreo ambiental y de color del cultivo</p>
                    </div>
                    <div className="header-right">
                        <ConnectionStatus connected={connected} loading={loading} />
                        <div className="last-sync">
                            <span>Última actualización: {actual ? formatDateTime(actual.fecha_registro) : "—"}</span>
                            <button className={`refresh-button ${loading ? "spinning" : ""}`} type="button" onClick={cargarDatos} title="Actualizar ahora" aria-label="Actualizar ahora"><RefreshCw size={18} /></button>
                        </div>
                    </div>
                </header>

                {activePage === "historial" && <DataTable />}
                {activePage === "graficas" && <FullGraphs datosGrafica={datosGrafica} />}

                {activePage === "dashboard" && actual && (
                    <>
                        <section className="metrics-grid">
                            <MetricCard icon={<Thermometer size={38} strokeWidth={1.7} />} iconClass="green" title="Temperatura" value={Number(actual.ambiente?.temperatura ?? 0).toFixed(1)} unit="°C" status="Normal" />
                            <MetricCard icon={<Droplets size={38} strokeWidth={1.7} />} iconClass="blue" title="Humedad" value={Number(actual.ambiente?.humedad ?? 0).toFixed(1)} unit="%" status="Normal" />
                            <MetricCard icon={<Sun size={38} strokeWidth={1.7} />} iconClass="orange" title="Luminosidad" value={Number(actual.ambiente?.luminosidad_lux ?? 0).toFixed(1)} unit="lux" status="Normal" />
                            <MetricCard icon={<Cloud size={38} strokeWidth={1.7} />} iconClass="purple" title="Calidad del aire" value={Number(actual.calidad_aire_raw ?? 0).toFixed(0)} unit="raw" status="Óptima" />
                        </section>

                        <section className="banana-section">
                            <BananaVisualization colorHex={actual.color_hex} colorRgb={actual.color_rgb} colorPuro={actual.color_puro} />
                        </section>

                        <section className="charts-grid">
                            <SensorChart title="Temperatura (°C)" data={datosGrafica} dataKey="temperatura" unit="°C" color="#2da052" />
                            <SensorChart title="Humedad (%)" data={datosGrafica} dataKey="humedad" unit="%" color="#2589e8" />
                            <SensorChart title="Luminosidad (lux)" data={datosGrafica} dataKey="luminosidad" unit="lux" color="#f59e0b" />
                            <SensorChart title="Calidad del aire (raw)" data={datosGrafica} dataKey="aire" unit="raw" color="#7654d8" />
                        </section>

                        <section className="last-update-footer">
                            <CalendarDays size={21} /><strong>Última medición:</strong><span>{formatDateTime(actual.fecha_registro)}</span>
                            {lastRefresh && <span className="footer-refresh">· actualizado {lastRefresh.toLocaleTimeString("es-CO", { hour12: false })}</span>}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
