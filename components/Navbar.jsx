import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Acceso de clientes próximamente disponible.');
    e.currentTarget.reset();
    setOpen(false);
  };

  const handleFirma = () => {
    console.log('Firma Documentos');
  };

  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Main navigation">
        <Link href="/" className="logo" aria-label="Inicio">
          <img src="/logo_acf.svg" alt="ACF Capital" width={160} height={48} />
        </Link>
        <div className="links">
          <Link href="#servicios">Servicios</Link>
          <Link href="#como-funciona">Cómo funciona</Link>
          <Link href="#oficinas">Oficinas</Link>
          <Link href="#contacto">Contacto</Link>
          <div className="login-dropdown" ref={menuRef}>
            <button
              id="loginToggle"
              className="btn-accent"
              onClick={() => setOpen(!open)}
            >
              Acceso Clientes
            </button>
            {open && (
              <div className="dropdown-menu">
                <form onSubmit={handleLogin} className="login-form">
                  <h3>Bienvenido a Office Banking</h3>
                  <input
                    id="loginUser"
                    name="usuario"
                    placeholder="RUT"
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
      </nav>
    </header>
  );
}
