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
        <div className="contact-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <h2>Contáctanos</h2>
          <p>Déjanos tus datos y te responderemos a la brevedad.</p>
        </div>
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
