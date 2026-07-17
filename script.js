const SHEET_CONFIG = {
  // Paste your published Google Sheet CSV URL here.
  // Example: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
  csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTseVEgZuYRd1bJhobpyT4qNKnPmYEJmGNedJcyG0DUcAadadi4OxN6sVayItM3PQ52eTFZlfA2blah/pub?gid=2037789487&single=true&output=csv",
};

// const fallbackRows = [
//   { section: "dashboard_summary", label: "Donation Received", value: "₹2,35,000" },
//   { section: "dashboard_summary", label: "Spent", value: "₹1,78,000" },
//   { section: "dashboard_summary", label: "Remaining", value: "₹57,000" },
//   { section: "dashboard_summary", label: "Families Supported", value: "820" },
//   { section: "dashboard_programs", label: "Meals Sponsored", value: "78" },
//   { section: "dashboard_programs", label: "Blankets Distributed", value: "64" },
//   { section: "dashboard_programs", label: "Children Helped", value: "82" },
//   { section: "dashboard_programs", label: "Women Helped", value: "58" },
//   { section: "dashboard_programs", label: "Emergency Relief", value: "46" },
//   { section: "impact_stats", title: "Lives Impacted", value: "10000" },
//   { section: "impact_stats", title: "Blankets Distributed", value: "500" },
//   { section: "impact_stats", title: "Meals Served", value: "3000" },
//   { section: "impact_stats", title: "School Kits Distributed", value: "2500" },
//   { section: "impact_stats", title: "Birthday Celebrations", value: "120" },
//   { section: "impact_stats", title: "Women Hygiene Kits", value: "100" },
//   {
//     section: "initiatives",
//     title: "Blanket Distribution",
//     description: "Helping families stay warm through winter with quality blankets and care kits.",
//     image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
//     alt: "Warm blankets folded for distribution",
//     icon: "☀",
//     link: "#impact",
//   },
//   {
//     section: "initiatives",
//     title: "Stationery Distribution",
//     description: "Providing school supplies that help children continue learning with confidence.",
//     image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
//     alt: "Children learning with notebooks",
//     icon: "✎",
//     link: "#impact",
//   },
//   {
//     section: "initiatives",
//     title: "Household Essentials",
//     description: "Delivering daily-use items to families facing financial or emergency hardship.",
//     image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80",
//     alt: "Household supplies arranged for families",
//     icon: "⌂",
//     link: "#impact",
//   },
//   {
//     section: "initiatives",
//     title: "Women's Hygiene Support",
//     description: "Distributing sanitary pads, hygiene kits, and awareness materials with dignity.",
//     image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
//     alt: "Healthcare volunteer arranging hygiene supplies",
//     icon: "+",
//     link: "#impact",
//   },
//   {
//     section: "initiatives",
//     title: "Birthday Celebrations",
//     description: "Creating joyful moments with cake, gifts, decorations, meals, and smiles.",
//     image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80",
//     alt: "Children celebrating a birthday with cake",
//     icon: "★",
//     link: "#gallery",
//   },
//   {
//     section: "initiatives",
//     title: "Food Distribution",
//     description: "Serving nutritious meals prepared with fresh ingredients, hygiene, and safe packaging.",
//     image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
//     alt: "Volunteers packing food for distribution",
//     icon: "◒",
//     link: "#impact",
//   },
//   {
//     section: "initiatives",
//     title: "Education Support",
//     description: "Helping children stay enrolled, equipped, and encouraged in their studies.",
//     image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
//     alt: "Books stacked in a classroom",
//     icon: "▣",
//     link: "#impact",
//   },
//   {
//     section: "initiatives",
//     title: "Emergency Relief",
//     description: "Rapid help for families affected by illness, displacement, weather, or crisis.",
//     image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
//     alt: "Volunteers coordinating relief work",
//     icon: "!",
//     link: "#contact",
//   },
//   { section: "activity_feed", date: "Today", description: "Distributed 150 freshly prepared meals in Sector 12." },
//   {
//     section: "activity_feed",
//     date: "Yesterday",
//     description: "Celebrated birthdays of 15 children with cake, gifts, and decorations.",
//   },
//   { section: "activity_feed", date: "2 days ago", description: "Distributed winter blankets to 40 families." },
//   {
//     section: "activity_feed",
//     date: "3 days ago",
//     description: "Provided hygiene kits to women and adolescent girls.",
//   },
//   { section: "activity_feed", date: "Last week", description: "Distributed stationery kits for school-going children." },
//   {
//     section: "gallery",
//     title: "Food Distribution",
//     image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=700&q=80",
//     alt: "Food distribution activity",
//     size: "tall",
//   },
//   {
//     section: "gallery",
//     title: "Blanket Drive",
//     image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=700&q=80",
//     alt: "Community support drive",
//   },
//   {
//     section: "gallery",
//     title: "Birthday Celebration",
//     image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
//     alt: "Birthday celebration setup",
//     size: "wide",
//   },
//   {
//     section: "gallery",
//     title: "Education",
//     image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80",
//     alt: "Children in education program",
//   },
//   {
//     section: "gallery",
//     title: "Women Support",
//     image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=700&q=80",
//     alt: "Health and hygiene support",
//   },
//   {
//     section: "gallery",
//     title: "Volunteers",
//     image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=700&q=80",
//     alt: "Volunteers working together",
//     size: "tall",
//   },
//   {
//     section: "stories",
//     before: "A child came to class without supplies.",
//     after: "She received a complete school kit.",
//     outcome: "Outcome: regular attendance improved.",
//   },
//   {
//     section: "stories",
//     before: "A family struggled through cold nights.",
//     after: "They received winter blankets and essentials.",
//     outcome: "Outcome: safer, warmer nights.",
//   },
//   {
//     section: "stories",
//     before: "Young girls lacked hygiene supplies.",
//     after: "They received sanitary kits and support.",
//     outcome: "Outcome: dignity and health awareness.",
//   },
//   {
//     section: "team",
//     title: "Founder Name",
//     role: "Founder",
//     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
//     alt: "Founder portrait placeholder",
//     linkedin: "#",
//     instagram: "#",
//   },
//   {
//     section: "team",
//     title: "Co-Founder Name",
//     role: "Co-Founder",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
//     alt: "Co-founder portrait placeholder",
//     linkedin: "#",
//     instagram: "#",
//   },
//   {
//     section: "team",
//     title: "Coordinator Name",
//     role: "Volunteer Coordinator",
//     image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80",
//     alt: "Volunteer coordinator portrait placeholder",
//     linkedin: "#",
//     instagram: "#",
//   },
//   {
//     section: "testimonials",
//     title: "Parent",
//     description: "The foundation helped my child continue school with dignity.",
//     rating: "5",
//   },
//   {
//     section: "testimonials",
//     title: "Donor",
//     description: "I could see exactly how my contribution was used.",
//     rating: "5",
//   },
//   {
//     section: "testimonials",
//     title: "Volunteer",
//     description: "Volunteering here feels organized, respectful, and meaningful.",
//     rating: "5",
//   },
//   { section: "events", date: "28 Jul", title: "Blanket Drive", location: "Community center, Delhi", link: "#volunteer" },
//   { section: "events", date: "04 Aug", title: "Birthday Celebration", location: "Learning shelter, Noida", link: "#volunteer" },
//   { section: "events", date: "11 Aug", title: "Food Distribution", location: "Sector 12 outreach", link: "#volunteer" },
//   { section: "events", date: "18 Aug", title: "Education Camp", location: "Govt. school support hall", link: "#volunteer" },
//   { section: "events", date: "25 Aug", title: "Blood Donation Camp", location: "Partner hospital", link: "#volunteer" },
//   { section: "faqs", title: "How can I donate?", description: "Use the donation form, UPI, bank transfer, or QR code payment placeholder.", open: "yes" },
//   { section: "faqs", title: "Can I volunteer?", description: "Yes. Submit the volunteer form and our coordinator will contact you for the next drive." },
//   { section: "faqs", title: "How is money used?", description: "Funds are tracked in the transparency dashboard and mapped to programs." },
//   {
//     section: "faqs",
//     title: "How do I receive updates?",
//     description: "Subscribe to the newsletter or follow our social channels for activity reports.",
//   },
//   {
//     section: "faqs",
//     title: "Is my donation tax deductible?",
//     description: "Tax exemption details can be added once your registration documentation is finalized.",
//   },
// ];

