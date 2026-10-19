// Animate skill bars when they scroll into view + top scroll-progress bar.
function initSkills() {
  const skills = document.querySelectorAll(".skill");
  if (!("IntersectionObserver" in window)) {
    skills.forEach((s) => s.classList.add("filled"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("filled");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.4 }
  );
  skills.forEach((s) => observer.observe(s));
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}
