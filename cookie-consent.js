document.addEventListener("DOMContentLoaded", () => {
  // If already decided, do nothing
  const existingConsent = localStorage.getItem("astrodev_cookie_consent");
  if (existingConsent) return; [file:2]

  // Create banner container
  const banner = document.createElement("div");
  banner.id = "cookie-banner";

  // Banner HTML with Customize button
  banner.innerHTML = `
    <div class="cookie-inner">
      <h4>We use cookies</h4>
      <p>
        AstroDev uses cookies to ensure the site works properly, understand usage, and improve your experience.
        You can accept all cookies, reject non-essential ones, or customize your choices.
      </p>
      <div class="cookie-buttons">
        <button id="acceptAll">Accept all</button>
        <button id="rejectNonEssential">Reject non-essential</button>
        <button id="customizeCookies">Customize</button>
        <a id="learnMore" href="/cookies.html">Learn more</a>
      </div>
    </div>
  `; [file:2][file:1]

  // Create customization modal
  const modal = document.createElement("div");
  modal.id = "cookie-modal";
  modal.innerHTML = `
    <div class="cookie-modal-backdrop"></div>
    <div class="cookie-modal-window">
      <div class="cookie-modal-header">
        <h3>Cookie preferences</h3>
        <button id="closeCookieModal" aria-label="Close">×</button>
      </div>
      <div class="cookie-modal-body">
        <p>
          Choose which types of cookies AstroDev can use. Essential cookies are always on because they keep the site working securely.
        </p>
        <div class="cookie-category">
          <div class="cookie-category-main">
            <div>
              <h4>Essential cookies</h4>
              <p>Required for core site features, security, and basic functionality. Cannot be disabled.</p>
            </div>
            <label class="switch disabled">
              <input type="checkbox" checked disabled />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="cookie-category">
          <div class="cookie-category-main">
            <div>
              <h4>Analytics cookies</h4>
              <p>Help us understand how visitors use AstroDev so we can improve performance and UX.</p>
            </div>
            <label class="switch">
              <input type="checkbox" id="toggleAnalytics" checked />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="cookie-category">
          <div class="cookie-category-main">
            <div>
              <h4>Marketing & chat</h4>
              <p>Support tools like Tawk.to live chat and Brevo email tracking where applicable.</p>
            </div>
            <label class="switch">
              <input type="checkbox" id="toggleMarketing" checked />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="cookie-modal-footer">
        <button id="saveCookiePrefs">Save preferences</button>
        <button id="acceptAllFromModal" class="secondary">Accept all</button>
      </div>
    </div>
  `; [file:1]

  // Styles (banner + modal + toggles)
  const style = document.createElement("style");
  style.innerHTML = `
    #cookie-banner {
      position: fixed;
      bottom: -220px;
      left: 0;
      right: 0;
      background: #0b0b0b;
      color: #fff;
      padding: 20px;
      box-shadow: 0 -2px 15px rgba(0,0,0,0.4);
      transition: bottom 0.6s ease;
      z-index: 9999;
      font-family: 'Poppins', sans-serif;
    }
    .cookie-inner { max-width: 900px; margin: auto; text-align: center; }
    .cookie-inner h4 { margin: 0 0 5px 0; color: #2da8ff; }
    .cookie-inner p { margin: 5px 0 15px; font-size: 14px; color: #f0f0f0; }
    .cookie-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    #cookie-banner button,
    #cookie-banner a {
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 13px;
    }
    #acceptAll {
      background: #2da8ff;
      color: #fff;
    }
    #acceptAll:hover { background: #6dc6ff; }
    #rejectNonEssential {
      background: transparent;
      border: 2px solid #fff;
      color: #fff;
    }
    #rejectNonEssential:hover { background: #ffffff20; }
    #customizeCookies {
      background: transparent;
      border: 2px solid #2da8ff;
      color: #2da8ff;
    }
    #customizeCookies:hover {
      background: #2da8ff;
      color: #fff;
    }
    #learnMore {
      color: #2da8ff;
      border: 2px solid #2da8ff;
      background: transparent;
      border-radius: 25px;
      padding: 10px 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    #learnMore:hover { background: #2da8ff; color: #fff; }

    /* Modal */
    #cookie-modal {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: 'Poppins', sans-serif;
    }
    .cookie-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
    }
    .cookie-modal-window {
      position: relative;
      background: #111;
      color: #fff;
      border-radius: 16px;
      max-width: 520px;
      width: 92%;
      padding: 20px 22px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1;
      animation: cookieModalIn 0.35s ease-out;
    }
    .cookie-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .cookie-modal-header h3 {
      margin: 0;
      font-size: 20px;
      color: #2da8ff;
    }
    #closeCookieModal {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
    }
    .cookie-modal-body p {
      font-size: 14px;
      color: #e2e2e2;
    }
    .cookie-category {
      margin-top: 15px;
      padding: 12px 10px;
      border-radius: 10px;
      background: #181818;
      border: 1px solid #262626;
    }
    .cookie-category-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }
    .cookie-category-main h4 {
      margin: 0 0 4px;
      font-size: 15px;
    }
    .cookie-category-main p {
      margin: 0;
      font-size: 13px;
      color: #c4c4c4;
    }
    .cookie-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 18px;
    }
    #saveCookiePrefs,
    #acceptAllFromModal {
      border-radius: 999px;
      border: none;
      padding: 9px 18px;
      font-weight: 600;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s ease;
    }
    #saveCookiePrefs {
      background: #2da8ff;
      color: #fff;
    }
    #saveCookiePrefs:hover { background: #6dc6ff; }
    #acceptAllFromModal {
      background: transparent;
      border: 2px solid #fff;
      color: #fff;
    }
    #acceptAllFromModal:hover { background: #ffffff20; }

    /* Toggle switch */
    .switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 24px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #444;
      transition: 0.3s;
      border-radius: 24px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    .switch input:checked + .slider {
      background-color: #2da8ff;
    }
    .switch input:checked + .slider:before {
      transform: translateX(22px);
    }
    .switch.disabled .slider {
      background-color: #2da8ff80;
      cursor: not-allowed;
    }

    @keyframes cookieModalIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 600px) {
      .cookie-inner p { font-size: 13px; }
      #cookie-banner { padding: 16px; }
      .cookie-modal-window { padding: 16px 14px; }
    }
  `; [file:2][file:1]

  document.body.appendChild(style);
  document.body.appendChild(banner);
  document.body.appendChild(modal);

  // Slide banner in
  setTimeout(() => {
    banner.style.bottom = "0";
  }, 500);

  // Helper: save full preference object
  function saveConsent(prefs) {
    localStorage.setItem(
      "astrodev_cookie_consent",
      JSON.stringify({
        timestamp: new Date().toISOString(),
        ...prefs
      })
    );
  }

  // Helper: close banner
  function hideBanner() {
    banner.style.bottom = "-220px";
    setTimeout(() => {
      banner.remove();
    }, 700);
  }

  // Helper: open/close modal
  function openModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Buttons
  const acceptAllBtn = document.getElementById("acceptAll");
  const rejectBtn = document.getElementById("rejectNonEssential");
  const customizeBtn = document.getElementById("customizeCookies");
  const learnMoreLink = document.getElementById("learnMore");

  const analyticsToggle = modal.querySelector("#toggleAnalytics");
  const marketingToggle = modal.querySelector("#toggleMarketing");
  const savePrefsBtn = modal.querySelector("#saveCookiePrefs");
  const acceptAllFromModalBtn = modal.querySelector("#acceptAllFromModal");
  const closeModalBtn = modal.querySelector("#closeCookieModal");
  const modalBackdrop = modal.querySelector(".cookie-modal-backdrop");

  // Main banner actions
  acceptAllBtn.addEventListener("click", () => {
    saveConsent({
      decision: "accepted_all",
      essential: true,
      analytics: true,
      marketing: true
    });
    hideBanner();
  });

  rejectBtn.addEventListener("click", () => {
    saveConsent({
      decision: "rejected_non_essential",
      essential: true,
      analytics: false,
      marketing: false
    });
    hideBanner();
  });

  customizeBtn.addEventListener("click", () => {
    openModal();
  });

  // Modal actions
  savePrefsBtn.addEventListener("click", () => {
    saveConsent({
      decision: "custom",
      essential: true,
      analytics: analyticsToggle.checked,
      marketing: marketingToggle.checked
    });
    closeModal();
    hideBanner();
  });

  acceptAllFromModalBtn.addEventListener("click", () => {
    analyticsToggle.checked = true;
    marketingToggle.checked = true;
    saveConsent({
      decision: "accepted_all",
      essential: true,
      analytics: true,
      marketing: true
    });
    closeModal();
    hideBanner();
  });

  closeModalBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  // Optional: keep "Learn more" open in new tab
  learnMoreLink.setAttribute("target", "_blank");
  learnMoreLink.setAttribute("rel", "noopener noreferrer");
});
