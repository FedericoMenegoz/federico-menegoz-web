(() => {
  "use strict";

  const root = document.documentElement;
  let theme = "dark";

  // Applicare il tema prima del CSS evita un lampo di colore al caricamento.
  try {
    if (localStorage.getItem("theme") === "light") theme = "light";
  } catch {
    // La pagina funziona anche quando lo storage locale non è disponibile.
  }

  function applyTheme() {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "light" ? "#ffffff" : "#0b0b0b");
  }

  applyTheme();

  document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("theme-selector");
    const control = document.getElementById("theme-switch");
    control.checked = theme === "light";
    selector.hidden = false;

    control.addEventListener("change", () => {
      theme = control.checked ? "light" : "dark";
      applyTheme();
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // Il selettore resta funzionante anche senza persistenza.
      }
    });
  });
})();
