// Rotating "I'm a ..." text in the hero section.
function initTyping(words) {
  const el = document.getElementById("typed-role");
  if (!el || !words.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words[0];
    return;
  }

  let w = 0;
  let c = 0;
  let deleting = false;

  const tick = () => {
    const word = words[w];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);

    let delay = deleting ? 45 : 90;
    if (!deleting && c === word.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && c === 0) {
      deleting = false;
      w = (w + 1) % words.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };

  tick();
}
