export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <h1>Liquidez inmediata para tu empresa</h1>
          <p>Anticipa el pago de tus facturas con tasas competitivas.</p>
          <a href="#contacto" className="btn-accent">Solicitar Factoring</a>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
            alt="Empresario revisando facturas"
            width="600"
            height="400"
          />
        </div>
      </div>
    </section>
  );
}
