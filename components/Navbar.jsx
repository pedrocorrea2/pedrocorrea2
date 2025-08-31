import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [rut, setRut] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    let lastScroll = 0;
    const onScroll = () => {
      const headerEl = document.querySelector('.site-header');
      if (!headerEl) return;
      const current = window.pageYOffset;
      if (current > lastScroll && current > 50) {
        headerEl.classList.add('nav-hidden');
      } else {
        headerEl.classList.remove('nav-hidden');
      }
      if (current > 50) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
      lastScroll = current;
    };
    document.addEventListener('click', handler);
    window.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('click', handler);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Acceso de clientes próximamente disponible.');
    e.currentTarget.reset();
    setRut('');
    setOpen(false);
  };

  const handleFirma = () => {
    console.log('Firma Documentos');
  };

  const formatRut = (value) => {
    const clean = value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (clean.length <= 1) return clean;
    const body = clean.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const dv = clean.slice(-1);
    return `${body}-${dv}`;
  };

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <Link href="/" className="logo" aria-label="Inicio">
          <img
            src="https://www.acfcapital.cl/acfcapital/images/logo_acf.svg?crc=313753922"
            alt="ACF Capital"
            width={226}
            height={41}
          />
        </Link>

        <nav className="links" aria-label="Main navigation">
          <Link href="#servicios">Servicios</Link>
          <Link href="#como-funciona">Cómo funciona</Link>
          <Link href="#simulador">Simulador</Link>
          <Link href="#oficinas">Oficinas</Link>
          <Link href="#contacto">Contacto</Link>
        </nav>
        <div className="actions">
          <button
            className="btn-secondary btn-nav"
            onClick={handleFirma}
          >
            Firmar documentos
          </button>
          <div className="login-dropdown" ref={menuRef}>
            <button
              id="loginToggle"
              className="btn-accent btn-nav"
              onClick={() => setOpen(!open)}
            >
              Acceso clientes
            </button>
            {open && (
              <div className="dropdown-menu">
                <form onSubmit={handleLogin} className="login-form">
                  <h3>Bienvenido a ACF Capital</h3>
                  <input
                    id="loginUser"
                    name="usuario"
                    placeholder="RUT"
                    value={rut}
                    onChange={(e) => setRut(formatRut(e.target.value))}
                    required
                  />
                  <input
                    id="loginPass"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    required
                  />
                  <button type="submit" className="btn-login">
                    Aceptar
                  </button>
                  <a href="#" className="forgot-link">
                    ¿Olvidaste tu clave?
                  </a>
                </form>
                <button id="btnFirmaDocs" className="btn-link" onClick={handleFirma}>
                  Firma Documentos
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
    </header>
  );
}
