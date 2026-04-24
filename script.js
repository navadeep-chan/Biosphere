/* ===== THEME TOGGLE ===== */
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

/* ===== REVEAL ON SCROLL ===== */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ===== NUCLEOTIDE BG ===== */
const bases = ['A','T','G','C','A','T','G','C','A','A','T','G','C','G','C'];
function randomSeq(len) {
  let s = '';
  for (let i = 0; i < len; i++) s += bases[Math.floor(Math.random()*bases.length)] + ' ';
  return s;
}
const nucBg = document.getElementById('nucBg');
for (let i = 0; i < 18; i++) {
  const div = document.createElement('div');
  div.className = 'nuc-line';
  div.textContent = randomSeq(120);
  div.style.top = (i * 5.6) + '%';
  div.style.animationDelay = (Math.random() * -20) + 's';
  div.style.fontSize = (0.6 + Math.random() * 0.25) + 'rem';
  nucBg.appendChild(div);
}

/* ===== 3D DNA CANVAS ===== */
const canvas = document.getElementById('dna-canvas');
const ctx = canvas.getContext('2d');
let angle = 0;

function setCanvasSize() {
  if (window.innerWidth <= 900) {
    canvas.width  = 160;
    canvas.height = 260;
  } else {
    canvas.width  = 300;
    canvas.height = 1000;
  }
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

function getThemeColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    strand1: dark ? '#52b788' : '#2d6a4f',
    strand2: dark ? '#95d5b2' : '#74c69d',
    rung: dark ? 'rgba(82,183,136,0.55)' : 'rgba(45,106,79,0.4)',
    baseA: dark ? '#52b788' : '#2d6a4f',
    baseT: dark ? '#95d5b2' : '#52b788',
    baseG: dark ? '#b7e4c7' : '#74c69d',
    baseC: dark ? '#d8f3dc' : '#95d5b2',
    glow: dark ? 'rgba(82,183,136,0.13)' : 'rgba(45,106,79,0.07)',
  };
}

/* ===== REELS ===== */

// Auto-attempt play (browsers need muted for autoplay)
document.querySelectorAll('.reel-video').forEach(v => {
  v.play().catch(() => {
    // Autoplay blocked — mark as paused so play icon shows
    const card = v.closest('.reel-card');
    if (card) card.classList.add('paused');
  });
});

// Play / Pause on click
function togglePlay(n) {
  const video = document.getElementById('video-' + n);
  const card  = document.getElementById('reel-' + n);
  if (video.paused) {
    video.play();
    card.classList.remove('paused');
  } else {
    video.pause();
    card.classList.add('paused');
  }
}

// Mute / Unmute
function toggleMute(e, n) {
  e.stopPropagation(); // don't trigger play/pause
  const video = document.getElementById('video-' + n);
  const btn   = document.getElementById('mute-' + n);
  video.muted = !video.muted;
  btn.textContent = video.muted ? '🔇' : '🔊';
}

// Progress bar update
[1, 2, 3].forEach(n => {
  const video    = document.getElementById('video-' + n);
  const progress = document.getElementById('progress-' + n);
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      progress.style.width = pct + '%';
    }
  });
});

/* ===== SERVICE MODAL ===== */
const serviceData = {
  bioinformatics: {
    title: 'Bioinformatics Analysis',
    desc: 'We provide complete bioinformatics analysis support for all types of computational biology projects. This includes Data collection, sequence analysis, genome and transcriptome studies, molecular docking, primer designing, protein structure analysis, sequence 3D structure construction, variant annotation, phylogenetic studies, and data interpretation. Whether you have raw experimental data or already processed datasets, we create the right workflow based on your research needs and help turn complex biological data into clear scientific results.',
    moreSubject: 'More Details – Bioinformatics Analysis',
    bookSubject: 'Book Now – Bioinformatics Analysis',
  },
  custom: {
    title: 'Custom Bioinformatics Solutions',
    desc: 'Every research project is different, so we offer fully customized computational biology solutions based on your exact requirements. From protein modeling, docking studies, simulation workflows, and 3D molecular design to advanced data analysis using machine learning, automation pipelines and even creating your own web application we handle all kinds of bioinformatics and computational biology tasks. If your work involves biology and computation, we design a solution specifically for you.',
    moreSubject: 'More Details – Custom Bioinformatics Solutions',
    bookSubject: 'Book Now – Custom Bioinformatics Solutions',
  },
  student: {
    title: 'Student Project Support',
    desc: 'We provide complete end-to-end support for M.Sc., M.Tech, and B.Sc. life science students undertaking academic projects. This includes help with topic selection, literature review, tool setup, data collection, analysis, result interpretation, and final report or presentation preparation. Our mentors ensure you not only submit a great project but also deeply understand the science behind it.',
    moreSubject: 'More Details – Student Project Support',
    bookSubject: 'Book Now – Student Project Support',
  },
  workshop: {
    title: 'Workshops & Training',
    desc: 'Our hands-on workshops are designed for students and early-career researchers who want practical skills in computational biology. Topics include molecular docking using AutoDock Vina, MD simulations with GROMACS, sequence analysis, primer designing, Python and R for bioinformatics and machine learning and AI integration in Bioinformatics. Sessions are conducted online across Kerala with certificates provided on completion.',
    moreSubject: 'More Details – Workshops & Training',
    bookSubject: 'Book Now – Workshops & Training',
  },
};

