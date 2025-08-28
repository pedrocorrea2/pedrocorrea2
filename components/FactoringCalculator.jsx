import { useState } from 'react';

export default function FactoringCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [amountInput, setAmountInput] = useState('1.000.000');
  const [days, setDays] = useState(30);
  const [rate, setRate] = useState(0.9);
  
  const formatCurrency = (n) =>
    n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  const fee = 50000;
  const discount = amount * (rate / 100) * (days / 30);
  const net = amount - discount - fee;

  const presets = [50000, 500000, 1000000, 5000000];
  const presetLabel = (v) => (v >= 1000000 ? `${v / 1000000}M` : `${v / 1000}K`);

  const formatNumber = (val) => val.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setAmount(raw ? parseInt(raw, 10) : 0);
    setAmountInput(raw ? formatNumber(raw) : '');
  };

  const setPreset = (p) => {
    setAmount(p);
    setAmountInput(formatNumber(String(p)));
  };

  return (
    <section className="calculator" id="simulador">
      <div className="container">
        <p className="tagline">Cobra hoy tus facturas con factoring</p>
        <h2>Simula tu primer financiamiento</h2>
        <div className="calc-wrapper">
          <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="amount">Monto de la(s) factura(s) que quieres adelantar</label>
            <div className="amount-input">
              <span className="currency">CLP $</span>
              <input
                id="amount"
                type="text"
                inputMode="numeric"
                value={amountInput}
                onChange={handleAmountChange}
              />
            </div>
            <div className="preset-amounts">
              {presets.map((p) => (
                <button type="button" key={p} onClick={() => setPreset(p)}>
                  {presetLabel(p)}
                </button>
              ))}
            </div>
            <p>Plazo de pago de la factura</p>
            <div className="term-buttons">
              {[30, 60, 90, 120, 150].map((d) => (
                <button
                  type="button"
                  key={d}
                  className={days === d ? 'active' : ''}
                  onClick={() => setDays(d)}
                >
                  {d} días
                </button>
              ))}
            </div>
            <label htmlFor="rate">
              Tasa de interés mensual: <span>{rate.toFixed(1)}%</span>
            </label>
            <input
              id="rate"
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
          </form>
          <div className="calc-summary">
            <p>
              Monto facturas por financiar <span>{formatCurrency(amount)}</span>
            </p>
            <p>
              Monto financiado (100%) <span>{formatCurrency(amount)}</span>
            </p>
            <p>
              Comisión de factoring <span>{formatCurrency(discount)}</span>
            </p>
            <p>
              Gastos de la operación <span>{formatCurrency(fee)}</span>
            </p>
            <p className="result">
              Hoy puedes cobrar <span>{formatCurrency(net)}</span>
            </p>
            <button className="btn-accent">Regístrate y aumenta tu liquidez</button>
          </div>
        </div>
      </div>
    </section>
  );
}

