
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const menu = document.getElementById("mainNav");

  // compact navbar after scrolling
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // close the mobile menu after choosing a link
  const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
  document.querySelectorAll("#mainNav .nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) collapse.hide();
    })
  );
}
