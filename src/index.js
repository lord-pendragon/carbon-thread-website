// Import styles
import "./styles/main.css";
import AdilImg from "./images/Adil.jpg";
import TahaImg from "./images/Taha.jpg";
import ShahryarImg from "./images/Muhammad_Shahryar_Yaqoob.jpg";
import FarraeImg from "./images/Muhammad_Farrae.jpg";


// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  // Smooth Scroll for Navigation Links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar Background on Scroll
  const navbar = document.querySelector(".navbar");

  function handleScroll() {
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.backgroundColor = "var(--bg-white)";
      navbar.style.backdropFilter = "none";
    }
  }

  if (navbar) {
    window.addEventListener("scroll", handleScroll);
  }

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");

    if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const name = formData.get("name") || "";
        const email = formData.get("email") || "";
        const company = formData.get("company") || "";
        const service = formData.get("service") || "";
        const message = formData.get("message") || "";

        const subject = encodeURIComponent(`New Contact Form Submission`);
        const body = encodeURIComponent(
        `Name: ${name}
    Email: ${email}
    Company: ${company}
    Service of Interest: ${service}

    Message:
    ${message}`
        );

        // Opens the user's email client with the email pre-filled
        window.location.href = `mailto:info@carbon-thread.com?subject=${subject}&body=${body}`;

        // Optional: show a message
        alert("Your email client is opening now. Please press Send to complete.");

        // Reset form
        this.reset();
    });
    }

  const teamImageMap = {
    adil: AdilImg,
    taha: TahaImg,
    shahryar: ShahryarImg,
    farrae: FarraeImg,
  };

  document.querySelectorAll("img.team-photo[data-key]").forEach((img) => {
    const key = img.dataset.key;
    const src = teamImageMap[key];
    if (src) img.dataset.src = src; // now your existing lazy loader will work
  });



  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    observer.observe(card);
  });

  // Observe team members
  const teamMembers = document.querySelectorAll(".team-member");
  teamMembers.forEach((member) => {
    observer.observe(member);
  });

  // Add animation styles dynamically
  const style = document.createElement("style");
  style.textContent = `
        .fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
        }

        .nav-link.active {
            background-color: var(--bg-light);
            color: var(--primary-color);
        }
    `;
  document.head.appendChild(style);

  // Lazy Loading for Images (when you add them)
  const lazyImages = document.querySelectorAll("img[data-src]");

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Performance: Throttle scroll events
  let scrollTimeout;
  function throttledScroll(callback, delay) {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      callback();
      scrollTimeout = null;
    }, delay);
  }

  // Replace direct scroll listeners with throttled versions
  window.addEventListener("scroll", () => {
    throttledScroll(handleScroll, 100);
    throttledScroll(highlightNavigation, 100);
  });

  // Add hover effects for service cards
  const cards = document.querySelectorAll(".service-card, .team-member");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Console welcome message
  console.log(
    "%c Welcome to Carbon Thread! 🌱",
    "color: #2c5530; font-size: 20px; font-weight: bold; padding: 10px;",
  );
  console.log(
    "%c Making sustainability compliance accessible to all.",
    "color: #5a8d60; font-size: 14px; padding: 5px;",
  );
});

// Export for potential use in other modules
export const CarbonThread = {
  version: "1.0.0",
  init: function () {
    console.log("Carbon Thread Website Initialized");
  },
};

// Initialize
CarbonThread.init();
