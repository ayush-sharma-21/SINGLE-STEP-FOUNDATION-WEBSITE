const SHEET_CONFIG = {
  // Paste your published Google Sheet CSV URL here.
  // Example: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
  csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTseVEgZuYRd1bJhobpyT4qNKnPmYEJmGNedJcyG0DUcAadadi4OxN6sVayItM3PQ52eTFZlfA2blah/pub?gid=2037789487&single=true&output=csv",
};

// ============================================================
// DONATION ACCOUNT DATA — Replace all values before going live
// ============================================================
const ACCOUNT_DATA = {
  upiId:       "9953908097.eazypay@icici",          // ← Replace with actual UPI ID
  payeeName:   "M S Single Step",  // ← Replace with registered payee name
  accountName: "Single Step",  // ← Replace with bank account holder name
  accountNo:   "414605001761",     // ← Replace with actual account number
  ifsc:        "ICIC0004146",             // ← Replace with actual IFSC code
  bank:        "ICICI Bank",     // ← Replace with actual bank name
};

// ============================================================
// GOOGLE APPS SCRIPT — Donation records
// Steps to set up:
//   1. Go to https://script.google.com and create a new project.
//   2. Paste the doPost function below (see comment block).
//   3. Click Deploy → New deployment → Web app.
//      Execute as: Me | Who has access: Anyone → Deploy.
//   4. Copy the /exec URL and paste it as webAppUrl below.
// ============================================================
const SCRIPT_CONFIG = {
  webAppUrl: "https://script.google.com/macros/s/AKfycbw-wWwZ2IpAmjP4vtIvYXJo0KRbKWQQnTkpU0NrLvkZdKAfxaut_VY6pKkDxO0ep0Ol/exec", // ← Paste your Apps Script /exec URL here
};

/*
──────────────────────────────────────────────────────────────
  PASTE THIS INTO YOUR GOOGLE APPS SCRIPT EDITOR
──────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Amount", "Payment Method", "Message"]);
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN"),
      data.name      || "",
      data.email     || "",
      data.phone     || "",
      data.amount    || "",
      data.method    || "",
      data.message   || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
──────────────────────────────────────────────────────────────
*/

const fallbackRows = [];



const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const sanitizeUrl = (value = "") => {
  const url = String(value || "").trim();
  try {
    return encodeURI(url);
  } catch {
    return url.replace(/\s/g, "%20");
  }
};

