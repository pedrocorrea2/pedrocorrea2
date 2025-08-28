export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        <div className="stats-card">
          <p className="stat-value">+500</p>
          <p className="stat-label">Clientes activos</p>
        </div>
        <div className="stats-card">
          <p className="stat-value">US$7B</p>
          <p className="stat-label">Financiamiento cursado</p>
        </div>
        <div className="stats-card">
          <p className="stat-value">24h</p>
          <p className="stat-label">Respuesta promedio</p>
        </div>
        <div className="stats-card">
          <p className="stat-value">15+</p>
          <p className="stat-label">Años de experiencia</p>
        </div>
      </div>
    </section>
  );
}
