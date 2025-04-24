// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Custom cursor
    const cursor = document.querySelector(".cursor");
    const cursorInner = document.createElement("div");
    cursorInner.classList.add("cursor-inner");
    cursor.appendChild(cursorInner);
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursorInner.style.left = e.clientX + "px";
      cursorInner.style.top = e.clientY + "px";
    });
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    });
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
  
    // Hide loader then start animations
    setTimeout(() => {
      document.querySelector(".loader").classList.add("hidden");
      startAnimations();
    }, 2500);
  
    // Mobile nav toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  
    // Header scroll effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  
    // Active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (pageYOffset >= top - 60) current = section.getAttribute("id");
      });
      navItems.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    });
  
    // Testimonial slider (if present)
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    function showSlide(n) {
      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    }
    document.querySelector(".prev-btn")?.addEventListener("click", () => showSlide(currentSlide - 1));
    document.querySelector(".next-btn")?.addEventListener("click", () => showSlide(currentSlide + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
    setInterval(() => showSlide(currentSlide + 1), 5000);
  
    // Scroll-triggered animations and stats
    function animateOnScroll() {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    }
    function animateStats() {
      document.querySelectorAll(".stat-number").forEach((stat) => {
        const target = parseInt(stat.dataset.count, 10);
        let current = 0;
        const step = target / (2000 / 20);
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            stat.textContent = target;
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(current);
          }
        }, 20);
      });
    }
    function startAnimations() {
      animateOnScroll();
      const about = document.getElementById("about");
      new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            obs.disconnect();
          }
        });
      }, { threshold: 0.5 }).observe(about);
    }
  });
  