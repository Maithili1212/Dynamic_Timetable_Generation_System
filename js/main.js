/* =============================================
   EduFlow - Main JavaScript
   Smart Timetable Generator
   ============================================= */

// ========== SPLASH SCREEN ==========
(function () {
  const splash = document.getElementById('splash');
if (!splash) return;
  const nav    = document.getElementById('navbar');
  const clock  = document.getElementById('clock');

  splash.innerHTML = `
    <style>
      #splash {
        position: fixed;
        inset: 0;
        background: #f8fbff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        overflow: hidden;
      }
      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(65px);
        opacity: 0;
        transition: opacity 1s ease;
      }
      .blob.show { opacity: 1; }

      .sp-row {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      .sp-glow {
        position: absolute;
        width: 260px; height: 260px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(56,189,248,0) 70%);
        opacity: 0;
        transform: scale(0.2);
        transition: opacity 0.7s ease, transform 0.7s ease;
        pointer-events: none;
      }
      .sp-glow.show {
        opacity: 1;
        transform: scale(1);
        animation: pulseG 1.8s ease-in-out infinite;
      }
      @keyframes pulseG {
        0%,100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.4; transform: scale(1.3); }
      }

      .sp-badge {
        width: 140px; height: 140px;
        border-radius: 40px;
        background: #ffffff;
        border: 2.5px solid rgba(56,189,248,0.3);
        display: flex; align-items: center; justify-content: center;
        opacity: 0;
        transform: scale(0.2);
        transition:
          opacity 0.6s ease,
          transform 0.7s cubic-bezier(0.34,1.56,0.64,1),
          width 0.8s cubic-bezier(0.34,1.2,0.64,1),
          height 0.8s cubic-bezier(0.34,1.2,0.64,1),
          border-radius 0.8s ease;
        position: relative;
        z-index: 2;
        flex-shrink: 0;
      }
      .sp-badge.show {
        opacity: 1;
        transform: scale(1);
        animation: badgeG 1.8s ease-in-out infinite 0.6s;
      }
      .sp-badge.small {
        width: 80px; height: 80px;
        border-radius: 22px;
        animation: badgeG 1.8s ease-in-out infinite;
      }
      @keyframes badgeG {
        0%,100% { box-shadow: 0 0 12px 3px rgba(56,189,248,0.25); border-color: rgba(56,189,248,0.3); }
        50%      { box-shadow: 0 0 50px 18px rgba(56,189,248,0.55); border-color: rgba(56,189,248,1); }
      }

      .sp-svg-big { display: block; }
      .sp-svg-small { display: none; }
      .sp-badge.small .sp-svg-big { display: none; }
      .sp-badge.small .sp-svg-small { display: block; }

      .sp-text-wrap {
        overflow: hidden;
        width: 0px;
        opacity: 0;
        transition: width 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        padding-left: 0px;
      }
      .sp-text-wrap.show {
        width: 340px;
        opacity: 1;
        padding-left: 18px;
      }

      .sp-text {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 72px;
        letter-spacing: 8px;
        color: #0A0A0A;
        white-space: nowrap;
        line-height: 1;
      }
      .sp-text .sky { color: #38BDF8; }
      .sp-text .thin {
        font-family: 'DM Sans', sans-serif;
        font-weight: 300;
        font-size: 13px;
        letter-spacing: 6px;
        color: #6B7280;
        display: block;
        margin-top: 2px;
        text-transform: uppercase;
      }

      #splash.sp-out {
        animation: spOut 0.5s ease forwards;
      }
      @keyframes spOut {
        to { opacity: 0; pointer-events: none; }
      }
    </style>

    <div class="blob" id="b1" style="width:320px;height:320px;background:#E0F4FF;top:-80px;left:-80px;"></div>
    <div class="blob" id="b2" style="width:250px;height:250px;background:#FFB3C6;bottom:-60px;right:-60px;"></div>
    <div class="blob" id="b3" style="width:200px;height:200px;background:#B5EAD7;bottom:8%;left:4%;"></div>
    <div class="blob" id="b4" style="width:170px;height:170px;background:#FFF176;top:8%;right:4%;"></div>
    <div class="blob" id="b5" style="width:140px;height:140px;background:#C5B4E3;top:40%;right:2%;"></div>
    <div class="blob" id="b6" style="width:130px;height:130px;background:#FFDAB9;top:35%;left:2%;"></div>

    <div class="sp-row" id="spRow">
      <div style="position:relative;display:flex;align-items:center;justify-content:center;">
        <div class="sp-glow" id="spGlow"></div>
        <div class="sp-badge" id="spBadge">
          <svg class="sp-svg-big" width="74" height="74" viewBox="0 0 120 120" fill="none">
            <rect x="18" y="20" width="12" height="80" fill="#38BDF8"/>
            <rect x="18" y="20" width="44" height="12" fill="#38BDF8"/>
            <rect x="18" y="54" width="36" height="12" fill="#38BDF8"/>
            <rect x="18" y="88" width="44" height="12" fill="#38BDF8"/>
            <rect x="66" y="20" width="12" height="80" fill="#0A0A0A"/>
            <rect x="66" y="20" width="36" height="12" fill="#0A0A0A"/>
            <rect x="66" y="54" width="28" height="12" fill="#0A0A0A"/>
          </svg>
          <svg class="sp-svg-small" width="40" height="40" viewBox="0 0 120 120" fill="none">
            <rect x="18" y="20" width="12" height="80" fill="#38BDF8"/>
            <rect x="18" y="20" width="44" height="12" fill="#38BDF8"/>
            <rect x="18" y="54" width="36" height="12" fill="#38BDF8"/>
            <rect x="18" y="88" width="44" height="12" fill="#38BDF8"/>
            <rect x="66" y="20" width="12" height="80" fill="#0A0A0A"/>
            <rect x="66" y="20" width="36" height="12" fill="#0A0A0A"/>
            <rect x="66" y="54" width="28" height="12" fill="#0A0A0A"/>
          </svg>
        </div>
      </div>
      <div class="sp-text-wrap" id="spTextWrap">
        <div class="sp-text">
          <span class="sky">Edu</span>Flow
          <span class="thin">Timetable System</span>
        </div>
      </div>
    </div>
  `;

  const blobs = [1,2,3,4,5,6].map(i => splash.querySelector('#b'+i));

  setTimeout(() => blobs.forEach(b => b.classList.add('show')), 100);
  setTimeout(() => {
    splash.querySelector('#spGlow').classList.add('show');
    splash.querySelector('#spBadge').classList.add('show');
  }, 350);
  setTimeout(() => {
    splash.querySelector('#spBadge').classList.add('small');
  }, 1700);
  setTimeout(() => {
    splash.querySelector('#spTextWrap').classList.add('show');
  }, 2100);

  // hide splash
  setTimeout(() => {
    splash.classList.add('sp-out');
    if (nav)   nav.classList.add('show');
    if (clock) clock.classList.add('show');
    setTimeout(() => { splash.style.display = 'none'; }, 500);
  }, 3600);
})();

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
}