const CONTACT_EMAIL = 'thebiospherecompany@gmail.com';

function openModal(key) {
  const data = serviceData[key];
  document.getElementById('modalIcon').textContent  = data.icon;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent  = data.desc;

  document.getElementById('modalMoreBtn').onclick = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(data.moreSubject)}&body=${encodeURIComponent('Hi Biosphere,\n\nI would like to know more details about your ' + data.title + ' service.\n\nName:\nPhone:\nMessage:')}`,'_blank');
  };

  document.getElementById('modalBookBtn').onclick = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(data.bookSubject)}&body=${encodeURIComponent('Hi Biosphere,\n\nI would like to book the ' + data.title + ' service.\n\nName:\nPhone:\nMessage:')}`,'_blank');
  };

  document.getElementById('serviceModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('serviceModal').classList.remove('active');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('serviceModal')) closeModal();
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function drawDNA(t) {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const c = getThemeColors();
  const cx = W / 2;
  const numPairs = 26;
  const pairH = H / numPairs;
  const ampX = W <= 160 ? 44 : 72;
  const freq = (2 * Math.PI) / numPairs;

  // Draw rungs (base pairs)
  for (let i = 0; i < numPairs; i++) {
    const y = pairH * i + pairH / 2;
    const phase = freq * i + t;
    const x1 = cx + Math.cos(phase) * ampX;
    const x2 = cx + Math.cos(phase + Math.PI) * ampX;
    const depth = Math.cos(phase);
    const alpha = 0.25 + 0.6 * Math.abs(depth);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = c.rung;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    // Base dots
    const bColors = [c.baseA, c.baseT, c.baseG, c.baseC];
    const col = bColors[i % 4];
    const r = (W <= 160 ? 3 : 5) + 2 * Math.abs(depth);
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(x1, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = bColors[(i + 2) % 4];
    ctx.beginPath(); ctx.arc(x2, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // Draw strands
  for (let strand = 0; strand < 2; strand++) {
    const phaseOffset = strand === 0 ? 0 : Math.PI;
    ctx.beginPath();
    ctx.lineWidth = W <= 160 ? 2.5 : 3.5;
    ctx.strokeStyle = strand === 0 ? c.strand1 : c.strand2;
    ctx.shadowColor = strand === 0 ? c.strand1 : c.strand2;
    ctx.shadowBlur = 10;
    for (let i = 0; i <= numPairs * 8; i++) {
      const frac = i / (numPairs * 8);
      const y = frac * H;
      const phase = freq * numPairs * frac + t + phaseOffset;
      const x = cx + Math.cos(phase) * ampX;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function animDNA() {
  angle += 0.018;
  drawDNA(angle);
  requestAnimationFrame(animDNA);
}
animDNA();

/* ===== CONTACT FORM ===== */
async function handleSubmit() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const successBox = document.getElementById('form-success');
  const errorBox = document.getElementById('form-error');
  const btn = document.getElementById('submitBtn');

  successBox.style.display = 'none';
  errorBox.style.display = 'none';

  if (!name || !email || !message) {
    alert('Fill required fields');
    return;
  }

  btn.innerText = "Sending...";
  btn.disabled = true;

  try {
    const res = await fetch("https://formspree.io/f/mqewywld", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (res.ok) {
      successBox.style.display = 'block';
      btn.innerText = "Sent ✓";
    } else {
      errorBox.style.display = 'block';
    }
  } catch {
    errorBox.style.display = 'block';
  }

  btn.disabled = false;
}