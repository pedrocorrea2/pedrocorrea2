document.getElementById('calcForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('invoiceAmount').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const days = parseFloat(document.getElementById('days').value);

  if (isNaN(amount) || isNaN(rate) || isNaN(days)) return;

  const discount = amount * rate * (days / 360);
  const net = amount - discount;

  document.getElementById('discount').textContent = discount.toFixed(2);
  document.getElementById('net').textContent = net.toFixed(2);
  document.getElementById('result').classList.remove('hidden');
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
  this.reset();
});
