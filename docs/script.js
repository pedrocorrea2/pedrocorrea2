document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sim-form');
  const result = document.getElementById('sim-result');
  if(!form) return;
  function update(){
    const amount = parseFloat(form.monto.value) || 0;
    const days = parseInt(form.dias.value) || 0;
    const rate = 0.02; // 2% cada 30 días
    const fee = amount * rate * (days/30);
    const neto = amount - fee;
    result.innerHTML = `
      <table class="card" style="padding:var(--space-3);width:100%">
        <tr><th scope="row">Monto</th><td>$${amount.toFixed(0)}</td></tr>
        <tr><th scope="row">Comisión</th><td>$${fee.toFixed(0)}</td></tr>
        <tr><th scope="row">Neto estimado</th><td>$${neto.toFixed(0)}</td></tr>
      </table>
      <p class="disclosure">* Cálculo referencial. Tasas sujetas a evaluación.</p>
    `;
  }
  form.addEventListener('input', update);
  form.addEventListener('submit', e => e.preventDefault());
  update();
});
