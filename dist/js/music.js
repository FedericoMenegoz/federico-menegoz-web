(() => {
  "use strict";

  const modeSwitch = document.getElementById("mode-switch");
  const tracks = Array.from(document.querySelectorAll("[data-track]")).map(element => ({
    element,
    name: element.dataset.title || element.dataset.track,
    audio: element.querySelector("audio"),
    play: element.querySelector("[data-play]"),
    stop: element.querySelector("[data-stop]"),
    seek: element.querySelector("[data-seek]"),
    bar: element.querySelector("[data-bar]"),
    percent: element.querySelector("[data-percent]"),
    current: element.querySelector("[data-current]"),
    duration: element.querySelector("[data-duration]"),
    status: element.querySelector("[data-status]"),
    message: element.querySelector("[data-message]"),
    cells: 20,
    initialized: false,
    failed: false
  }));

  function time(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
    const total = Math.floor(seconds);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  }

  function render(track) {
    const audio = track.audio;
    const ready = Number.isFinite(audio.duration) && audio.duration > 0 && !track.failed;
    const progress = ready ? Math.min(1, Math.max(0, audio.currentTime / audio.duration)) : 0;
    const filled = Math.floor(progress * track.cells);
    const empty = filled < track.cells ? ">" + ".".repeat(track.cells - 1 - filled) : "";
    let state = "pending";
    if (track.failed) state = "unavailable";
    else if (ready) {
      if (audio.ended) state = "done";
      else if (audio.paused) state = audio.currentTime > 0 ? "paused" : "ready";
      else state = audio.readyState < 3 ? "buffering" : "playing";
    }

    const status = `[ ${state} ]`;
    track.element.dataset.playback = state;
    // Annunciare solo i cambi di stato, senza leggere ogni aggiornamento del tempo.
    if (track.status.textContent !== status) track.status.textContent = status;
    track.play.textContent = audio.paused ? "[ play ]" : "[ pause ]";
    track.play.setAttribute("aria-label", `${audio.paused ? "Play" : "Pause"} ${track.name}`);
    track.play.disabled = !ready;
    track.stop.disabled = !ready || (audio.paused && audio.currentTime === 0);
    track.seek.disabled = !ready;
    track.seek.value = String(Math.round(progress * 1000) / 10);
    track.seek.setAttribute("aria-valuetext", ready ? `${time(audio.currentTime)} of ${time(audio.duration)}` : "Audio not yet available");
    track.bar.textContent = `[${"=".repeat(filled)}${empty}]`;
    track.percent.textContent = `${Math.floor(progress * 100)}%`;
    track.current.textContent = time(audio.currentTime);
    track.duration.textContent = ready ? time(audio.duration) : "--:--";
    track.message.hidden = ready;
    track.message.textContent = !track.initialized || track.failed ? "Audio coming soon." : "Loading audio…";
  }

  tracks.forEach(track => {
    const audio = track.audio;
    ["loadedmetadata", "durationchange", "timeupdate", "pause", "ended", "waiting", "playing", "canplay"].forEach(event => {
      audio.addEventListener(event, () => render(track));
    });
    audio.addEventListener("error", () => {
      track.failed = true;
      render(track);
    });
    audio.addEventListener("play", () => {
      if (!modeSwitch.checked) audio.pause();
      else tracks.forEach(other => { if (other !== track) other.audio.pause(); });
      render(track);
    });
    track.play.addEventListener("click", async () => {
      if (!modeSwitch.checked) return;
      if (!audio.paused) {
        audio.pause();
        return;
      }
      try {
        if (audio.ended) audio.currentTime = 0;
        await audio.play();
        // Il selettore può cambiare mentre il browser attende di avviare l'audio.
        if (!modeSwitch.checked) audio.pause();
      } catch (error) {
        render(track);
        if (error.name === "AbortError") return;
        track.message.textContent = "Playback unavailable. Please try again later.";
        track.message.hidden = false;
      }
    });
    track.stop.addEventListener("click", () => {
      audio.pause();
      audio.currentTime = 0;
      render(track);
    });
    track.seek.addEventListener("input", () => {
      if (track.seek.disabled) return;
      audio.currentTime = Math.max(0, Math.min(100, Number(track.seek.value))) / 100 * audio.duration;
      render(track);
    });
    render(track);
  });

  if (typeof ResizeObserver === "function") {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const track = tracks.find(candidate => candidate.bar === entry.target);
        if (!track || entry.contentRect.width <= 0) return;
        // Courier usa celle larghe 0.6em; riservare anche le due parentesi.
        const characterWidth = parseFloat(window.getComputedStyle(track.bar).fontSize) * 0.6;
        const cells = Math.max(4, Math.floor(entry.contentRect.width / characterWidth) - 2);
        if (!Number.isFinite(cells) || track.cells === cells) return;
        track.cells = cells;
        render(track);
      });
    });
    tracks.forEach(track => observer.observe(track.bar));
  }

  function changeMode() {
    tracks.forEach(track => {
      if (!modeSwitch.checked) track.audio.pause();
      else if (!track.initialized) {
        track.initialized = true;
        track.audio.preload = "metadata";
        track.audio.load();
        render(track);
      }
    });
  }

  modeSwitch.addEventListener("change", changeMode);
  changeMode();
})();
