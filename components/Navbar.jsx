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
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
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
      <nav className="container nav-bar" aria-label="Main navigation">
        <Link href="/" className="logo" aria-label="Inicio">
          <img src="/logo_acf.svg" alt="ACF Capital" width={160} height={48} />
        </Link>
        <div className="links">
          <Link href="#servicios">Servicios</Link>
          <Link href="#como-funciona">Cómo funciona</Link>
          <Link href="#oficinas">Oficinas</Link>
          <Link href="#contacto">Contacto</Link>
          <button className="btn-secondary" onClick={() => alert('Registro próximamente disponible.')}>Registrarse</button>
          <div className="login-dropdown" ref={menuRef}>
            <button
              id="loginToggle"
              className="btn-accent"
              onClick={() => setOpen(!open)}
            >
              Acceso clientes
            </button>
            {open && (
              <div className="dropdown-menu">
                <form onSubmit={handleLogin} className="login-form">
                  <h3>Bienvenido a Acf Capital</h3>
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
      </nav>
      {open && (
        <div className="login-modal" role="dialog" aria-modal="true">
          <div className="login-box">
            <button className="close" onClick={handleClose} aria-label="Cerrar">
              &times;
            </button>
            <h2>Acceso Clientes</h2>
            <form onSubmit={handleLogin} className="login-form">
              <label htmlFor="loginUser">Usuario</label>
              <input id="loginUser" name="usuario" required />
              <label htmlFor="loginPass">Contraseña</label>
              <input id="loginPass" name="password" type="password" required />
              <button type="submit" className="btn-primary">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