const numberValue = (value) => Number(String(value || "0").replace(/[^0-9.-]/g, "")) || 0;

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getGoogleDriveId = (url = "") => {
  const patterns = [/\/file\/d\/([^/]+)/, /[?&]id=([^&]+)/, /\/d\/([^/]+)/];
  for (const pattern of patterns) {
    const match = String(url).match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
};

const getYoutubeId = (url = "") => {
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/watch\?[^#]*v=([^?&#]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = String(url).match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
};

const getMedia = (item) => {
  const explicitUrl = (item.image || item.media || item.video || "").trim();
  const linkUrl = (item.link || "").trim();
  console.log("linkUrl", linkUrl);
  const linkLooksLikeMedia =
    getYoutubeId(linkUrl) ||
    getGoogleDriveId(linkUrl) ||
    /\.(jpg|jpeg|png|gif|webp|avif|svg|mp4|webm|ogg|mov)(\?|$)/i.test(linkUrl);
  const rawUrl = explicitUrl || (linkLooksLikeMedia ? linkUrl : "");
  const title = item.title || item.label || "Single Step Foundation media";
  const alt = item.alt || title;
  const youtubeId = getYoutubeId(rawUrl);
  const driveId = getGoogleDriveId(rawUrl);
  const extension = rawUrl.split("?")[0].split(".").pop()?.toLowerCase() || "";
  const directVideo = ["mp4", "webm", "ogg", "mov"].includes(extension);
  const directImage = ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(extension) || rawUrl.includes("images.unsplash.com");

  if (youtubeId) {
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${youtubeId}`,
      thumb: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      alt,
      title,
    };
  }

  if (driveId) {
    const explicitVideo = /video|youtube/i.test(item.media_type || item.type || "");
    console.log("driveId", driveId, "explicitVideo", explicitVideo);
    return {
      type: explicitVideo ? "drive-video" : "image",
      src: explicitVideo
        ? `https://drive.google.com/file/d/${driveId}/preview`
        : `https://drive.google.com/uc?export=view&id=${driveId}`,
      thumb: item.thumbnail || `https://drive.google.com/thumbnail?id=${driveId}&sz=w900`,
      alt,
      title,
    };
  }

  if (directVideo || /video/i.test(item.media_type || item.type || "")) {
    return { type: "video", src: rawUrl, thumb: item.thumbnail || "", alt, title };
  }

  return { type: directImage || rawUrl ? "image" : "none", src: rawUrl, thumb: rawUrl, alt, title };
};

const renderMediaThumb = (item, className = "media-thumb") => {
  const media = getMedia(item);
  console.log("renderMediaThumb", item, media);
  const title = escapeHtml(media.title);

  if (media.type === "none") return "";

  if (media.type === "image") {
    return `<img class="${className}" src="${media.src}" alt="${escapeHtml(media.alt)}" loading="lazy" />`;
  }

  const thumbSrc = sanitizeUrl(media.thumb);
  const thumb = media.thumb
    ? `<img class="${className}" src="${escapeHtml(thumbSrc)}" alt="${escapeHtml(media.alt)}" loading="lazy" />`
    : `<div class="${className} media-placeholder" aria-hidden="true"></div>`;

  return `
    <div class="video-preview">
      ${thumb}
      <span class="play-badge" aria-label="Play ${title}">▶</span>
    </div>
  `;
};

const mediaDataset = (item) => {
  const media = getMedia(item);
  return `
    data-media-type="${escapeHtml(media.type)}"
    data-media-src="${escapeHtml(sanitizeUrl(media.src))}"
    data-media-title="${escapeHtml(media.title)}"
    data-media-alt="${escapeHtml(media.alt)}"
  `;
};

const parseCsv = (csvText) => {
  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const headers = (rows.shift() || []).map((header) => header.trim().toLowerCase().replace(/\s+/g, "_"));
  return rows
    .filter((item) => item.some((value) => value.trim()))
    .map((item) =>
      headers.reduce((record, header, index) => {
        record[header] = (item[index] || "").trim();
        return record;
      }, {})
    );
};

const groupRows = (rows) =>
  rows.reduce((groups, row) => {
    const section = (row.section || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
    if (!section || row.active?.toLowerCase() === "no") return groups;
    groups[section] = groups[section] || [];
    groups[section].push(row);
    return groups;
  }, {});

const fetchSheetRows = async () => {
  if (!SHEET_CONFIG.csvUrl) return fallbackRows;

  try {
    const response = await fetch(`${SHEET_CONFIG.csvUrl}${SHEET_CONFIG.csvUrl.includes("?") ? "&" : "?"}cache=${Date.now()}`);
    if (!response.ok) throw new Error(`Sheet request failed: ${response.status}`);
    const rows = parseCsv(await response.text());
    return rows.length ? rows : fallbackRows;
  } catch (error) {
    console.warn("Using fallback website data because Google Sheet data could not be loaded.", error);
    return fallbackRows;
  }
};

const formatCounter = (value) => {
  if (value >= 1000) {
    return `${value.toLocaleString("en-IN")}+`;
  }
  return `${value}+`;
};

const renderDashboard = (data) => {
  const summaryTarget = document.querySelector("[data-dashboard]");
  const progressTarget = document.querySelector("[data-progress]");
  const summary = data.dashboard_summary || [];
  const programs = data.dashboard_programs || [];

  if (summaryTarget) {
    summaryTarget.innerHTML = summary
      .map(
        (item) => `
          <article class="money-card">
            <span>${escapeHtml(item.label || item.title)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </article>
        `
      )
      .join("");
  }

  if (progressTarget) {
    progressTarget.innerHTML = programs
      .map((item) => {
        const value = Math.min(numberValue(item.value), 100);
        return `
          <div class="progress-item">
            <div class="progress-label">
              <span>${escapeHtml(item.label || item.title)}</span>
              <span>${value}%</span>
            </div>
            <div class="progress-bar" aria-label="${escapeHtml(item.label || item.title)} progress">
              <span style="--progress: ${value}%"></span>
            </div>
          </div>
        `;
      })
      .join("");
  }
};

const renderContact = (items = []) => {
  items.forEach((item) => {
    const field = (item.label || item.title || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
    const target = document.querySelector(`[data-contact-field="${field}"]`);
    if (target && item.value) target.textContent = item.value;
  });
};

const renderContent = (data) => {
  const renderers = {
    initiatives: (items) =>
      items
        .map((item) => {
          const programSlug = slugify(item.program || item.slug || item.title);
          return `
            <article class="initiative-card reveal">
              ${renderMediaThumb(item)}
              <div>
                <span class="icon">${escapeHtml(item.icon || "+")}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
                <a href="${escapeHtml(`program/index.html?program=${programSlug}`)}">${escapeHtml(item.button || "View program")}</a>
              </div>
            </article>
          `;
        })
        .join(""),
    impact_stats: (items) =>
      items
        .map(
          (item) => `
            <article class="stat-card reveal">
              <strong data-count="${numberValue(item.value)}">0</strong>
              <span>${escapeHtml(item.title || item.label)}</span>
            </article>
          `
        )
        .join(""),
    activity_feed: (items) =>
      items
        .map(
          (item) => `
            <article>
              <time>${escapeHtml(item.date || item.title)}</time>
              <p>${escapeHtml(item.description)}</p>
            </article>
          `
        )
        .join(""),
    gallery: (items) =>
      items
        .map(
          (item) => `
            <button class="gallery-item ${escapeHtml(item.size)} reveal" ${mediaDataset(item)}>
              ${renderMediaThumb(item)}
              <span>${escapeHtml(item.title)}</span>
            </button>
          `
        )
        .join(""),
    stories: (items) =>
      items
        .map(
          (item) => `
            <article class="story-card reveal">
              <span>Before</span>
              <p>${escapeHtml(item.before)}</p>
              <span>After</span>
              <p>${escapeHtml(item.after)}</p>
              <strong>${escapeHtml(item.outcome)}</strong>
            </article>
          `
        )
        .join(""),
    team: (items) =>
      items
        .map(
          (item) => `
            <article class="person-card reveal">
              ${renderMediaThumb(item)}
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.role)}</p>
              <div>
                <a href="${escapeHtml(item.linkedin || "https://www.linkedin.com/in/mohit-yadav-7a2266423")}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.title)} LinkedIn">in</a>
                <a href="${escapeHtml(item.instagram || "https://www.instagram.com/single___step__foundation/?hl=en")}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.title)} Instagram">ig</a>
              </div>
            </article>
          `
        )
        .join(""),
    testimonials: (items) =>
      items
        .map((item) => {
          const stars = "★★★★★".slice(0, Math.max(1, Math.min(numberValue(item.rating || 5), 5)));
          return `
            <article class="testimonial reveal">
              <span>${stars}</span>
              <p>"${escapeHtml(item.description)}"</p>
              <strong>${escapeHtml(item.title)}</strong>
            </article>
          `;
        })
        .join(""),
    events: (items) =>
      items
        .map((item) => {
          const hasMedia = getMedia(item).type !== "none";
          return `
            <article class="${hasMedia ? "has-media" : "no-media"}">
              <time>${escapeHtml(item.date)}</time>
              ${renderMediaThumb(item, "event-media")}
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.location || item.description)}</p>
              </div>
              <a href="${escapeHtml(item.link || "#volunteer")}">${escapeHtml(item.button || "Register")}</a>
            </article>
          `;
        })
        .join(""),
    faqs: (items) =>
      items
        .map(
          (item, index) => `
            <details ${item.open?.toLowerCase() === "yes" || index === 0 ? "open" : ""}>
              <summary>${escapeHtml(item.title)}</summary>
              <p>${escapeHtml(item.description)}</p>
            </details>
          `
        )
        .join(""),
    // contact: (items) =>
    //   items
    //     .map(
    //       (item) => `
    //         <article class="contact-card reveal">
    //           ${renderMediaThumb(item)}
    //           <h3>${escapeHtml(item.title)}</h3>
    //           <p>${escapeHtml(item.description)}</p>
    //           <a href="${escapeHtml(item.link || "#contact")}">${escapeHtml(item.button || "Contact")}</a>
    //         </article>
    //       `
    //     )
    //     .join(""),
  };

  Object.entries(renderers).forEach(([section, renderer]) => {
    const target = document.querySelector(`[data-content="${section}"]`);
    if (target) target.innerHTML = renderer(data[section] || []);
  });
};

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * eased);
    element.textContent = formatCounter(current);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = formatCounter(target);
    }
  };

  requestAnimationFrame(tick);
};

