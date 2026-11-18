(() => {
  "use strict";

  const modeSwitch = document.getElementById("mode-switch");
  const content = document.getElementById("dev-content");
  const music = document.getElementById("music-content");
  const navigation = document.getElementById("dev-navigation");
  const scroll = document.getElementById("content-scroll");
  const pages = Array.from(content.querySelectorAll("[data-page]"));
  const links = Array.from(navigation.querySelectorAll("[data-page-link]"));
  const panels = [...pages, music];
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const easing = "cubic-bezier(.2, .8, .2, 1)";
  let activePanel;
  let requestedPanel;
  let panelAnimation;
  let panelRevision = 0;
  let navigationAnimation;
  let navigationMode;
  let navigationRevision = 0;

  function snapshot(element) {
    const style = window.getComputedStyle(element);
    return { opacity: style.opacity, transform: style.transform };
  }

  function selectPanel(target) {
    const changed = activePanel !== target;
    content.hidden = target === music;
    panels.forEach(panel => {
      panel.hidden = panel !== target;
      panel.inert = panel !== target;
    });
    activePanel = target;
    if (changed) scroll.scrollTop = 0;
  }

  async function transitionPanel(target, immediate) {
    if (target === requestedPanel && !immediate) return;
    requestedPanel = target;
    const revision = ++panelRevision;
    const interrupted = panelAnimation && activePanel ? snapshot(activePanel) : null;
    if (panelAnimation) panelAnimation.cancel();
    panelAnimation = null;

    if (immediate || typeof target.animate !== "function") {
      selectPanel(target);
      return;
    }

    if (activePanel && activePanel !== target) {
      activePanel.inert = true;
      panelAnimation = activePanel.animate([
        interrupted || { opacity: 1, transform: "translateX(0)" },
        { opacity: 0, transform: "translateX(-32px)" }
      ], { duration: 180, easing, fill: "forwards" });
      await panelAnimation.finished.catch(() => {});
      if (revision !== panelRevision) return;
      activePanel.hidden = true;
      panelAnimation.cancel();
    }

    const start = activePanel === target && interrupted
      ? interrupted : { opacity: 0, transform: "translateX(32px)" };
    selectPanel(target);
    panelAnimation = target.animate([
      start, { opacity: 1, transform: "translateX(0)" }
    ], { duration: 300, easing, fill: "forwards" });
    await panelAnimation.finished.catch(() => {});
    if (revision !== panelRevision) return;
    panelAnimation.cancel();
    panelAnimation = null;
  }

  async function transitionNavigation(musicMode, immediate) {
    if (navigationMode === musicMode && !immediate) return;
    const initial = navigationMode === undefined;
    navigationMode = musicMode;
    const revision = ++navigationRevision;
    const interrupted = navigationAnimation ? snapshot(navigation) : null;
    if (navigationAnimation) navigationAnimation.cancel();
    navigationAnimation = null;
    navigation.hidden = false;
    navigation.inert = musicMode;

    if (immediate || typeof navigation.animate !== "function" || (initial && musicMode)) {
      navigation.classList.toggle("is-inactive", musicMode);
      return;
    }

    navigation.classList.remove("is-inactive");
    const start = interrupted || (musicMode
      ? { opacity: 1, transform: "translate(0, 0)" }
      : { opacity: 0, transform: "translateY(100%)" });
    const end = musicMode
      ? { opacity: 0, transform: "translateX(-32px)" }
      : { opacity: 1, transform: "translate(0, 0)" };
    navigationAnimation = navigation.animate([start, end], {
      duration: musicMode ? 180 : 300, easing, fill: "forwards"
    });
    await navigationAnimation.finished.catch(() => {});
    if (revision !== navigationRevision) return;
    navigation.classList.toggle("is-inactive", musicMode);
    navigationAnimation.cancel();
    navigationAnimation = null;
  }

  function render(immediate = preference.matches) {
    const requestedPage = window.location.hash.slice(1);
    const currentPage = pages.find(page => page.dataset.page === requestedPage) || pages[0];
    links.forEach(link => {
      if (link.dataset.pageLink === currentPage.dataset.page) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    transitionNavigation(modeSwitch.checked, immediate);
    transitionPanel(modeSwitch.checked ? music : currentPage, immediate);
  }

  // Gli anchor nativi mantengono link condivisibili e cronologia avanti/indietro.
  window.addEventListener("hashchange", () => render());
  modeSwitch.addEventListener("change", () => render());
  preference.addEventListener("change", () => render(true));
  render();
})();
