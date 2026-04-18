// ─── GOBLYNZ DEN · APP INIT ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  // ── Tab Switching ────────────────────────────────────────────────────────
  const tabBtns   = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const navLinks  = document.querySelectorAll(".nav-link");

  function switchTab(tabId) {
    tabBtns.forEach(b => b.classList.toggle("active", b.dataset.tab === tabId));
    tabPanels.forEach(p => p.classList.toggle("active", p.id === tabId));
    navLinks.forEach(l => l.classList.toggle("active-link", l.dataset.tab === tabId));
    window.history.replaceState(null, "", `#${tabId}`);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });

  // Handle hash on load
  const hash = window.location.hash.replace("#", "");
  if (hash === "rarity" || hash === "forge") switchTab(hash);

  // ── Init Modules ─────────────────────────────────────────────────────────
  window.initRarity();
  window.initForge();

  // ── Subtle entrance animation ─────────────────────────────────────────────
  document.querySelectorAll(".stat-card, .phase-card").forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    el.style.transition = `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  });

});
