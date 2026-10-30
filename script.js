// Add your photos to assets/ and set these paths, e.g. 'assets/us-1.jpg'.
const photos = { left: 'assets/us-1.jpg', right: 'assets/us-2.jpg' };
const questions = [
  { title: "I didn't mean to say that, okay bbe. Do you understand?", chapter: 'A LITTLE UNDERSTANDING', note: 'Sometimes my words get tangled. My love for you never does.', icon: '♡' },
  { title: 'You can buy anything and pass me the bill. Do you understand?', chapter: 'A LITTLE SPOILING', note: 'Because making you smile is my favorite thing.', icon: '✧' },
  { title: 'I never, ever thought of you as a gold digger, okay bbe?', chapter: 'STRAIGHT FROM MY HEART', note: 'You mean so much more to me. I hope you know that.', icon: '♡' },
  { title: 'Are you coming with me to the UK?', chapter: 'OUR NEXT ADVENTURE', note: 'A new place. A million memories. You by my side.', icon: '✈' },
  { title: 'Do you still love me?', chapter: 'JUST YOU & ME', note: 'You still give me that butterflies-in-my-stomach feeling.', icon: '♥' },
  { title: "You can still ask for anything. I'll buy it for you, okay bbe?", chapter: 'YOU DESERVE THE SWEET THINGS', note: 'A little reminder that I love taking care of you.', icon: '✧' },
  { title: 'And I love you. Do you understand?', chapter: 'IN CASE I HAVEN’T SAID IT ENOUGH', note: 'More than yesterday. A little less than tomorrow.', icon: '♡' },
  { title: 'Will you marry me?', chapter: 'ONE LAST QUESTION…', note: 'All the little moments. All the big adventures. A lifetime with you.', icon: '♧' }
];
const $ = (id) => document.getElementById(id);
let current = 0;
let escapes = 0;
let noSpot = 1;
const yes = $('yes-button');
const no = $('no-button');
function resetNo() {
  noSpot = 1;
  no.style.left = 'calc(50% - 41.5px)';
  no.style.top = '6px';
  no.hidden = false;
  escapes = 0;
}
function render(focus = false) {
  const q = questions[current];
  $('question').textContent = q.title;
  $('chapter').textContent = q.chapter;
  $('question-note').textContent = q.note;
  $('question-icon').textContent = current === 7 ? '♡' : q.icon;
  $('question-count').textContent = `QUESTION ${String(current + 1).padStart(2, '0')} / 08`;
  $('progress').setAttribute('aria-label', `Question ${current + 1} of 8`);
  $('progress').replaceChildren(...questions.map((_, i) => {
    const dot = document.createElement('span');
    dot.className = i === current ? 'active' : i < current ? 'done' : '';
    return dot;
  }));
  yes.innerHTML = current === 7 ? 'Yes, a thousand times! <span aria-hidden="true">♡</span>' : 'Yes, bbe <span aria-hidden="true">♡</span>';
  $('playful-hint').textContent = 'Psst… the “No” button is a little shy ✧';
  document.querySelector('.question-card').classList.remove('celebration');
  resetNo();
  if (focus) $('question').focus({ preventScroll: true });
}
no.addEventListener('click', () => {
  // Six fixed spots in a three-column, two-row rectangle. Never repeat a spot.
  const arena = $('no-arena');
  const choices = [0, 1, 2, 3, 4, 5].filter(spot => spot !== noSpot);
  noSpot = choices[Math.floor(Math.random() * choices.length)];
  const x = 6 + (noSpot % 3) / 2 * Math.max(0, arena.clientWidth - no.offsetWidth - 12);
  const y = 6 + Math.floor(noSpot / 3) * Math.max(0, arena.clientHeight - no.offsetHeight - 12);
  no.style.left = `${x}px`;
  no.style.top = `${y}px`;
  escapes++;
  const hints = ['Oops, it wandered off! ♡', 'Catch it if you can… ✧', 'A very shy little button ♡'];
  $('playful-hint').textContent = hints[(escapes - 1) % hints.length];
});
yes.addEventListener('click', () => {
  if (current === questions.length) { current = 0; render(true); return; }
  current++;
  if (current < questions.length) { render(true); return; }
  resetNo();
  no.hidden = true;
  document.querySelector('.question-card').classList.add('celebration');
  $('chapter').textContent = 'THE BEGINNING OF OUR FOREVER';
  $('question-icon').textContent = '♥';
  $('question-count').textContent = 'EIGHT LITTLE YESES. ONE BIG LOVE.';
  $('question').textContent = 'You. Me. Always.';
  $('question-note').textContent = 'You just made me the happiest person. Here’s to our next chapter, bbe. I love you. ♡';
  $('progress').setAttribute('aria-label', 'All eight questions completed');
  [...$('progress').children].forEach(dot => dot.className = 'done');
  yes.textContent = 'Read our love letter again ↻';
  $('playful-hint').textContent = 'With you, forever sounds pretty perfect.';
  $('question').focus({ preventScroll: true });
  celebrate();
});
function celebrate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = i % 3 === 0 ? '✧' : '♥';
    piece.style.cssText = `left:${Math.random() * 100}%;font-size:${12 + Math.random() * 19}px;animation-delay:${Math.random() * 1.5}s;--drift:${Math.random() * 180 - 90}px;color:${['#dc367e', '#ef96bd', '#c878a9', '#e6b56c'][i % 4]}`;
    $('confetti').append(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}
for (const [side, path] of Object.entries(photos)) {
  if (!path) continue;
  const frame = $(side === 'left' ? 'photo-one' : 'photo-two');
  const img = new Image();
  img.alt = side === 'left' ? 'A favorite memory of us' : 'Another moment together';
  img.onload = () => { frame.replaceChildren(img); frame.parentElement.setAttribute('aria-label', img.alt); };
  img.src = path;
}
window.addEventListener('resize', () => { if (current < questions.length) resetNo(); });
render();
