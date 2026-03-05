const saved = localStorage.getItem('oop-theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);

function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'light' ? '' : 'light';
  if (next) {
    html.setAttribute('data-theme', next);
    localStorage.setItem('oop-theme', next);
  } else {
    html.removeAttribute('data-theme');
    localStorage.removeItem('oop-theme');
  }
  document.getElementById('theme-toggle').textContent = next === 'light' ? '\u263E' : '\u2604';
}
document.getElementById('theme-toggle').textContent = saved === 'light' ? '\u263E' : '\u2604';

let current = 0;
const slides = document.querySelectorAll('.slide');
const total = slides.length;

function isQuizSection(i) {
  return slides[i].classList.contains('quiz-slide') || (i > 0 && slides[i - 1].classList.contains('quiz-slide'));
}

function show(i) {
  slides[current].classList.remove('active', 'step-1', 'step-2');
  current = Math.max(0, Math.min(total - 1, i));
  slides[current].classList.add('active');
  document.getElementById('counter').textContent = (current + 1) + ' / ' + total;
  document.getElementById('prev').disabled = current === 0;
  document.getElementById('next').disabled = current === total - 1;
  document.getElementById('progress').style.width = ((current + 1) / total * 100) + '%';
  const skipBtn = document.getElementById('skip-quiz');
  if (skipBtn) skipBtn.classList.toggle('visible', isQuizSection(current));
}

function skipQuiz() {
  let i = current + 1;
  while (i < total && isQuizSection(i)) i++;
  show(i);
}

function advanceQuizStep(slide) {
  if (!slide.classList.contains('step-1')) { slide.classList.add('step-1'); return true; }
  if (!slide.classList.contains('step-2')) { slide.classList.add('step-2'); return true; }
  return false;
}

function navigate(d) {
  if (d === 1 && slides[current].classList.contains('quiz-slide')) {
    if (advanceQuizStep(slides[current])) return;
  }
  show(current + d);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); navigate(1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); navigate(-1); }
  if (e.key === 'Home') { e.preventDefault(); show(0); }
  if (e.key === 'End') { e.preventDefault(); show(total - 1); }
});

show(0);
