// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('cta-button')) {
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.boxShadow = '0 0 25px rgba(51, 153, 255, 1)';
  }
});
document.addEventListener('mouseout', () => {
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursor.style.boxShadow = '0 0 15px rgba(51, 153, 255, 0.8)';
});

// ==================== LOADING SCREEN ====================
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('loading');
      setTimeout(() => { loadingScreen.remove(); }, 500);
    }
  }, 1500);
});

// ==================== STARS BACKGROUND ====================
const canvas = document.getElementById('stars');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStars();
  }
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = '#c1d4ff';
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  resize();
  window.addEventListener('resize', resize);
  setInterval(drawStars, 3000);
}

// ==================== MOBILE MENU ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// ==================== STATS COUNTER ====================
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = () => {
  if (hasAnimated) return;
  hasAnimated = true;
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 200;
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const statsSection = document.querySelector('.stats');
if (statsSection && counters.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounter();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navMenu) navMenu.classList.remove('active');
      }
    }
  });
});

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
    if (!isActive) {
      item.classList.add('active');
    }
    document.querySelectorAll('.faq-toggle').forEach(toggle => toggle.textContent = '+');
    if (!isActive) question.querySelector('.faq-toggle').textContent = '−';
  });
});

// ==================== CONTACT FORM ====================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    // Don't prevent default - let Formspree handle it
    // Just show a loading message
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '✉️ Sending your message...';
    formMessage.style.color = '#80bfff';
    formMessage.style.display = 'block';
  });
  
  // Listen for response
  form.addEventListener('formspree:submit', function(e) {
    e.preventDefault();
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '✅ Message sent successfully! We\'ll contact you within 24 hours.';
    formMessage.style.color = '#00cc66';
    formMessage.style.display = 'block';
    form.reset();
    setTimeout(() => formMessage.style.display = 'none', 5000);
  });
}
// ==================== KEYBOARD ESCAPE ====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu) {
    navMenu.classList.remove('active');
  }
});

// ==================== CONSOLE BRANDING ====================
console.log('%cWelcome to AstroDev', 'color: #3399ff; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with ❤️ by AstroDev', 'color: #80bfff; font-size: 14px;');

// ==================== PAGE READY ====================
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('loading');
});
