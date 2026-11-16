'use strict';

const WISHES = [
  'Que nunca te falten razones para sonreír.',
  'Que tus sueños encuentren el camino para cumplirse.',
  'Que siempre recuerdes lo valiosa que eres.',
  'Que tengas aventuras que te hagan feliz.',
  'Que conozcas lugares que te enamoren de la vida.',
  'Que estés rodeada de personas sinceras.',
  'Que nunca pierdas esa esencia que te hace única.',
  'Que encuentres fuerza incluso en los días difíciles.',
  'Que recibas tanto cariño como el que mereces.',
  'Que cada año te regale recuerdos maravillosos.',
  'Que tengas el valor de perseguir tus metas.',
  'Que nunca dudes de lo mucho que puedes lograr.',
  'Que encuentres belleza en los pequeños detalles.',
  'Que siempre tengas motivos para celebrar.',
  'Que este nuevo capítulo traiga sorpresas hermosas.',
  'Que la vida te permita vivir momentos inolvidables.',
  'Que, entre tantos universos, este siempre te regale felicidad.'
];
const STORAGE_KEY = 'sarita-verse-wishes-v1';
const $ = id => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let visited = new Set();
let currentWish = 0;
let lastFocus = null;
let toastTimer;
let introTimer;

function loadProgress() {
  try {
    const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(value)) visited = new Set(value.filter(n => Number.isInteger(n) && n >= 0 && n < WISHES.length));
  } catch (_) { visited = new Set(); }
}
function saveProgress() { try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...visited])); } catch (_) {} }
function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2600);
}
function buildWishes() {
  $('wish-grid').innerHTML = '';
  WISHES.forEach((wish, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wish-tile' + (visited.has(i) ? ' visited' : '');
    button.dataset.index = String(i);
    button.setAttribute('aria-label', `Deseo ${i + 1}${visited.has(i) ? ', descubierto' : ', por descubrir'}`);
    button.innerHTML = `<span class="tile-check" aria-hidden="true">✓</span><span class="tile-star" aria-hidden="true">✦</span><span class="tile-index">${String(i + 1).padStart(2, '0')} / 17</span>`;
    button.addEventListener('click', () => showWish(i));
    $('wish-grid').append(button);
  });
  updateProgress();
}
function updateProgress() {
  const count = visited.size;
  $('wish-count').textContent = String(count);
  $('progress-fill').style.width = `${count / WISHES.length * 100}%`;
  $('wish-progress').setAttribute('aria-valuenow', String(count));
  const complete = count === WISHES.length;
  const unlock = $('final-unlock');
  unlock.disabled = !complete;
  unlock.innerHTML = complete ? 'ABRIR EL FINAL SECRETO <span aria-hidden="true">↗</span>' : 'FINAL SECRETO BLOQUEADO <span aria-hidden="true">🔒</span>';
  $('final-lock').hidden = complete;
  $('final-surprise').hidden = !complete;
}
function openModal(id) {
  lastFocus = document.activeElement;
  const modal = $(id);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}
