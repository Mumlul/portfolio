// ===== SHARED JS =====

// CURSOR
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorRing.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
  });
  document.querySelectorAll('a, button, .achievement-card, .work-card, .doc-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
  });
}

// PROGRESS BAR
const progressBar = document.getElementById('readingProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const progress = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// NAV SCROLL
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}
function closeMobile() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// SCROLL REVEAL
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}
initReveal();

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobile();
    }
  });
});

// SHOW MORE
function initShowMore(gridSelector, btnSelector, initialCount = 4) {
  const grid = document.querySelector(gridSelector);
  const btn = document.querySelector(btnSelector);
  if (!grid || !btn) return;

  const items = Array.from(grid.children);
  let expanded = false;

  // Hide items beyond initial count
  items.forEach((item, i) => {
    if (i >= initialCount) item.style.display = 'none';
  });

  if (items.length <= initialCount) {
    btn.parentElement.style.display = 'none';
    return;
  }

  btn.addEventListener('click', () => {
    expanded = !expanded;
    items.forEach((item, i) => {
      if (i >= initialCount) {
        item.style.display = expanded ? '' : 'none';
        if (expanded) {
          item.classList.remove('visible');
          setTimeout(() => item.classList.add('visible'), 50);
        }
      }
    });
    btn.querySelector('.btn-text').textContent = expanded ? 'Скрыть' : 'Показать ещё';
    btn.classList.toggle('expanded', expanded);
  });
}

// AUTO INIT SHOW MORE — runs automatically on any page that has the grids
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('projectsGrid'))    initShowMore('#projectsGrid',    '#projectsShowMore',    4);
  if (document.getElementById('achievementsGrid')) initShowMore('#achievementsGrid','#achievementsShowMore', 4);
  if (document.getElementById('certsGrid'))        initShowMore('#certsGrid',       '#certsShowMore',        4);
  if (document.getElementById('citizenGrid'))      initShowMore('#citizenGrid',     '#citizenShowMore',      4);
});

// ACTIVE NAV LINK
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}
setActiveNav();

// TYPEWRITER (for hero)
function typewriter(el, text, speed = 60) {
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// SKILL BARS
function initSkillBars() {
  const skillBars = document.getElementById('skillBars');
  if (!skillBars) return;
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.transform = `scaleX(${fill.getAttribute('data-width')})`;
          fill.classList.add('animated');
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  barObserver.observe(skillBars);
}
initSkillBars();
