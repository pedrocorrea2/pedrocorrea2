export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <img src="/logo_acf.svg" alt="ACF Capital" className="footer-logo" />
          <p>Financiamiento ágil y confiable para tu empresa.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Anticipo de fondos</a></li>
              <li><a href="#servicios">Cobranza</a></li>
              <li><a href="#servicios">Información en línea</a></li>
              <li><a href="#servicios">Factoring sin notificación</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#simulador">Calculadora</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column newsletter">
            <h4>Newsletter</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu email" aria-label="Email" />
              <button type="submit" className="btn-secondary">Suscribirse</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} ACF Capital. Todos los derechos reservados.</p>
          <nav className="footer-legal">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Compliance</a>
            <a href="#">Mapa del sitio</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
