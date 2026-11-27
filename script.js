import { config } from './config.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Toast ---------- */
const toastEl = $('#toast');
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 5200);
}

/* ---------- WhatsApp ---------- */
const waNumber = () => {
  const n = String(config.whatsappNumber || '').replace(/\D/g, '');
  return /^[1-9]\d{7,14}$/.test(n) ? n : '';
};
function openWhatsApp(message) {
  const n = waNumber();
  if (!n) {
    toast('WhatsApp booking is coming soon — our business number is being configured. Please check back shortly.');
    return;
  }
  const url = `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
  const w = window.open(url, '_blank', 'noopener,noreferrer');
  if (w) w.opener = null;
}

/* ---------- Services ---------- */
$('#services-list').innerHTML = config.services.map((s, i) => `
  <article class="service reveal" data-testid="card-service-${s.id}">
    <div class="service-media">
      <img src="${s.image}" alt="${esc(s.alt)}" loading="lazy" width="1024" height="1024" />
      <span class="img-label">Illustrative</span>
    </div>
    <div class="service-body">
      <span class="idx">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.description)}</p>
      <div class="service-foot">
        <span class="price" data-testid="text-price-${s.id}">${s.price ? esc(s.price) : 'Price on inquiry'}</span>
        <button class="link-btn" data-book="${s.id}" data-testid="button-book-${s.id}">Book on WhatsApp</button>
      </div>
    </div>
  </article>`).join('');

$('#services-list').addEventListener('click', (e) => {
  const b = e.target.closest('[data-book]');
  if (!b) return;
  const s = config.services.find((x) => x.id === b.dataset.book);
  openWhatsApp(`Hello SAARAAZ BEAUTY ACADEMY, I would like to book an appointment for ${s.name}. Could you share availability and pricing?`);
});

/* ---------- Courses ---------- */
const courseSelect = $('#r-course');
config.courses.forEach((c) => courseSelect.add(new Option(c.name, c.id)));

$('#courses-list').innerHTML = config.courses.map((c, i) => `
  <li class="course reveal" data-testid="card-course-${c.id}">
    <span class="course-num">${String(i + 1).padStart(2, '0')}</span>
    <div class="course-thumb"><img src="${c.image}" alt="${esc(c.alt)}" loading="lazy" width="1024" height="1024" /></div>
    <div class="course-main">
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.description)}</p>
      <dl class="course-meta">
        <div><dt>Duration</dt><dd>${c.duration ? esc(c.duration) : 'To be confirmed'}</dd></div>
        <div><dt>Fee</dt><dd data-testid="text-fee-${c.id}">${c.fee ? esc(c.fee) : 'To be confirmed'}</dd></div>
      </dl>
    </div>
    <div class="course-actions">
      <button class="btn btn-ghost-dark sm" data-details="${c.id}" data-testid="button-details-${c.id}">Course details</button>
      <button class="btn btn-dark sm" data-register="${c.id}" data-testid="button-register-${c.id}">Register</button>
    </div>
  </li>`).join('');

function goRegister(id) {
  courseSelect.value = id;
  clearErr('r-course');
  $('#register').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  history.replaceState(null, '', '#register');
  setTimeout(() => $('#r-name').focus({ preventScroll: true }), reduced ? 0 : 700);
}

const dialog = $('#course-dialog');
let activeCourse = null;
function openCourse(id) {
  const c = config.courses.find((x) => x.id === id);
  activeCourse = c;
  $('#cd-img').src = c.image;
  $('#cd-img').alt = c.alt;
  $('#cd-title').textContent = c.name;
  $('#cd-desc').textContent = c.description;
  $('#cd-duration').textContent = c.duration || 'To be confirmed';
  $('#cd-fee').textContent = c.fee || 'To be confirmed';
  $('#cd-learn').innerHTML = c.learn.map((l) => `<li>${esc(l)}</li>`).join('');
  $('#cd-for').textContent = c.forWhom;
  dialog.showModal();
}
$('#courses-list').addEventListener('click', (e) => {
  const d = e.target.closest('[data-details]');
  const r = e.target.closest('[data-register]');
  if (d) openCourse(d.dataset.details);
  if (r) goRegister(r.dataset.register);
});
$('#cd-register').addEventListener('click', () => { dialog.close(); goRegister(activeCourse.id); });
$('#cd-whatsapp').addEventListener('click', () => openWhatsApp(`Hello SAARAAZ BEAUTY ACADEMY, I am interested in the ${activeCourse.name} course. Could you share the duration, fee and next intake? (This is an inquiry, not a registration.)`));

/* Close dialogs via [data-close] and backdrop click */
$$('dialog').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target.closest('[data-close]')) d.close();
  });
});

/* ---------- Gallery + lightbox ---------- */
const grid = $('#gallery-grid');
grid.innerHTML = config.gallery.map((g, i) => `
  <li class="g-item reveal" data-cat="${g.cat}">
    <button class="g-btn" data-index="${i}" aria-label="View larger: ${esc(g.caption)}" data-testid="button-gallery-${i}">
      <img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" width="1024" height="1024" />
      <span class="g-cap"><em>${esc(g.cat)}</em>${esc(g.caption)}</span>
    </button>
  </li>`).join('');

let visible = config.gallery.map((_, i) => i);
$$('.chip').forEach((chip) => chip.addEventListener('click', () => {
  const f = chip.dataset.filter;
  $$('.chip').forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', c === chip); });
  visible = [];
  $$('.g-item', grid).forEach((li, i) => {
    const show = f === 'all' || li.dataset.cat === f;
    li.hidden = !show;
    if (show) visible.push(i);
  });
}));

const lb = $('#lightbox');
let lbPos = 0;
let lbReturn = null;
function showLb() {
  const g = config.gallery[visible[lbPos]];
  $('#lb-img').src = g.src;
  $('#lb-img').alt = g.alt;
  $('#lb-cap').textContent = `${g.caption} — illustrative image (${lbPos + 1} of ${visible.length})`;
}
grid.addEventListener('click', (e) => {
  const b = e.target.closest('.g-btn');
  if (!b) return;
  lbReturn = b;
  lbPos = visible.indexOf(Number(b.dataset.index));
  showLb();
  lb.showModal();
});
const step = (d) => { lbPos = (lbPos + d + visible.length) % visible.length; showLb(); };
$('#lb-prev').addEventListener('click', () => step(-1));
$('#lb-next').addEventListener('click', () => step(1));
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});
lb.addEventListener('close', () => lbReturn && lbReturn.focus());

/* ---------- Social ---------- */
const socialNames = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok', youtube: 'YouTube' };
$('#social-links').innerHTML = Object.entries(socialNames).map(([k, label]) => {
  const url = config.socials[k];
  return /^https:\/\//.test(url || '')
    ? `<a class="social" href="${esc(url)}" target="_blank" rel="noopener noreferrer" data-testid="link-social-${k}">${label}</a>`
    : `<button class="social pending" data-social="${label}" data-testid="button-social-${k}">${label}<small>Pending</small></button>`;
}).join('');
$('#social-links').addEventListener('click', (e) => {
  const b = e.target.closest('[data-social]');
  if (b) toast(`Our official ${b.dataset.social} page is not linked yet — it will appear here once configured.`);
});

/* ---------- Contact details + map ---------- */
const soon = '<span class="soon">Coming soon</span>';
const rows = [
  ['Phone', config.phone ? `<a href="tel:${esc(config.phone.replace(/[^\d+]/g, ''))}">${esc(config.phone)}</a>` : soon],
  ['Email', config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>` : soon],
  ['WhatsApp', `<button class="link-btn dark" id="contact-wa" data-testid="button-contact-whatsapp">${waNumber() ? 'Message us' : 'Coming soon'}</button>`],
  ['Location', config.location ? esc(config.location) : soon],
  ['Hours', config.hours ? esc(config.hours) : soon],
];
$('#contact-list').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
$('#contact-wa').addEventListener('click', () => openWhatsApp('Hello SAARAAZ BEAUTY ACADEMY, I have a question.'));

