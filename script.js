// ===== Custom Cursor =====
const CustomCursor = (() => {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId = null;

  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  }

  function animate() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    rafId = requestAnimationFrame(animate);
  }

  function init() {
    if (isTouchDevice()) return;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    const interactiveSelectors = "a, button, .tilt-card, .magnetic, .marquee-tag, input, textarea";
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        follower.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        follower.classList.remove("hover");
      });
    });

    animate();
  }

  return { init };
})();

// ===== 3D Tilt Cards =====
const TiltCards = (() => {
  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  }

  function init() {
    if (isTouchDevice()) return;

    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
        setTimeout(() => { card.style.transition = ""; }, 500);
      });

      card.addEventListener("mouseenter", () => {
        card.style.transition = "";
      });
    });
  }

  return { init };
})();

// ===== Magnetic Buttons =====
const MagneticButtons = (() => {
  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  }

  function init() {
    if (isTouchDevice()) return;

    const buttons = document.querySelectorAll(".magnetic");
    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        btn.style.transform = "translate(0, 0)";
        setTimeout(() => { btn.style.transition = ""; }, 400);
      });

      btn.addEventListener("mouseenter", () => {
        btn.style.transition = "";
      });
    });
  }

  return { init };
})();

// ===== Theme =====
const ThemeManager = (() => {
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const STORAGE_KEY = "portfolio-theme";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function apply(theme) {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", resolved);
    icon.className = resolved === "dark" ? "fas fa-moon" : "fas fa-sun";
  }

  function get() {
    return localStorage.getItem(STORAGE_KEY) || "system";
  }

  function set(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    apply(theme);
  }

  function init() {
    apply(get());

    toggle.addEventListener("click", () => {
      const current = get();
      const resolved =
        current === "system" ? getSystemTheme() : current;
      set(resolved === "dark" ? "light" : "dark");
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (get() === "system") apply("system");
      });
  }

  return { init };
})();

// ===== Navigation =====
const Navigation = (() => {
  const header = document.querySelector(".header");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  function init() {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    mobileToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      mobileToggle.classList.toggle("active", open);
      document.body.classList.toggle("no-scroll", open);
    });

    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("open") &&
        !e.target.closest(".nav")
      ) {
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  return { init };
})();

// ===== Split Text Animation =====
const SplitText = (() => {
  function init() {
    const elements = document.querySelectorAll("[data-split]");
    elements.forEach((el) => {
      const text = el.textContent.trim();
      el.textContent = "";

      text.split(/(\s+)/).forEach((segment, i) => {
        if (/^\s+$/.test(segment)) {
          el.appendChild(document.createTextNode(" "));
          return;
        }
        const span = document.createElement("span");
        span.className = "split-word";
        span.textContent = segment;
        span.style.animationDelay = `${0.4 + i * 0.08}s`;
        el.appendChild(span);
      });
    });
  }

  return { init };
})();

// ===== Hero Parallax =====
const HeroParallax = (() => {
  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  }

  function init() {
    if (isTouchDevice()) return;

    const elements = document.querySelectorAll("[data-parallax]");
    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      if (scrollY > heroBottom) return;

      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax);
        el.style.transform = `translateY(${scrollY * speed * -1}px)`;
      });
    }, { passive: true });
  }

  return { init };
})();

// ===== Scroll Reveal =====
const ScrollReveal = (() => {
  function init() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  return { init };
})();

// ===== Contact Form =====
const ContactForm = (() => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  const config = {
    serviceId: "service_go951ly",
    templateId: "template_agzaakg",
    publicKey: "vK51HBNLPXm2-psnN",
  };

  function setLoading(loading) {
    const btn = form.querySelector(".btn-submit");
    const label = btn.querySelector(".btn-label");
    const loader = btn.querySelector(".btn-loader");
    btn.disabled = loading;
    label.hidden = loading;
    loader.hidden = !loading;
  }

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
    if (type === "success") {
      setTimeout(() => {
        statusEl.className = "form-status";
      }, 5000);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    statusEl.className = "form-status";
    setLoading(true);

    const data = new FormData(form);
    const params = {
      from_name: data.get("name") || "Anonymous",
      from_email: data.get("email"),
      message: data.get("message"),
      to_email: "mingyues0320@gmail.com",
    };

    try {
      if (typeof emailjs === "undefined") throw new Error("EmailJS not loaded");

      const res = await emailjs.send(
        config.serviceId,
        config.templateId,
        params
      );

      if (res.status === 200) {
        showStatus("Message sent! I'll get back to you soon.", "success");
        form.reset();
      } else {
        throw new Error("Send failed");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      showStatus(
        "Something went wrong. Please email me directly.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  function init() {
    if (typeof emailjs !== "undefined") {
      emailjs.init(config.publicKey);
    }
    form.addEventListener("submit", handleSubmit);
  }

  return { init };
})();

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  Navigation.init();
  SplitText.init();
  HeroParallax.init();
  ScrollReveal.init();
  ContactForm.init();
  CustomCursor.init();
  TiltCards.init();
  MagneticButtons.init();
});
