// Language toggle for the static legal pages (PT / EN).
// The active language is decided this way, in order of priority:
//   1. what the visitor picked before (saved in localStorage)
//   2. the browser language (Portuguese -> pt, anything else -> en)
// A tiny inline script in each page's <head> already applied the html.lang-*
// class before paint. This file wires the buttons and keeps things in sync.
(function () {
  let KEY = "bp-lang";

  function currentLang() {
    let match = document.documentElement.className.match(/lang-(pt|en)/);
    return match ? match[1] : "en";
  }

  function setLang(lang) {
    document.documentElement.className = "lang-" + lang;
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en-US");

    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      // storage can be blocked (private mode); the choice just won't persist.
    }

    let title = document.querySelector("title");
    if (title && title.getAttribute("data-" + lang)) {
      document.title = title.getAttribute("data-" + lang);
    }

    let buttons = document.querySelectorAll("[data-set-lang]");
    for (let i = 0; i < buttons.length; i++) {
      let isActive = buttons[i].getAttribute("data-set-lang") === lang;
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("[data-set-lang]");
    for (let i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener("click", function () {
          setLang(button.getAttribute("data-set-lang"));
        });
      })(buttons[i]);
    }
    // Re-apply so the title and button states match the language chosen in <head>.
    setLang(currentLang());
  });
})();