const setupRevealAnimations = () => {
  const revealItems = document.querySelectorAll(".reveal");
  const counterItems = document.querySelectorAll("[data-count]");
  const counted = new WeakSet();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");

        if (entry.target.matches("[data-count]") && !counted.has(entry.target)) {
          counted.add(entry.target);
          animateCounter(entry.target);
        }

        entry.target.querySelectorAll("[data-count]").forEach((counter) => {
          if (!counted.has(counter)) {
            counted.add(counter);
            animateCounter(counter);
          }
        });
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
  counterItems.forEach((item) => observer.observe(item));
};

const setupNavigation = () => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  });
};

const setupDonationAmounts = () => {
  const group = document.querySelector("[data-amounts]");
  if (!group) return;

  group.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    group.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
    event.target.classList.add("active");
  });
};

const setupLightbox = () => {
  const modal = document.querySelector("[data-lightbox-modal]");
  const image = document.querySelector("[data-lightbox-img]");
  const frame = document.querySelector("[data-lightbox-frame]");
  const video = document.querySelector("[data-lightbox-video]");
  const title = document.querySelector("[data-lightbox-title]");
  const close = document.querySelector("[data-lightbox-close]");

  if (!modal || !image || !frame || !video || !title || !close) return;

  const resetMedia = () => {
    image.hidden = true;
    frame.hidden = true;
    video.hidden = true;
    image.removeAttribute("src");
    frame.removeAttribute("src");
    video.removeAttribute("src");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    resetMedia();
  };

  resetMedia();

  document.querySelectorAll("[data-media-type]").forEach((item) => {
    item.addEventListener("click", () => {
      const mediaType = item.getAttribute("data-media-type") || "image";
      const mediaSrc = item.getAttribute("data-media-src") || "";
      const mediaTitle = item.getAttribute("data-media-title") || "";
      const mediaAlt = item.getAttribute("data-media-alt") || mediaTitle;

      if (!mediaSrc || mediaType === "none") return;

      resetMedia();

      if (mediaType === "youtube" || mediaType === "drive-video") {
        frame.hidden = false;
        frame.setAttribute("src", mediaSrc);
      } else if (mediaType === "video") {
        video.hidden = false;
        video.setAttribute("src", mediaSrc);
      } else {
        image.hidden = false;
        image.setAttribute("src", mediaSrc);
        image.setAttribute("alt", mediaAlt);
      }

      title.textContent = mediaTitle;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      close.focus();
    });
  });

  close.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};

