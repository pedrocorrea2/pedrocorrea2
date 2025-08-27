import { useState } from 'react';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('Nuevo cliente:', data); // TODO: conectar con backend
    // Simulación de espera
    setTimeout(() => {
      setSubmitting(false);
      e.currentTarget.reset();
    }, 500);
  };

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <h2>Contáctanos</h2>
        <form id="formNuevoCliente" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" required />

          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" required />

          <label htmlFor="empresa">Razón social</label>
          <input id="empresa" name="empresa" required />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="4" />

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </section>
  );
}
