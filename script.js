// Modern Portfolio JavaScript - Modular and Clean Structure

// ===== THEME MANAGEMENT =====
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupThemeToggle();
    this.setupSystemThemeListener();
    this.loadSavedTheme();
  }

  setupThemeToggle() {
    const themeButtons = document.querySelectorAll(".theme-btn");
    themeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleThemeChange(button);
      });
    });
  }

  setupSystemThemeListener() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      const currentTheme = localStorage.getItem("portfolio-theme");
      if (currentTheme === "system" || !currentTheme) {
        this.applyTheme("system");
      }
    });
  }

  handleThemeChange(button) {
    const theme = button.dataset.theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.updateActiveButton(button);
  }

  applyTheme(theme) {
    const root = document.documentElement;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemPrefersDark = mediaQuery.matches;
      const appliedTheme = systemPrefersDark ? "dark" : "light";
      root.setAttribute("data-theme", appliedTheme);
    } else {
      root.setAttribute("data-theme", theme);
    }
  }

  saveTheme(theme) {
    localStorage.setItem("portfolio-theme", theme);
  }

  loadSavedTheme() {
    const saved = localStorage.getItem("portfolio-theme") || "system";

    // Apply the theme immediately
    this.applyTheme(saved);

    // Update the active button
    const button = document.querySelector(`[data-theme="${saved}"]`);
    if (button) {
      this.updateActiveButton(button);
    }
  }

  updateActiveButton(activeButton) {
    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    activeButton.classList.add("active");
  }
}

// ===== NAVIGATION MANAGEMENT =====
class NavigationManager {
  constructor() {
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.body = document.body;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveSection();
    this.setupWindowResize();
  }

  setupMobileMenu() {
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener("click", () =>
        this.toggleMobileMenu()
      );
    }

    // Close mobile menu when clicking on nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu());
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest("nav") &&
        this.navMenu.classList.contains("active")
      ) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle("active");
    this.mobileMenuToggle.classList.toggle("active");
    this.body.classList.toggle("scroll-disabled");
  }

  closeMobileMenu() {
    if (window.innerWidth <= 768) {
      this.navMenu.classList.remove("active");
      this.mobileMenuToggle.classList.remove("active");
      this.body.classList.remove("scroll-disabled");
    }
  }

  setupWindowResize() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
          this.navMenu.classList.remove("active");
          this.mobileMenuToggle.classList.remove("active");
          this.body.classList.remove("scroll-disabled");
        }
      }, 250);
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = document.querySelector("header").offsetHeight;
            const extraSpacing = 0; // No extra spacing - section starts right under nav
            const targetPosition =
              target.offsetTop - headerHeight - extraSpacing;

            window.scrollTo({
              top: Math.max(0, targetPosition), // Ensure we don't scroll above the top
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  setupActiveSection() {
    const sections = document.querySelectorAll("section[id]");

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector("header")?.offsetHeight || 80;

      // Check if we're at the very top of the page
      if (scrollPosition < 100) {
        this.navLinks.forEach((link) => link.classList.remove("active"));
        const heroLink = document.querySelector('.nav-link[href="#hero"]');
        if (heroLink) {
          heroLink.classList.add("active");
        }
        return;
      }

      let activeSection = null;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          activeSection = sectionId;
        }
      });

      if (activeSection) {
        this.navLinks.forEach((link) => link.classList.remove("active"));
        const activeNavLink = document.querySelector(
          `.nav-link[href="#${activeSection}"]`
        );
        if (activeNavLink) {
          activeNavLink.classList.add("active");
        }
      }
    };

    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveSection, 10);
    }, { passive: true });

    // Ensure hero link is active on page load
    const ensureHeroActive = () => {
      const heroLink = document.querySelector('.nav-link[href="#hero"]');
      const currentlyActive = document.querySelector(".nav-link.active");

      // If no link is active or if we're at the top, make sure hero is active
      if (!currentlyActive || window.scrollY < 100) {
        this.navLinks.forEach((link) => link.classList.remove("active"));
        if (heroLink) {
          heroLink.classList.add("active");
        }
      }
    };

    // Run immediately and then after a delay
    ensureHeroActive();
    setTimeout(ensureHeroActive, 100);
    setTimeout(updateActiveSection, 200);
  }
}