// ========== MODAL ==========
function openModal(tab) {
  document.getElementById('modalBg').classList.add('open');
  switchTab(tab);
}
function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
}
function closeOutside(e) {
  if (e.target.id === 'modalBg') closeModal();
}
function switchTab(tab) {
  document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.fpanel').forEach(p => p.classList.remove('active'));
  document.querySelector(`#p-${tab}`).classList.add('active');
  document.querySelectorAll('.mtab')[tab === 'login' ? 0 : 1].classList.add('active');
}

// ========== AUTH ==========
// Login and Signup are handled by index.html script block.
// This section intentionally left empty to avoid conflicts.

// ========== LIVE CLOCK ==========
function updateClock() {
  const now    = new Date();
  const h      = String(now.getHours()).padStart(2, '0');
  const m      = String(now.getMinutes()).padStart(2, '0');
  const s      = String(now.getSeconds()).padStart(2, '0');
  const timeEl = document.getElementById('clock-time');
  if (timeEl) timeEl.innerHTML = `${h}<em>:</em>${m}<em>:</em>${s}`;
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dateEl = document.getElementById('clock-date');
  if (dateEl) dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
setInterval(updateClock, 1000);
updateClock();

// ========== SCROLL REVEAL ==========
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// ========== COUNTER ANIMATION ==========
function animateCounter(el, target) {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(timer); }
    el.textContent = count + '+';
  }, 30);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targets = [120, 85, 340, 500];
      document.querySelectorAll('.stat-n').forEach((el, i) => animateCounter(el, targets[i]));
      statObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const statsSection = document.querySelector('.section-stats');
if (statsSection) statObserver.observe(statsSection);


