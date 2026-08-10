function MetricCard({ icon, iconClass, title, value, unit, status }) {
    return (
        <article className="metric-card">
            <div className={`metric-icon ${iconClass}`}>
                {icon}
            </div>

            <div className="metric-content">
                <h2>{title}</h2>

                <div className="metric-value">
                    {value}
                    <span>{unit}</span>
                </div>

                {status && (
                    <div className="metric-status">
                        <span className="status-dot" />
                        {status}
                    </div>
                )}
            </div>
        </article>
    );
}

export default MetricCard;
