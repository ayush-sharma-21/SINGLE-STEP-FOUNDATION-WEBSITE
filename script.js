const dashboardData = {
  summary: [
    { label: "Donation Received", value: "₹2,35,000" },
    { label: "Spent", value: "₹1,78,000" },
    { label: "Remaining", value: "₹57,000" },
    { label: "Families Supported", value: "820" },
  ],
  programs: [
    { label: "Meals Sponsored", value: 78 },
    { label: "Blankets Distributed", value: 64 },
    { label: "Children Helped", value: 82 },
    { label: "Women Helped", value: 58 },
    { label: "Emergency Relief", value: 46 },
  ],
};

const formatCounter = (value) => {
  if (value >= 1000) {
    return `${value.toLocaleString("en-IN")}+`;
  }
  return `${value}+`;
};

const renderDashboard = () => {
  const summaryTarget = document.querySelector("[data-dashboard]");
  const progressTarget = document.querySelector("[data-progress]");

  if (summaryTarget) {
    summaryTarget.innerHTML = dashboardData.summary
      .map(
        (item) => `
          <article class="money-card">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
          </article>
        `
      )
      .join("");
  }

  if (progressTarget) {
    progressTarget.innerHTML = dashboardData.programs
      .map(
        (item) => `
          <div class="progress-item">
            <div class="progress-label">
              <span>${item.label}</span>
              <span>${item.value}%</span>
            </div>
            <div class="progress-bar" aria-label="${item.label} progress">
              <span style="--progress: ${item.value}%"></span>
            </div>
          </div>
        `
      )
      .join("");
  }
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
  const title = document.querySelector("[data-lightbox-title]");
  const close = document.querySelector("[data-lightbox-close]");

  if (!modal || !image || !title || !close) return;

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    image.removeAttribute("src");
  };

  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.addEventListener("click", () => {
      const preview = item.querySelector("img");
      if (!preview) return;
      image.setAttribute("src", preview.currentSrc || preview.src);
      image.setAttribute("alt", preview.alt);
      title.textContent = item.getAttribute("data-lightbox") || "";
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

window.addEventListener("load", () => {
  document.querySelector(".loader")?.classList.add("is-hidden");
});

renderDashboard();
setupRevealAnimations();
setupNavigation();
setupDonationAmounts();
setupLightbox();
setupForms();
