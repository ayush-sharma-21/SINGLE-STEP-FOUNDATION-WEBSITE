const SHEET_CONFIG = {
  csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTseVEgZuYRd1bJhobpyT4qNKnPmYEJmGNedJcyG0DUcAadadi4OxN6sVayItM3PQ52eTFZlfA2blah/pub?gid=2037789487&single=true&output=csv",
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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

const normalizeProgramPath = (url = "") => {
  const value = String(url).trim();
  if (!value || /^(https?:)?\/\//i.test(value) || value.startsWith("/") || value.startsWith("../")) return value;
  return value.startsWith("program/") ? value.replace(/^program\//, "") : value;
};

const getMedia = (item) => {
  const rawUrl = normalizeProgramPath(item.image || item.media || item.video || item.link || "");
  const title = item.title || item.label || "Program media";
  const alt = item.alt || title;
  const youtubeId = getYoutubeId(rawUrl);
  const driveId = getGoogleDriveId(rawUrl);
  const extension = rawUrl.split("?")[0].split(".").pop()?.toLowerCase() || "";
  const directVideo = ["mp4", "webm", "ogg", "mov"].includes(extension);
  const directImage =
    ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(extension) || rawUrl.includes("images.unsplash.com");

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
    const isVideo = /video|youtube/i.test(item.media_type || item.type || "");
    return {
      type: isVideo ? "drive-video" : "image",
      src: isVideo ? `https://drive.google.com/file/d/${driveId}/preview` : `https://drive.google.com/uc?export=view&id=${driveId}`,
      thumb: item.thumbnail || `https://drive.google.com/thumbnail?id=${driveId}&sz=w900`,
      alt,
      title,
    };
  }

  if (directVideo || /video/i.test(item.media_type || item.type || "")) {
    return { type: "video", src: rawUrl, thumb: normalizeProgramPath(item.thumbnail || ""), alt, title };
  }

  return { type: directImage || rawUrl ? "image" : "none", src: rawUrl, thumb: rawUrl, alt, title };
};

const renderMediaThumb = (item) => {
  const media = getMedia(item);
  if (media.type === "none") return `<div class="media-placeholder"></div>`;

  if (media.type === "image") {
    return `<img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" loading="lazy" />`;
  }

  const thumb = media.thumb
    ? `<img src="${escapeHtml(media.thumb)}" alt="${escapeHtml(media.alt)}" loading="lazy" />`
    : `<div class="media-placeholder"></div>`;

  return `<div class="video-preview">${thumb}<span class="play-badge">▶</span></div>`;
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

const fetchRows = async () => {
  const response = await fetch(`${SHEET_CONFIG.csvUrl}${SHEET_CONFIG.csvUrl.includes("?") ? "&" : "?"}cache=${Date.now()}`);
  if (!response.ok) throw new Error(`Sheet request failed: ${response.status}`);
  return parseCsv(await response.text());
};

const getProgramSlug = (item) => slugify(item.program || item.slug || item.title || item.label);

const getMediaRowsForProgram = (data, program) => {
  const targetSlug = getProgramSlug(program);
  const programRows = [...(data.program_media || []), ...(data.gallery || [])];
  return programRows.filter((item) => {
    const rowProgram = item.program || item.program_name || item.category || item.folder || item.title;
    return slugify(rowProgram) === targetSlug;
  });
};

const renderPrograms = (data) => {
  const target = document.querySelector("[data-program-list]");
  const programs = data.initiatives || [];

  if (!target) return;

  if (!programs.length) {
    target.innerHTML = `<div class="empty-program-state">No program rows found. Add rows with section set to initiatives in Google Sheets.</div>`;
    return;
  }

  target.innerHTML = programs
    .map(
      (program) => `
        <article class="program-card" data-program-card="${escapeHtml(getProgramSlug(program))}">
          ${renderMediaThumb(program)}
          <div class="program-card-body">
            <span class="eyebrow">${escapeHtml(program.icon || "Program")}</span>
            <h2>${escapeHtml(program.title)}</h2>
            <p>${escapeHtml(program.description)}</p>
            <button class="btn btn-primary" type="button">Open library</button>
          </div>
        </article>
      `
    )
    .join("");
};

const renderProgramMedia = (items) => {
  if (!items.length) {
    return `
      <div class="empty-program-state">
        No media rows are connected to this program yet. Add rows with section set to program_media and program set to this program name.
      </div>
    `;
  }

  return items
    .map((item) => {
      const media = getMedia(item);
      let mediaMarkup = "";

      if (media.type === "youtube" || media.type === "drive-video") {
        mediaMarkup = `<iframe src="${escapeHtml(media.src)}" title="${escapeHtml(media.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      } else if (media.type === "video") {
        mediaMarkup = `<video src="${escapeHtml(media.src)}" controls playsinline></video>`;
      } else {
        mediaMarkup = `<img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" loading="lazy" />`;
      }

      return `
        <article class="program-media-item">
          ${mediaMarkup}
          <div class="program-media-caption">
            <strong>${escapeHtml(item.title || item.label || "Program update")}</strong>
            <p>${escapeHtml(item.description || item.caption || item.alt || "")}</p>
          </div>
        </article>
      `;
    })
    .join("");
};

const setupPanel = (data) => {
  const panel = document.querySelector("[data-program-panel]");
  const title = document.querySelector("[data-program-title]");
  const description = document.querySelector("[data-program-description]");
  const eyebrow = document.querySelector("[data-program-eyebrow]");
  const mediaTarget = document.querySelector("[data-program-media]");

  if (!panel || !title || !description || !eyebrow || !mediaTarget) return;

  const programs = data.initiatives || [];

  const closePanel = () => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  };

  const openProgram = (programSlug) => {
    const program = programs.find((item) => getProgramSlug(item) === programSlug);
    if (!program) return;

    title.textContent = program.title || "Program";
    eyebrow.textContent = program.icon || "Program";
    description.textContent = program.description || "";
    mediaTarget.innerHTML = renderProgramMedia(getMediaRowsForProgram(data, program));
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  };

  document.querySelectorAll("[data-program-card]").forEach((card) => {
    card.addEventListener("click", () => openProgram(card.getAttribute("data-program-card")));
  });

  document.querySelectorAll("[data-program-close]").forEach((item) => item.addEventListener("click", closePanel));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });

  const initialProgram = new URLSearchParams(window.location.search).get("program");
  if (initialProgram) openProgram(slugify(initialProgram));
};

const init = async () => {
  try {
    const rows = await fetchRows();
    const data = groupRows(rows);
    window.programPageData = data;
    renderPrograms(data);
    setupPanel(data);
  } catch (error) {
    console.error("Program page could not load Google Sheet data.", error);
    const target = document.querySelector("[data-program-list]");
    if (target) {
      target.innerHTML = `<div class="empty-program-state">Program data could not be loaded. Check the published Google Sheet URL.</div>`;
    }
  }
};

init();