function closeModal(id) {
  $(id).hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocus?.isConnected && typeof lastFocus.focus === 'function') lastFocus.focus();
}
function showWish(index) {
  currentWish = index;
  if (!visited.has(index)) {
    visited.add(index);
    saveProgress();
    const tile = $('wish-grid').children[index];
    tile.classList.add('visited');
    tile.setAttribute('aria-label', `Deseo ${index + 1}, descubierto`);
    updateProgress();
    if (visited.size === WISHES.length) {
      setTimeout(() => { if (!$('wish-modal').hidden) toast('¡Descubriste los 17 deseos! El capítulo final está listo. ✨'); }, 500);
    }
  }
  $('wish-modal-number').textContent = String(index + 1).padStart(2, '0');
  $('wish-modal-message').textContent = WISHES[index];
  const nextIndex = WISHES.findIndex((_, i) => !visited.has(i));
  $('wish-next').innerHTML = nextIndex < 0 ? 'VER SORPRESA FINAL <span aria-hidden="true">↗</span>' : 'OTRA ESTRELLA <span aria-hidden="true">→</span>';
  if ($('wish-modal').hidden) openModal('wish-modal');
}
function nextWish() {
  const nextIndex = WISHES.findIndex((_, i) => !visited.has(i));
  if (nextIndex >= 0) { showWish(nextIndex); return; }
  closeModal('wish-modal');
  showFinal();
}
function confetti() {
  if (reducedMotion) return;
  const layer = $('confetti-layer');
  layer.innerHTML = '';
  const colors = ['#ff58a8', '#8b5cf6', '#38bdf8', '#ffdeec', '#ffffff'];
  for (let i = 0; i < 110; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.borderRadius = i % 6 === 0 ? '50%' : '0';
    piece.style.setProperty('--drift', `${Math.random() * 270 - 135}px`);
    piece.style.setProperty('--rotation', `${Math.random() * 1100 - 550}deg`);
    piece.style.animationDuration = `${3 + Math.random() * 3.5}s`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    layer.append(piece);
  }
  setTimeout(() => { layer.innerHTML = ''; }, 8000);
}
function showFinal() {
  if (visited.size !== WISHES.length) { toast('Primero descubre las 17 estrellas ✨'); return; }
  $('final').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  setTimeout(confetti, reducedMotion ? 0 : 700);
}
function resetExperience() {
  const confirmed = window.confirm('¿Quieres volver a vivir la aventura desde el principio? Se reiniciarán los 17 deseos.');
  if (!confirmed) return;
  visited.clear();
  saveProgress();
  buildWishes();
  $('letter-modal').hidden = true;
  $('wish-modal').hidden = true;
  document.body.classList.remove('modal-open');
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('site').classList.remove('ready');
  $('site').inert = true;
  $('intro').classList.remove('out');
  $('intro').removeAttribute('aria-hidden');
  $('enter-btn').focus();
}
function startExperience() {
  clearInterval(introTimer);
  $('intro').classList.add('out');
  $('intro').setAttribute('aria-hidden', 'true');
  $('site').inert = false;
  $('site').classList.add('ready');
  setTimeout(() => $('hero-title').focus?.(), 50);
}
function animateIntro() {
  const lines = ['Dicen que existen infinitos universos...', 'Infinitas historias y millones de posibilidades...', 'Pero este tiene a alguien muy especial...', 'Y su nombre es Sarita. ♥'];
  let index = 0;
  introTimer = setInterval(() => {
    if (index >= lines.length - 1) { clearInterval(introTimer); return; }
    index++;
    $('intro-line').textContent = lines[index];
  }, 2350);
}
async function toggleSound() {
  const audio = $('music');
  const button = $('sound-btn');
  if (!audio.paused) {
    audio.pause();
    $('sound-icon').textContent = '♫';
    button.setAttribute('aria-label', 'Activar música');
    return;
  }
  try {
    await audio.play();
    $('sound-icon').textContent = '♪';
    button.setAttribute('aria-label', 'Pausar música');
  } catch (_) {
    toast('Para añadir música, coloca tu archivo autorizado como assets/music.mp3 ♫');
  }
}
function setupReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reducedMotion) {
    nodes.forEach(node => node.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  nodes.forEach(node => observer.observe(node));
}
function setupModal(id, closeId) {
  $(closeId).addEventListener('click', () => closeModal(id));
  $(id).addEventListener('click', event => { if (event.target === $(id)) closeModal(id); });
}
function setupKeyboard() {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!$('letter-modal').hidden) closeModal('letter-modal');
      else if (!$('wish-modal').hidden) closeModal('wish-modal');
    }
    if (event.key !== 'Tab') return;
    const modal = !$('letter-modal').hidden ? $('letter-modal') : (!$('wish-modal').hidden ? $('wish-modal') : null);
    if (!modal) return;
    const focusable = [...modal.querySelectorAll('button:not(:disabled),a[href],input,textarea')];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}
function init() {
  loadProgress();
  buildWishes();
  setupReveal();
  setupKeyboard();
  setupModal('letter-modal', 'close-letter');
  setupModal('wish-modal', 'close-wish');
  $('enter-btn').addEventListener('click', startExperience);
  $('open-letter').addEventListener('click', () => openModal('letter-modal'));
  $('envelope-button').addEventListener('click', () => openModal('letter-modal'));
  $('wish-next').addEventListener('click', nextWish);
  $('final-unlock').addEventListener('click', showFinal);
  $('sound-btn').addEventListener('click', toggleSound);
  $('restart-btn').addEventListener('click', resetExperience);
  $('replay-btn').addEventListener('click', resetExperience);
  document.addEventListener('pointermove', e => {
    if (window.matchMedia('(pointer:fine)').matches) {
      const glow = document.querySelector('.cursor-glow');
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }
  }, { passive: true });
  $('music').addEventListener('error', () => { if (!$('music').paused) toast('No se pudo cargar la música.'); });
  animateIntro();
  $('enter-btn').focus();
}
document.addEventListener('DOMContentLoaded', init);
