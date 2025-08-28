import Link from 'next/link';

export default function Navbar() {
  const handlePortal = () => {
    // TODO: redirigir al portal de clientes
    console.log('Acceso Clientes');
  };
  const handleFirma = () => {
    // TODO: redirigir al módulo de firma de documentos
    console.log('Firma Documentos');
  };
  return (
    <header>
      <nav className="container">
        <Link href="/">
          <img src="/logo_acf.svg" alt="ACF Capital" width={160} height={48} />
        </Link>
        <div className="links">
          <Link href="#servicios">Servicios</Link>
          <Link href="#como-funciona">Cómo funciona</Link>
          <Link href="#contacto">Contacto</Link>
          <button id="btnPortalClientes" className="btn-accent" onClick={handlePortal}>Acceso Clientes</button>
          <button id="btnFirmaDocs" className="btn-accent" onClick={handleFirma}>Firma Documentos</button>
        </div>
      </nav>
    </header>
  );
}
