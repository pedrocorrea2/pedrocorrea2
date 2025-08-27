export default function WorkWithUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('Trabaja con nosotros:', data); // TODO: conectar con backend
    e.currentTarget.reset();
  };
  return (
    <section id="trabaja" className="contact">
      <div className="container">
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
    </section>
  );
}
