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


// ================= FAQ ACCORDION =================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});


// ================= ACTIVE NAVBAR ON SCROLL =================

const sections = document.querySelectorAll(".section-page");
const navItems = document.querySelectorAll(".nav-link");

const observerOptions = {
  root: null,
  threshold: 0.35
};

const sectionObserver = new IntersectionObserver((entries) => {
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
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});