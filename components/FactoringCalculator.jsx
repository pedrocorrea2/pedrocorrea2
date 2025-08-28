import { useState } from 'react';

export default function FactoringCalculator() {
  const [result, setResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const monto = parseFloat(formData.get('monto')) || 0;
    const tasa = parseFloat(formData.get('tasa')) || 0;
    const dias = parseInt(formData.get('dias'), 10) || 0;
    const descuento = (monto * tasa * dias) / (100 * 360);
    const liquido = monto - descuento;
    setResult({ descuento, liquido });
  };

  return (
    <section className="calculator">
      <div className="container">
        <h2>Simula tu factoring</h2>
        <form onSubmit={handleSubmit} className="calculator-card">
          <label htmlFor="monto">Monto de la factura</label>
          <input id="monto" name="monto" type="number" step="0.01" required />

          <label htmlFor="tasa">Tasa anual (%)</label>
          <input id="tasa" name="tasa" type="number" step="0.01" required />

          <label htmlFor="dias">Días a vencimiento</label>
          <input id="dias" name="dias" type="number" required />

          <button type="submit" className="btn-primary">Calcular</button>
        </form>
        {result && (
          <div className="calculator-result" aria-live="polite">
            <p><strong>Descuento:</strong> ${'{'}result.descuento.toFixed(2){'}'}</p>
            <p><strong>Monto a recibir:</strong> ${'{'}result.liquido.toFixed(2){'}'}</p>
          </div>
        )}
      </div>
    </section>
  );
}
