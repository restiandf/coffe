document.addEventListener("DOMContentLoaded", function () {
  console.log("Script aktif!");
  // Toggle main menu (mobile) dengan animasi dan overlay
  const navToggle = document.getElementById("nav-toggle");
  const mainMenu = document.getElementById("main-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  let menuOpen = false;

  function openMenu() {
    mainMenu.classList.remove("hidden");
    mainMenu.classList.add("flex");
    menuOverlay.classList.add("active");
    menuOpen = true;
  }
  function closeMenu() {
    mainMenu.classList.remove("flex");
    mainMenu.classList.add("hidden");
    menuOverlay.classList.remove("active");
    menuOpen = false;
  }

  if (navToggle && mainMenu && menuOverlay) {
    navToggle.addEventListener("click", function () {
      if (!menuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });
    // Tutup menu saat klik link (mobile)
    mainMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", function () {
        if (window.innerWidth < 768) {
          closeMenu();
        }
      });
    });
    // Tutup menu saat klik overlay
    menuOverlay.addEventListener("click", function () {
      closeMenu();
    });
    // Tutup menu saat resize ke desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        mainMenu.classList.remove("hidden", "menu-anim-show", "menu-anim-hide", "flex", "flex-col", "bg-white", "rounded-xl", "shadow-lg", "p-6", "absolute", "top-20", "left-6", "right-6", "z-40");
        menuOverlay.classList.remove("active");
        menuOpen = false;
      } else {
        mainMenu.classList.add("hidden");
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
      nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    } else {
      nav.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }
  });

  // Add cart functionality
  let cart = [];
  document.querySelectorAll('button:contains("Add to Cart")').forEach((button) => {
    button.addEventListener("click", function () {
      this.innerHTML = "Added! ✅";
      this.style.backgroundColor = "#22c55e";
      setTimeout(() => {
        this.innerHTML = "Add to Cart";
        this.style.backgroundColor = "";
      }, 2000);
    });
  });

  // Highlight active nav link with Intersection Observer
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function setActiveLinkById(id) {
    navLinks.forEach(link => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active-link");
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -50% 0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLinkById(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Pastikan saat klik menu juga langsung aktif
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      const id = this.getAttribute("href").replace('#', '');
      setActiveLinkById(id);
    });
  });
});