// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// ================= ACTIVE NAVBAR ON SCROLL =================

const sections = document.querySelectorAll(".section-page");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentSectionId = entry.target.getAttribute("id");

        navItems.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { root: null, threshold: 0.35 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


// ================= SCROLL REVEAL =================

const revealEls = document.querySelectorAll(".reveal");

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${(index % 4) * 80}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { root: null, threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));


// ================= COUNT-UP STATS =================

const statNumbers = document.querySelectorAll(".stat-number");

function animateCount(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

statNumbers.forEach((el) => statObserver.observe(el));


// ================= SCROLL PROGRESS BAR =================

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${percent}%`;
}

// ================= HERO PARALLAX =================

const heroBlob = document.querySelector(".hero-blob");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateParallax() {
  if (!heroBlob || reduceMotion) return;
  const offset = window.scrollY * 0.15;
  heroBlob.style.transform = `translate(-50%, ${offset}px)`;
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

updateScrollProgress();
updateParallax();
