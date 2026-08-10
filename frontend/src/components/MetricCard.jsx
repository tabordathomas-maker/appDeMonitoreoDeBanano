function MetricCard({ icon, title, value, unit }) {
    return (
        <div className="metric-card">
            <div className="metric-card-header">
                <span className="metric-icon">{icon}</span>
                <span className="metric-title">{title}</span>
            </div>

            <div className="metric-value">
                {value}
                <span className="metric-unit">{unit}</span>
            </div>
        </div>
    );
}

export default MetricCard;