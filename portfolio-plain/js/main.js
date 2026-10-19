// Starts every feature once the page is ready.
document.documentElement.classList.add("js");
document.getElementById("year").textContent = new Date().getFullYear();

initNavbar();
initTyping(TYPED_ROLES);
initReveal();
initScrollProgress();
initBackToTop();
initContactForm();
