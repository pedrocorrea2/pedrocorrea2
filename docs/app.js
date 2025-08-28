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

const gallerySlides = document.querySelectorAll('.gallery img');
let currentSlide = 0;
if (gallerySlides.length > 0) {
  setInterval(() => {
    gallerySlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % gallerySlides.length;
    gallerySlides[currentSlide].classList.add('active');
  }, 5000);
}
