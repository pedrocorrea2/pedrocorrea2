// Calculator logic
const amountInput = document.getElementById('invoiceAmount');
const rateInput = document.getElementById('rate');
const rateValue = document.getElementById('rateValue');
const presetButtons = document.querySelectorAll('.preset-amounts button');
const termButtons = document.querySelectorAll('.term-buttons button');
const sumAmount = document.getElementById('sumAmount');
const sumFinanced = document.getElementById('sumFinanced');
const sumDiscount = document.getElementById('sumDiscount');
const sumNet = document.getElementById('sumNet');

let days = 30;

const format = (n) =>
  n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

function calculate() {
  const amount = parseFloat(amountInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const discount = amount * (rate / 100) * (days / 30);
  const net = amount - discount;
  sumAmount.textContent = format(amount);
  sumFinanced.textContent = format(amount);
  sumDiscount.textContent = format(discount);
  sumNet.textContent = format(net);
}

presetButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    amountInput.value = btn.dataset.value;
    calculate();
  })
);

termButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    termButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    days = parseInt(btn.dataset.days, 10);
    calculate();
  })
);

amountInput.addEventListener('input', calculate);
rateInput.addEventListener('input', () => {
  rateValue.textContent = `${parseFloat(rateInput.value).toFixed(1)}%`;
  calculate();
});

calculate();

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
    this.reset();
  });
}

// Login dropdown
const loginToggle = document.getElementById('loginToggle');
const loginMenu = document.getElementById('loginMenu');

loginToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  loginMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!loginMenu.contains(e.target) && e.target !== loginToggle) {
    loginMenu.classList.add('hidden');
  }
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Acceso de clientes próximamente disponible.');
  this.reset();
  loginMenu.classList.add('hidden');
});

document.getElementById('btnFirmaDocs').addEventListener('click', () => {
  alert('Firma de documentos próximamente disponible.');
});

// Gallery slideshow
const gallerySlides = document.querySelectorAll('.gallery img');
let currentSlide = 0;
if (gallerySlides.length > 0) {
  setInterval(() => {
    gallerySlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % gallerySlides.length;
    gallerySlides[currentSlide].classList.add('active');
  }, 5000);
}
