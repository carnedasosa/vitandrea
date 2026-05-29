// Navbar on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Inviato! ✓';
  btn.style.opacity = '0.7';
  btn.style.cursor = 'default';
  e.target.reset();
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMenu() {
  mobileMenuBtn.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

mobileMenuBtn.addEventListener('click', toggleMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Clean up mobile menu state on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    mobileMenuBtn.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
});

// Mobile Card Touch Feedback
// iOS Safari ignores :active on non-anchor elements — we use touch events instead
function addTouchFeedback(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.add('touched');
    }, { passive: true });

    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('touched'), 200);
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      card.classList.remove('touched');
    }, { passive: true });
  });
}

addTouchFeedback('.stat-card');
addTouchFeedback('.prog-card');