// ============================================================
// SAVE DONATION RECORD TO GOOGLE SHEET
// ============================================================

const saveDonationToSheet = (payload) => {
  if (!SCRIPT_CONFIG.webAppUrl) return; // skip if not configured
  try {
    // fire-and-forget — no-cors avoids preflight, Apps Script still receives the body
    fetch(SCRIPT_CONFIG.webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Donation record could not be saved:", err);
  }
};

// ============================================================
// QR DONATION MODAL
// ============================================================

const openQrModal = (amount, donorName) => {
  const modal = document.getElementById("qr-modal");
  if (!modal) return;

  // Build UPI deep-link string
  const upiString =
    `upi://pay?pa=${encodeURIComponent(ACCOUNT_DATA.upiId)}` +
    `&pn=${encodeURIComponent(ACCOUNT_DATA.payeeName)}` +
    `&am=${amount}` +
    `&tn=${encodeURIComponent("Donation to " + ACCOUNT_DATA.payeeName)}` +
    `&cu=INR`;

  // Generate QR code via free public API (no extra library needed)
  const container = document.getElementById("qr-code-container");
  if (container) {
    container.innerHTML =
      `<img src="https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${encodeURIComponent(upiString)}" ` +
      `alt="UPI QR Code for ₹${amount}" width="192" height="192" loading="lazy" />`;
  }

  // Helper to safely set text content
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("qr-amount-display", `₹${Number(amount).toLocaleString("en-IN")}`);
  setText("qr-upi-id", ACCOUNT_DATA.upiId);
  setText("qr-account-name", ACCOUNT_DATA.accountName);
  setText("qr-account-no", ACCOUNT_DATA.accountNo);
  setText("qr-ifsc", ACCOUNT_DATA.ifsc);
  setText("qr-bank", ACCOUNT_DATA.bank);
  setText("qr-donor-name", donorName || "Anonymous");

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeQrModal = () => {
  const modal = document.getElementById("qr-modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const setupQrModal = () => {
  const modal = document.getElementById("qr-modal");
  if (!modal) return;
  // Close when clicking the backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeQrModal();
  });
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeQrModal();
    }
  });
};

