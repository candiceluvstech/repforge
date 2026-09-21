function StatCard({ title, value, icon }) {
    return (
        <div className="stat-card">
            <span>{icon}</span>
            <p>{title}</p>
            <h2>{value}</h2>
        </div>
    );
}

export default StatCard;