// ===== TYPING ANIMATION =====
class TypingAnimation {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000,
      startDelay: 1500,
      ...options,
    };

    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.init();
  }

  init() {
    if (!this.element) return;

    setTimeout(() => {
      this.type();
    }, this.options.startDelay);
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting
      ? this.options.deleteSpeed
      : this.options.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.options.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===== CONTACT FORM MANAGER =====
class ContactFormManager {
  constructor() {
    this.modal = document.getElementById("contact-modal");
    this.contactBtn = document.getElementById("contact-btn");
    this.closeBtn = document.getElementById("modal-close");
    this.cancelBtn = document.getElementById("cancel-btn");
    this.form = document.getElementById("contact-form");
    this.messageDiv = document.getElementById("form-message");
    this.body = document.body;

    // EmailJS Configuration
    this.emailJSConfig = {
      serviceId: "service_go951ly",
      templateId: "template_agzaakg",
      publicKey: "vK51HBNLPXm2-psnN",
    };

    this.init();
  }

  init() {
    this.initEmailJS();
    this.setupEventListeners();
  }

  initEmailJS() {
    if (typeof emailjs !== "undefined") {
      emailjs.init(this.emailJSConfig.publicKey);
    }
  }

  setupEventListeners() {
    // Open modal
    if (this.contactBtn) {
      this.contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal();
      });
    }

    // Close modal events
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.cancelBtn) {
      this.cancelBtn.addEventListener("click", () => this.closeModal());
    }

    // Close on backdrop click
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.modal &&
        this.modal.style.display === "block"
      ) {
        this.closeModal();
      }
    });

    // Form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.style.display = "block";
      this.body.classList.add("scroll-disabled");

      // Focus first input
      const firstInput = this.form.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.style.display = "none";
      this.body.classList.remove("scroll-disabled");
      this.form.reset();
      this.hideMessage();
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    this.hideMessage();
    this.setLoadingState(true);

    const formData = new FormData(this.form);
    const templateParams = {
      from_name: formData.get("name") || "Anonymous",
      from_email: formData.get("email"),
      message: formData.get("message"),
      to_email: "mingyues0320@gmail.com",
    };

    try {
      if (typeof emailjs === "undefined") {
        throw new Error("EmailJS library not loaded");
      }

      const response = await emailjs.send(
        this.emailJSConfig.serviceId,
        this.emailJSConfig.templateId,
        templateParams
      );

      if (response.status === 200) {
        this.showMessage(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
        this.form.reset();

        setTimeout(() => {
          this.closeModal();
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      this.showMessage(
        "Sorry, there was an error sending your message. Please try again or contact me directly.",
        "error"
      );
    } finally {
      this.setLoadingState(false);
    }
  }

  showMessage(message, type) {
    if (this.messageDiv) {
      this.messageDiv.textContent = message;
      this.messageDiv.className = `form-message ${type}`;
      this.messageDiv.style.display = "block";

      if (type === "success") {
        setTimeout(() => {
          this.hideMessage();
        }, 5000);
      }
    }
  }

  hideMessage() {
    if (this.messageDiv) {
      this.messageDiv.style.display = "none";
    }
  }

  setLoadingState(loading) {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    if (loading) {
      submitBtn.disabled = true;
      if (btnText) btnText.style.display = "none";
      if (btnLoading) btnLoading.style.display = "inline-flex";
    } else {
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = "inline";
      if (btnLoading) btnLoading.style.display = "none";
    }
  }
}

// ===== SCROLL EFFECTS =====
class ScrollEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollToTop();
    this.setupParallaxEffects();
  }

  setupScrollToTop() {
    // Add scroll to top functionality if needed
    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  setupParallaxEffects() {
    // Add subtle parallax effects for hero section if desired
    // Disable on mobile for better performance
    if (window.innerWidth <= 768) {
      return;
    }

    const heroImage = document.querySelector(".hero-image");
    if (heroImage) {
      let ticking = false;

      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (scrolled < window.innerHeight) {
          heroImage.style.transform = `translateY(${rate}px)`;
        }

        ticking = false;
      };

      const requestParallaxUpdate = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };

      window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    }
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalAssets();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }

  preloadCriticalAssets() {
    // Preload critical assets
    const criticalAssets = [
      "assets/images/hero-bg.jpg",
      // Add other critical assets
    ];

    criticalAssets.forEach((asset) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = asset;
      document.head.appendChild(link);
    });
  }
}

// ===== MAIN APPLICATION =====
class PortfolioApp {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize theme management
      this.components.themeManager = new ThemeManager();

      // Initialize navigation
      this.components.navigationManager = new NavigationManager();

      // Initialize typing animation
      const typingElement = document.querySelector(".typing-text");
      if (typingElement) {
        this.components.typingAnimation = new TypingAnimation(typingElement, [
          "Front-end Developer",
          "React Enthusiast",
          "Problem Solver",
          "Lifelong Learner",
        ]);
      }

      // Initialize contact form
      this.components.contactFormManager = new ContactFormManager();

      // Initialize scroll effects
      this.components.scrollEffects = new ScrollEffects();

      // Initialize performance optimizations
      this.components.performanceOptimizer = new PerformanceOptimizer();

      // Add loaded class to body for CSS transitions
      document.body.classList.add("loaded");
    } catch (error) {
      console.error("Error initializing portfolio components:", error);
    }
  }

  // Method to access components from global scope if needed
  getComponent(name) {
    return this.components[name];
  }
}

// ===== INITIALIZE APPLICATION =====
const portfolioApp = new PortfolioApp();

// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});