if (/^https:\/\/www\.google\.com\/maps\/embed/.test(config.mapEmbedUrl)) {
  $('#map').innerHTML = `<iframe src="${esc(config.mapEmbedUrl)}" title="Map to SAARAAZ BEAUTY ACADEMY" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
} else if (config.location) {
  $('#map').innerHTML = `<div class="map-ph"><p>${esc(config.location)}</p><a class="btn btn-dark sm" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.location)}">Open in Maps</a></div>`;
} else {
  $('#map').innerHTML = '<div class="map-ph"><span class="pin" aria-hidden="true"></span><p><strong>Map coming soon</strong>Our address will be published here once confirmed.</p></div>';
}

/* ---------- Forms ---------- */
const errEl = (id) => $(`#${id}-err`);
function setErr(id, msg) {
  const input = $(`#${id}`);
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', `${id}-err`);
  errEl(id).textContent = msg;
}
function clearErr(id) {
  const input = $(`#${id}`);
  input.removeAttribute('aria-invalid');
  if (errEl(id)) errEl(id).textContent = '';
}
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const phoneOk = (v) => /^\+?[\d\s()-]{7,20}$/.test(v) && v.replace(/\D/g, '').length >= 7;
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

function setStatus(el, kind, html) {
  el.className = `form-status show ${kind}`;
  el.innerHTML = html;
}

async function postJSON(endpoint, data) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  return res.ok && json && json.success === true;
}
const endpointOk = (e) => typeof e === 'string' && e.startsWith('/') && !e.startsWith('//');

/* Registration */
const regForm = $('#register-form');
const regStatus = $('#reg-status');
$('#reg-config-status').innerHTML = endpointOk(config.registrationEndpoint)
  ? '<strong>Online applications open.</strong> Submitted applications are sent securely to our team.'
  : '<strong>Online applications are not yet active.</strong> The form can be completed, but applications are not currently submitted or saved. Please use WhatsApp or check back soon.';

