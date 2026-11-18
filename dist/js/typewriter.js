(() => {
  "use strict";

  const name = document.getElementById("name");
  const role = document.getElementById("role");
  const nameCursor = document.getElementById("name-cursor");
  const roleCursor = document.getElementById("role-cursor");
  const toggle = document.getElementById("motion-toggle");
  const motionLabel = document.getElementById("motion-label");
  const modeSelector = document.getElementById("mode-selector");
  const modeSwitch = document.getElementById("mode-switch");
  const heading = document.getElementById("introduction-title");
  const description = document.getElementById("section-description");
  const terminalHost = document.getElementById("terminal-host");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

  const { profiles, timing } = window.Portfolio;
  let mode = "dev";
  let paused = false;
  let timer;
  let pendingStep;
  let activeTarget = role;

  document.getElementById("year").textContent = new Date().getFullYear();

  function cursorAt(target) {
    activeTarget = target;
    nameCursor.hidden = target !== name || paused || preference.matches;
    roleCursor.hidden = target !== role || paused || preference.matches;
  }

  // Ogni pausa conserva il prossimo passo, senza lasciare timer concorrenti.
  function schedule(step, delay) {
    clearTimeout(timer);
    pendingStep = { step, delay };
    if (paused || document.hidden || preference.matches) return;
    timer = setTimeout(() => {
      pendingStep = undefined;
      step();
    }, delay);
  }

  function type(target, text, complete) {
    cursorAt(target);
    if (target.textContent === text) {
      complete();
      return;
    }
    target.textContent = text.slice(0, target.textContent.length + 1);
    if (target.textContent === text) complete();
    else schedule(() => type(target, text, complete), timing.type);
  }

  function erase(target, complete) {
    cursorAt(target);
    if (!target.textContent.length) {
      schedule(complete, timing.gap);
      return;
    }
    target.textContent = target.textContent.slice(0, -1);
    schedule(() => erase(target, complete), timing.erase);
  }

  function showRole(index) {
    const roles = profiles[mode].roles;
    type(role, roles[index], () => {
      if (roles.length === 1) return;
      schedule(() => erase(role, () => showRole((index + 1) % roles.length)), timing.hold);
    });
  }

  function resume() {
    if (pendingStep) schedule(pendingStep.step, pendingStep.delay);
  }

  function renderSection(initial = false) {
    clearTimeout(timer);
    pendingStep = undefined;
    const section = profiles[mode];
    modeSwitch.checked = mode === "music";
    heading.textContent = `${section.name} — ${section.title}`;
    description.textContent = section.description;
    terminalHost.textContent = `@${mode}`;
    document.title = heading.textContent;
    toggle.hidden = preference.matches;

    if (preference.matches || paused) {
      name.textContent = section.username;
      role.textContent = section.roles[0];
      cursorAt(null);
      return;
    }

    if (initial) {
      role.textContent = "";
      cursorAt(role);
      schedule(() => showRole(0), 350);
      return;
    }

    // Annullare il vecchio timer evita sovrapposizioni anche con cambi rapidi.
    erase(role, () => {
      if (name.textContent === section.username) showRole(0);
      else erase(name, () => type(name, section.username, () => {
        cursorAt(role);
        schedule(() => showRole(0), timing.profileGap);
      }));
    });
  }

  toggle.addEventListener("click", () => {
    paused = !paused;
    clearTimeout(timer);
    document.body.classList.toggle("is-paused", paused);
    cursorAt(activeTarget);
    motionLabel.textContent = paused ? "Resume animation" : "Pause animation";
    if (!paused) {
      if (pendingStep) resume();
      else renderSection();
    }
  });

  modeSwitch.addEventListener("change", () => {
    mode = modeSwitch.checked ? "music" : "dev";
    renderSection();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTimeout(timer);
    else resume();
  });

  preference.addEventListener("change", () => renderSection());
  modeSelector.hidden = false;
  // Il browser può ripristinare il selettore dopo una navigazione indietro.
  mode = modeSwitch.checked ? "music" : "dev";
  name.textContent = profiles[mode].username;
  renderSection(true);
})();