const setupForms = () => {
  const donationForm = document.querySelector('form[aria-label="Donation form"]');

  // ── Donation form: live validation → enable/disable submit button ──
  if (donationForm) {
    const submitBtn   = donationForm.querySelector('button[type="submit"]');
    const group       = donationForm.querySelector("[data-amounts]");
    const customInput = donationForm.querySelector('input[type="number"]');
    const nameInput   = donationForm.querySelector('input[type="text"]');
    const emailInput  = donationForm.querySelector('input[type="email"]');
    const phoneInput  = donationForm.querySelector('input[type="tel"]');

    const isDonationFormValid = () => {
      const hasAmount =
        (customInput?.value && Number(customInput.value) >= 100) ||
        !!group?.querySelector("button.active");
      const hasName  = nameInput?.value.trim().length > 0;
      const hasEmail = emailInput?.value.trim().length > 0 && emailInput.validity.valid;
      const hasPhone = phoneInput?.value.trim().length > 0;
      return hasAmount && hasName && hasEmail && hasPhone;
    };

    const refreshBtn = () => {
      const valid = isDonationFormValid();
      submitBtn.disabled = !valid;
      submitBtn.setAttribute("aria-disabled", String(!valid));
    };

    // Start disabled
    refreshBtn();

    // Re-check on every input / preset-amount click
    donationForm.addEventListener("input", refreshBtn);
    group?.addEventListener("click", () => setTimeout(refreshBtn, 0));
  }

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Donation form — show dynamic QR modal
      if (form === donationForm) {
        const group       = form.querySelector("[data-amounts]");
        const activeBtn   = group?.querySelector("button.active");
        const customInput = form.querySelector('input[type="number"]');
        const nameInput   = form.querySelector('input[type="text"]');
        const emailInput  = form.querySelector('input[type="email"]');
        const phoneInput  = form.querySelector('input[type="tel"]');
        const methodInput = form.querySelector('select');
        const msgInput    = form.querySelector('textarea');

        // Resolve amount: custom input takes priority over preset button
        let amount = 0;
        if (customInput?.value && Number(customInput.value) > 0) {
          amount = Number(customInput.value);
        } else if (activeBtn) {
          amount = Number(activeBtn.textContent.replace(/[^0-9]/g, ""));
        }

        if (!amount || amount < 1) return; // guard (button should already be disabled)

        const donorName = nameInput?.value.trim() || "";

        // Save record to Google Sheet (fire-and-forget)
        saveDonationToSheet({
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          name:    donorName,
          email:   emailInput?.value.trim()  || "",
          phone:   phoneInput?.value.trim()  || "",
          amount:  `₹${amount}`,
          method:  methodInput?.value        || "",
          message: msgInput?.value.trim()    || "",
        });

        openQrModal(amount, donorName);
        return;
      }

      // Default handling for all other forms
      const button = form.querySelector("button[type='submit']");
      if (!button) return;
      const original = button.textContent;
      button.textContent = "Submitted";
      button.setAttribute("disabled", "true");
      setTimeout(() => {
        button.textContent = original;
        button.removeAttribute("disabled");
      }, 1800);
    });
  });
};

const init = async () => {
  const rows = await fetchSheetRows();
  const data = groupRows(rows);
  const sectionCounts = Object.fromEntries(Object.entries(data).map(([section, items]) => [section, items.length]));

  window.websiteData = data;
  console.info("Website data loaded from Google Sheets", sectionCounts);

  renderDashboard(data);
  renderContent(data);
  renderContact(data.contact || []);
  setupRevealAnimations();
  setupNavigation();
  setupDonationAmounts();
  setupLightbox();
  setupForms();
  setupQrModal();
};

window.addEventListener("load", () => {
  document.querySelector(".loader")?.classList.add("is-hidden");
});

init();