const fallbackRows = [];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const numberValue = (value) => Number(String(value || "0").replace(/[^0-9.-]/g, "")) || 0;

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
  const title = escapeHtml(media.title);

  if (media.type === "none") return "";

  if (media.type === "image") {
    return `<img class="${className}" src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" loading="lazy" />`;
  }

  const thumb = media.thumb
    ? `<img class="${className}" src="${escapeHtml(media.thumb)}" alt="${escapeHtml(media.alt)}" loading="lazy" />`
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
    data-media-src="${escapeHtml(media.src)}"
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

  const headers = (rows.shift() || []).map((header) => header.trim().toLowerCase());
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
    const section = (row.section || "").trim();
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
  const teamTarget = document.querySelector("[data-team]");
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

  if (teamTarget) {
    // const teamMembers = data.team || [];
    teamTarget.innerHTML = team
      .map(
        (item) => `
          <article class="person-card">
            ${renderMediaThumb(item)}
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.role)}</p>
            <div>
              <a href="${escapeHtml(item.linkedin || "#")}" aria-label="${escapeHtml(item.title)} LinkedIn">in</a>
              <a href="${escapeHtml(item.instagram || "#")}" aria-label="${escapeHtml(item.title)} Instagram">ig</a>
            </div>
          </article>
        `
      )
      .join("");
  }
};

const renderContent = (data) => {
  const renderers = {
    initiatives: (items) =>
      items
        .map(
          (item) => `
            <article class="initiative-card reveal">
              ${renderMediaThumb(item)}
              <div>
                <span class="icon">${escapeHtml(item.icon || "+")}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
                <a href="${escapeHtml(item.link || "#impact")}">${escapeHtml(item.button || "Read more")}</a>
              </div>
            </article>
          `
        )
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
              console.log(item)
              <h3>${escapeHtml(item.title)}</h3>
              console.log(item.role)
              <p>${escapeHtml(item.role)}</p>
              <div>
                <a href="${escapeHtml(item.linkedin || "#")}" aria-label="${escapeHtml(item.title)} LinkedIn">in</a>
                <a href="${escapeHtml(item.instagram || "#")}" aria-label="${escapeHtml(item.title)} Instagram">ig</a>
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

const setupForms = () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
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

  renderDashboard(data);
  renderContent(data);
  setupRevealAnimations();
  setupNavigation();
  setupDonationAmounts();
  setupLightbox();
  setupForms();
};

window.addEventListener("load", () => {
  document.querySelector(".loader")?.classList.add("is-hidden");
});

init();
