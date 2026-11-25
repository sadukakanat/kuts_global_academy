/**
 * KUTS Global Academy — Universal Indian Languages Translator Widget (i18n-widget.js)
 * Pinaleaf Advancements LLP (THRINC000) | Zero-DB Static & IPFS Compatible
 *
 * Features:
 * 1. Injects a clean Indian Language selector into the sticky header of any Academy page.
 * 2. Protects all KUTS Revision 8 composite serials, NodeIDs, SHA-256 digests, and
 *    monospaced technical identifiers (.font-mono-kuts, code, pre) with `notranslate`
 *    so technical payloads are never corrupted during translation.
 * 3. Supports English + Indian languages (Malayalam, Hindi, Tamil, Telugu, Kannada,
 *    Bengali, Marathi, Gujarati, Odia, Punjabi, Assamese, Urdu, Sanskrit, Kashmiri,
 *    Konkani, Maithili, Manipuri, Nepali, Dogri, Bodo, Santali, Sindhi).
 */

(function () {
  const INDIAN_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "ml", label: "മലയാളം (Malayalam)" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "gu", label: "ગુજરાતી (Gujarati)" },
    { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
    { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "as", label: "অসমীয়া (Assamese)" },
    { code: "ur", label: "اردو (Urdu)" },
    { code: "sa", label: "संस्कृतम् (Sanskrit)" },
    { code: "ne", label: "नेपाली (Nepali)" },
    { code: "kok", label: "कोंकणी (Konkani)" },
    { code: "mai", label: "मैथिली (Maithili)" },
    { code: "doi", label: "डोगरी (Dogri)" },
    { code: "mni-Mtei", label: "ꯃꯩꯇꯩꯂꯣꯟ (Manipuri)" },
    { code: "bho", label: "भोजपुरी (Bhojpuri)" },
    { code: "sd", label: "سنڌي (Sindhi)" }
  ];

  // 1. Shield technical identifiers & monospaced KUTS serials from translation
  function protectTechnicalNodes() {
    const selectors = [
      ".font-mono-kuts",
      "code",
      "pre",
      "#live-kuts-serial",
      "#diploma-serial",
      "#diploma-access-key",
      "#diploma-sha256"
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      el.classList.add("notranslate");
      el.setAttribute("translate", "no");
    });
  }

  // 2. Inject custom styling to suppress Google Translate top banner & style dropdown
  function injectStyles() {
    if (document.getElementById("kuts-i18n-style")) return;
    const style = document.createElement("style");
    style.id = "kuts-i18n-style";
    style.textContent = `
      .goog-te-banner-frame.skiptranslate,
      .goog-te-gadget-icon,
      #goog-gt-tt,
      .goog-te-balloon-frame {
        display: none !important;
      }
      body {
        top: 0px !important;
      }
      .skiptranslate {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 3. Set translation cookie & trigger Google Translate engine
  function applyLanguage(langCode) {
    localStorage.setItem("kuts_preferred_lang", langCode);
    const cookieVal = langCode === "en" ? "/en/en" : `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/`;

    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event("change"));
    } else if (langCode !== "en") {
      // Reload once if engine is still initializing so cookie takes immediate effect
      window.location.reload();
    }
  }

  // 4. Mount the language selector cleanly into the page header
  function mountLanguageSelector() {
    if (document.getElementById("kuts-lang-select")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "notranslate flex items-center";
    wrapper.setAttribute("translate", "no");

    const select = document.createElement("select");
    select.id = "kuts-lang-select";
    select.setAttribute("aria-label", "Select Indian Language");
    select.className =
      "text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer";

    const savedLang = localStorage.getItem("kuts_preferred_lang") || "en";

    INDIAN_LANGUAGES.forEach((lang) => {
      const opt = document.createElement("option");
      opt.value = lang.code;
      opt.textContent = `🌐 ${lang.label}`;
      if (lang.code === savedLang) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", (e) => {
      protectTechnicalNodes();
      applyLanguage(e.target.value);
    });

    wrapper.appendChild(select);

    // Find the right-side action container in the sticky header
    const headerInner = document.querySelector("header > div");
    if (headerInner && headerInner.lastElementChild) {
      headerInner.lastElementChild.prepend(wrapper);
    } else {
      // Fallback floating pill if a page has no standard header
      wrapper.className = "notranslate fixed bottom-4 right-4 z-50 shadow-xl";
      document.body.appendChild(wrapper);
    }
  }

  // 5. Load hidden Google Translate element script asynchronously
  function initTranslateEngine() {
    const hiddenDiv = document.createElement("div");
    hiddenDiv.id = "google_translate_element";
    hiddenDiv.style.display = "none";
    document.body.appendChild(hiddenDiv);

    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = function () {
      // Graceful offline fallback (IPFS local mode)
      const sel = document.getElementById("kuts-lang-select");
      if (sel) sel.title = "Offline IPFS mode: English active";
    };
    document.body.appendChild(script);
  }

  function boot() {
    injectStyles();
    protectTechnicalNodes();
    mountLanguageSelector();
    initTranslateEngine();

    // Re-protect dynamically rendered monospaced elements (quizzes, tables, clocks)
    const observer = new MutationObserver(() => protectTechnicalNodes());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
