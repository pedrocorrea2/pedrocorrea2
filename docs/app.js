// ==== Utilidades ====
const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);

const formatNumber = (v) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const parseNumber = (v) => parseInt(String(v).replace(/\./g, ''), 10) || 0;

// Valida RUT con Módulo 11 (DV 0/K)
function validaRUT(rutStr){
  const clean = String(rutStr).replace(/[^0-9kK]/g,'').toUpperCase();
  if(clean.length < 2) return false;
  const body = clean.slice(0,-1), dv = clean.slice(-1);
  let sum=0, mul=2;
  for(let i=body.length-1;i>=0;i--){
    sum += parseInt(body[i],10)*mul;
    mul = (mul===7)?2:mul+1;
  }
  const res = 11 - (sum % 11);
  const dvCalc = res===11?'0':res===10?'K':String(res);
  return dv===dvCalc;
}

const formatRUT = (rut) => {
  const cleaned = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleaned.length <= 1) return cleaned;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedBody}-${dv}`;
};

// ==== Calculadora ====
class Calculator {
  constructor() {
    this.elements = {
      amountInput: document.getElementById('invoiceAmount'),
      rateSlider: document.getElementById('rate'),
      rateDisplay: document.getElementById('rateDisplay'),
      presetBtns: document.querySelectorAll('.preset-btn'),
      termBtns: document.querySelectorAll('.term-btn'),
      sumAmount: document.getElementById('sumAmount'),
      sumFinanced: document.getElementById('sumFinanced'),
      sumDiscount: document.getElementById('sumDiscount'),
      sumFee: document.getElementById('sumFee'),
      sumNet: document.getElementById('sumNet')
    };
    this.state = { days: 30, fee: 50000 };
    this.init();
  }
  init() { this.bindEvents(); this.updateRateDisplay(); this.calculate(); }
  bindEvents() {
    this.elements.amountInput.addEventListener('input', (e) => {
      const raw = e.target.value.replace(/\D/g, '');
      e.target.value = raw ? formatNumber(raw) : '';
      this.calculate();
    });
    this.elements.rateSlider.addEventListener('input', () => { this.updateRateDisplay(); this.calculate(); });
    this.elements.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.amountInput.value = formatNumber(btn.dataset.value);
        this.calculate();
        btn.classList.add('loading'); setTimeout(() => btn.classList.remove('loading'), 300);
      });
    });
    this.elements.termBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.termBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
        this.state.days = parseInt(btn.dataset.days, 10);
        this.calculate();
      });
    });
  }
  updateRateDisplay() {
    const rate = parseFloat(this.elements.rateSlider.value);
    this.elements.rateDisplay.textContent = `${rate.toFixed(1)}%`;
  }
  calculate() {
    const amount = parseNumber(this.elements.amountInput.value);
    const rate = parseFloat(this.elements.rateSlider.value) || 0;
    const discount = amount * (rate / 100) * (this.state.days / 30);
    const net = Math.max(0, amount - discount - this.state.fee);
    this.animateValue(this.elements.sumAmount, amount, formatCurrency);
    this.animateValue(this.elements.sumFinanced, amount, formatCurrency);
    this.animateValue(this.elements.sumDiscount, discount, formatCurrency);
    this.animateValue(this.elements.sumFee, this.state.fee, formatCurrency);
    this.animateValue(this.elements.sumNet, net, formatCurrency);
  }
  animateValue(element, targetValue, formatter) {
    const currentText = element.textContent.replace(/[^\d]/g, '');
    const currentValue = parseInt(currentText || '0', 10) || 0;
    const duration = 500, startTime = performance.now();
    const animate = (t) => {
      const progress = Math.min((t - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = currentValue + (targetValue - currentValue) * ease;
      element.textContent = formatter(Math.round(val));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}

// ==== Contadores ====
class StatsCounter {
  constructor() { this.hasAnimated = false; this.init(); }
  init() {
    const section = document.querySelector('.stats');
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) { this.animateStats(); this.hasAnimated = true; }
      });
    }, { threshold: 0.5 });
    observer.observe(section);
  }
  animateStats() {
    document.querySelectorAll('.stat-value').forEach(el => {
      const target = parseInt(el.dataset.target) || 0;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 2000, startTime = performance.now();
      const step = (t) => {
        const progress = Math.min((t - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * ease);
        let display;
        if (target >= 1_000_000_000) display = `${prefix}${(current / 1_000_000_000).toFixed(1)}B`;
        else if (target >= 1_000_000) display = `${prefix}${(current / 1_000_000).toFixed(0)}M`;
        else if (target >= 1_000) display = `${prefix}${(current / 1_000).toFixed(0)}K`;
        else display = `${prefix}${current}${suffix}`;
        el.textContent = display;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
}

// ==== Header ====
class HeaderController {
  constructor(){ this.header = document.querySelector('.header'); this.lastScroll = 0; this.init(); }
  init(){
    if(!this.header) return;
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  }
  handleScroll(){
    const y = window.pageYOffset;
    if (y > this.lastScroll && y > 100) this.header.classList.add('hidden'); else this.header.classList.remove('hidden');
    if (y > 50) this.header.classList.add('scrolled'); else this.header.classList.remove('scrolled');
    this.lastScroll = y;
  }
}

// ==== Mobile Nav ====
class MobileNav {
  constructor(){ this.toggle = document.getElementById('mobileToggle'); this.nav = document.getElementById('mobileNav'); this.init(); }
  init(){
    if(!this.toggle || !this.nav) return;
    this.toggle.addEventListener('click', () => this.toggleNav());
    this.nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') this.closeNav(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.nav.classList.contains('open')) this.closeNav(); });
  }
  toggleNav(){ this.nav.classList.toggle('open'); this.toggle.setAttribute('aria-expanded', this.nav.classList.contains('open') ? 'true' : 'false'); this.toggle.innerHTML = this.nav.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>'; }
  closeNav(){ this.nav.classList.remove('open'); this.toggle.setAttribute('aria-expanded','false'); this.toggle.innerHTML = '<i class="fa-solid fa-bars"></i>'; }
}

// ==== Modal (focus trap y validación RUT) ====
class ModalController {
  constructor(){
    this.modal = document.getElementById('loginModal');
    this.openBtn = document.getElementById('loginToggle');
    this.closeBtn = document.getElementById('loginClose');
    this.form = document.getElementById('loginForm');
    this.rutInput = document.getElementById('loginUser');
    this.previouslyFocused = null;
    this.keydownHandler = null;
    this.init();
  }
  init(){
    if(!this.modal) return;
    this.openBtn?.addEventListener('click', () => this.openModal());
    this.closeBtn?.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) this.closeModal(); });

    this.rutInput?.addEventListener('input', (e) => { e.target.value = formatRUT(e.target.value); });

    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const rutOk = validaRUT(this.rutInput.value);
      const err = document.getElementById('rutError');
      if(!rutOk){
        err.classList.remove('sr-only'); err.textContent = 'RUT inválido. Revisa el dígito verificador.';
        this.rutInput.focus(); return;
      } else { err.classList.add('sr-only'); err.textContent=''; }
      this.handleLogin();
    });
  }
  openModal(){
    this.previouslyFocused = document.activeElement;
    this.modal.classList.remove('hidden');
    this.modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // Focus trap
    const focusables = this.modal.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
    const first = focusables[0], last = focusables[focusables.length-1];
    this.keydownHandler = (e)=>{
      if(e.key==='Tab'){
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
      }
    };
    this.modal.addEventListener('keydown', this.keydownHandler);
    setTimeout(()=> this.rutInput?.focus(), 100);
  }
  closeModal(){
    this.modal.classList.add('hidden');
    this.modal.setAttribute('hidden','');
    document.body.style.overflow = '';
    if (this.keydownHandler) this.modal.removeEventListener('keydown', this.keydownHandler);
    this.openBtn?.focus();
  }
  handleLogin(){
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';
    submitBtn.disabled = true;
    setTimeout(() => {
      alert('Portal de clientes próximamente disponible. Te notificaremos cuando esté listo.');
      this.form.reset(); this.closeModal();
      submitBtn.innerHTML = original; submitBtn.disabled = false;
    }, 1500);
  }
}

// ==== Contacto ====
class ContactForm {
  constructor(){ this.form = document.getElementById('contactForm'); this.init(); }
  init(){
    if(!this.form) return;
    this.form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
  }
  handleSubmit(){
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...'; submitBtn.disabled = true;
    setTimeout(() => {
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo dentro de las próximas 24 horas.');
      this.form.reset(); submitBtn.innerHTML = original; submitBtn.disabled = false;
    }, 2000);
  }
}

// ==== Galería ====
class Gallery {
  constructor(){ this.slides = document.querySelectorAll('.gallery img'); this.currentSlide = 0; this.init(); }
  init(){ if (this.slides.length === 0) return; setInterval(() => this.nextSlide(), 5000); }
  nextSlide(){ this.slides[this.currentSlide].classList.remove('active'); this.currentSlide = (this.currentSlide + 1) % this.slides.length; this.slides[this.currentSlide].classList.add('active'); }
}

// ==== Reveal ====
class RevealAnimations {
  constructor(){ this.elements = document.querySelectorAll('.reveal'); this.init(); }
  init(){
    const observer = new IntersectionObserver((entries, ob) => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); ob.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    this.elements.forEach(el => observer.observe(el));
  }
}

// ==== Scroll suave (no bloquear enlaces sin destino) ====
class SmoothScroll {
  constructor(){ this.init(); }
  init(){
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const y = target.offsetTop - headerHeight - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }
}

// ==== App ====
class App {
  constructor(){ this.init(); }
  init(){
    new Calculator();
    new StatsCounter();
    new HeaderController();
    new MobileNav();
    new ModalController();
    new ContactForm();
    new Gallery();
    new RevealAnimations();
    new SmoothScroll();

    document.getElementById('btnFirmaDocsTop')?.addEventListener('click', () => {
      alert('Portal de firma digital próximamente disponible. Te notificaremos cuando esté listo.');
    });
    document.getElementById('btnConoceNos')?.addEventListener('click', () => {
      document.querySelector('#proceso')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    this.optimizeImages();
  }
  optimizeImages(){
    const images = document.querySelectorAll('img[src]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('loaded'); io.unobserve(entry.target); }
      });
    });
    images.forEach(img => io.observe(img));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else { new App(); }

window.addEventListener('error', (e) => { console.error('Error en la aplicación:', e.error); });

// Service worker: solo registra si existe /sw.js en el origen
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    fetch('/sw.js', { method: 'HEAD' }).then(r => {
      if (r.ok) navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }).catch(()=>{});
  });
}

