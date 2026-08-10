function ConnectionStatus({ connected, loading }) {
    let status = "Conectado";
    let className = "connected";

    if (loading) {
        status = "Actualizando";
        className = "updating";
    } else if (!connected) {
        status = "Desconectado";
        className = "disconnected";
    }

    return (
        <div className={`connection-status ${className}`}>
            <span className="status-dot"></span>
            <span>{status}</span>
        </div>
    );
}

export default ConnectionStatus;