// Calculator logic
const amountInput = document.getElementById('invoiceAmount');
const rateInput = document.getElementById('rate');
const rateValue = document.getElementById('rateValue');
const presetButtons = document.querySelectorAll('.preset-amounts button');
const termButtons = document.querySelectorAll('.term-buttons button');
const sumAmount = document.getElementById('sumAmount');
const sumFinanced = document.getElementById('sumFinanced');
const sumDiscount = document.getElementById('sumDiscount');
const sumFee = document.getElementById('sumFee');
const sumNet = document.getElementById('sumNet');

let days = 30;

const fee = 50000;

const format = (n) =>
  n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

const formatNumber = (v) => v.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const parseNumber = (v) => parseInt(v.replace(/\./g, ''), 10) || 0;

function calculate() {
  const amount = parseNumber(amountInput.value);
  const rate = parseFloat(rateInput.value) || 0;
  const discount = amount * (rate / 100) * (days / 30);
  const net = amount - discount - fee;
  sumAmount.textContent = format(amount);
  sumFinanced.textContent = format(amount);
  sumDiscount.textContent = format(discount);
  sumFee.textContent = format(fee);
  sumNet.textContent = format(net);
  rateValue.textContent = `${rate.toFixed(1)}%`;
}

presetButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    amountInput.value = formatNumber(btn.dataset.value);
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

amountInput.addEventListener('input', (e) => {
  const raw = e.target.value.replace(/\D/g, '');
  e.target.value = raw ? formatNumber(raw) : '';
  calculate();
});
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

// Login modal
const loginToggle = document.getElementById('loginToggle');
const loginModal = document.getElementById('loginModal');
const loginClose = document.getElementById('loginClose');

loginToggle.addEventListener('click', () => {
  loginModal.classList.remove('hidden');
});

loginClose.addEventListener('click', () => {
  loginModal.classList.add('hidden');
});

loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.classList.add('hidden');
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Acceso de clientes próximamente disponible.');
  this.reset();
  loginModal.classList.add('hidden');
});

document.getElementById('btnFirmaDocsTop').addEventListener('click', () => {
  alert('Firma de documentos próximamente disponible.');
});

const loginUser = document.getElementById('loginUser');
loginUser.addEventListener('input', (e) => {
  let v = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (v.length > 1) {
    const body = v.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const dv = v.slice(-1);
    v = `${body}-${dv}`;
  }
  e.target.value = v;
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

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el) => observer.observe(el));
