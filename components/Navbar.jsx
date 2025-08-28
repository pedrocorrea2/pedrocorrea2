import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handlePortal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFirma = () => {
    console.log('Firma Documentos');
  };
  const handleLogin = (e) => {
    e.preventDefault();
    alert('Acceso de clientes próximamente disponible.');
    e.currentTarget.reset();
    handleClose();
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
          <Link href="#contacto">Contacto</Link>
          <button id="btnPortalClientes" className="btn-accent" onClick={handlePortal}>
            Acceso Clientes
          </button>
          <button id="btnFirmaDocs" className="btn-accent" onClick={handleFirma}>
            Firma Documentos
          </button>
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