function validateRegistration() {
  const f = regForm.elements;
  let ok = true;
  const req = (id, cond, msg) => { if (!cond) { setErr(id, msg); ok = false; } else clearErr(id); };
  req('r-name', f.fullName.value.trim().length >= 2, 'Please enter your full name.');
  req('r-phone', phoneOk(f.contactNumber.value.trim()), 'Please enter a valid contact number.');
  req('r-email', emailOk(f.email.value.trim()), 'Please enter a valid email address.');
  const dob = f.dateOfBirth.value ? new Date(f.dateOfBirth.value) : null;
  req('r-dob', dob && dob < today() && dob.getFullYear() > 1900, 'Please enter a valid date of birth.');
  req('r-address', f.address.value.trim().length >= 5, 'Please enter your address.');
  req('r-course', !!f.selectedCourse.value, 'Please choose a course.');
  const start = f.preferredStartDate.value ? new Date(f.preferredStartDate.value) : null;
  req('r-start', start && start >= today(), 'Please choose a start date from today onward.');
  return ok;
}

regForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateRegistration()) {
    setStatus(regStatus, 'error', 'Please correct the highlighted fields.');
    regForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  if (!endpointOk(config.registrationEndpoint)) {
    setStatus(regStatus, 'info', '<strong>Not submitted.</strong> Your details look complete, but online registration is not configured yet, so nothing was sent or saved. Please contact us via WhatsApp to register your interest.');
    return;
  }
  const btn = regForm.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  const data = Object.fromEntries(new FormData(regForm));
  data.selectedCourseName = config.courses.find((c) => c.id === data.selectedCourse)?.name || '';
  try {
    if (await postJSON(config.registrationEndpoint, data)) {
      setStatus(regStatus, 'success', '<strong>Application received.</strong> Thank you — our team will contact you to confirm details.');
      regForm.reset();
    } else throw new Error();
  } catch {
    setStatus(regStatus, 'error', '<strong>Not submitted.</strong> Something went wrong sending your application. Please try again or reach us on WhatsApp.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Submit Application';
  }
});

$('#reg-whatsapp').addEventListener('click', () => {
  const f = regForm.elements;
  const course = config.courses.find((c) => c.id === f.selectedCourse.value);
  const name = f.fullName.value.trim();
  openWhatsApp(`Hello SAARAAZ BEAUTY ACADEMY,${name ? ` my name is ${name}.` : ''} I am interested in ${course ? `the ${course.name} course` : 'your courses'}. This is an inquiry, not a completed registration — could you share the next steps?`);
});

/* Contact */
const cForm = $('#contact-form');
const cStatus = $('#contact-status');
cForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = cForm.elements;
  let ok = true;
  const req = (id, cond, msg) => { if (!cond) { setErr(id, msg); ok = false; } else clearErr(id); };
  req('c-name', f.name.value.trim().length >= 2, 'Please enter your name.');
  req('c-email', emailOk(f.email.value.trim()), 'Please enter a valid email address.');
  req('c-msg', f.message.value.trim().length >= 10, 'Please write a message of at least 10 characters.');
  if (!ok) { setStatus(cStatus, 'error', 'Please correct the highlighted fields.'); cForm.querySelector('[aria-invalid="true"]')?.focus(); return; }
  if (!endpointOk(config.contactEndpoint)) {
    setStatus(cStatus, 'info', '<strong>Not sent.</strong> Our contact inbox is not connected yet, so this message was not delivered. Contact details are coming soon.');
    return;
  }
  try {
    if (await postJSON(config.contactEndpoint, Object.fromEntries(new FormData(cForm)))) {
      setStatus(cStatus, 'success', '<strong>Message sent.</strong> Thank you — we will reply soon.');
      cForm.reset();
    } else throw new Error();
  } catch {
    setStatus(cStatus, 'error', '<strong>Not sent.</strong> Please try again shortly.');
  }
});

$$('input, select, textarea').forEach((el) => el.addEventListener('input', () => el.id && el.getAttribute('aria-invalid') && clearErr(el.id)));

/* ---------- Navigation ---------- */
const header = $('.site-header');
const toggle = $('.menu-toggle');
const links = $('#nav-links');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', open);
  toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
  document.body.classList.toggle('menu-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); } });

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  $('.to-top').classList.toggle('show', window.scrollY > 900);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const navMap = new Map($$('.nav-links a').map((a) => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting && navMap.has(en.target.id)) {
      navMap.forEach((a) => a.removeAttribute('aria-current'));
      navMap.get(en.target.id).setAttribute('aria-current', 'true');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach((s) => spy.observe(s));

/* ---------- Reveal ---------- */
if (reduced || !('IntersectionObserver' in window)) {
  $$('.reveal').forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));
}
requestAnimationFrame(() => document.body.classList.add('loaded'));
$('#year').textContent = new Date().getFullYear();
