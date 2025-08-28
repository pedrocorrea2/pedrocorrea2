export default function WorkWithUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('Trabaja con nosotros:', data); // TODO: conectar con backend
    e.currentTarget.reset();
  };
  return (
    <section id="trabaja" className="work">
      <div className="container work-grid">
        <div className="work-image">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Equipo ACF Capital"
            width="600"
            height="400"
          />
        </div>
        <div className="work-form">
          <h2>Trabaja con nosotros</h2>
          <form id="formTrabaja" onSubmit={handleSubmit}>
            <label htmlFor="nombreTrabajo">Nombre</label>
            <input id="nombreTrabajo" name="nombre" required />

            <label htmlFor="correoTrabajo">Correo</label>
            <input id="correoTrabajo" name="correo" type="email" required />

            <label htmlFor="mensajeTrabajo">Mensaje</label>
            <textarea id="mensajeTrabajo" name="mensaje" rows="4" />

            <button type="submit" className="btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
}
