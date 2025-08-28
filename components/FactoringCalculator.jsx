import { useState } from 'react';

export default function FactoringCalculator() {
  const [result, setResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const monto = parseFloat(data.get('monto')) || 0;
    const tasa = parseFloat(data.get('tasa')) || 0;
    const dias = parseInt(data.get('dias'), 10) || 0;
    const descuento = (monto * tasa * dias) / (100 * 360);
    const liquido = monto - descuento;
    setResult({ descuento, liquido });
  };

  return (
    <section className="calculator" id="simulador">
      <div className="container">
        <h2>Simula tu factoring</h2>
        <div className="calculator-card">
          <form onSubmit={handleSubmit} className="calc-grid">
            <label htmlFor="monto">
              Monto de la factura
              <input id="monto" name="monto" type="number" step="0.01" required />
            </label>
            <label htmlFor="tasa">
              Tasa anual (%)
              <input id="tasa" name="tasa" type="number" step="0.01" required />
            </label>
            <label htmlFor="dias">
              Días a vencimiento
              <input id="dias" name="dias" type="number" required />
            </label>
            <button type="submit" className="btn-primary">
              Calcular
            </button>
          </form>
          {result && (
            <div className="calc-output" aria-live="polite">
              <p>
                <strong>Descuento:</strong> ${'{'}result.descuento.toFixed(2){'}'}
              </p>
              <p>
                <strong>Monto a recibir:</strong> ${'{'}result.liquido.toFixed(2){'}'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
