const menuIcon = document.querySelector(".fa-bars");
const menu = document.querySelector("nav ul");
const closingIcon = document.querySelector(".fa-times");
const body = document.querySelector("body");

const openMenu = () => {
  menu.style.display = "flex";
  body.classList.add("scroll-disabled");
  menu.className = "menu-slidein";
};

const closeMenu = () => {
  body.classList.remove("scroll-disabled");
  menu.className = "menu-slideout";
};

menuIcon.addEventListener("click", openMenu);

closingIcon.addEventListener("click", closeMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    menu.classList = [];
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});

// Contact Modal Functionality
const contactBtn = document.getElementById("contact-btn");
const contactModal = document.getElementById("contact-modal");
const closeModal = document.querySelector(".close");
const cancelBtn = document.querySelector(".btn-cancel");
const contactForm = document.getElementById("contact-form");

const openContactModal = () => {
  contactModal.style.display = "block";
  body.classList.add("scroll-disabled");
};

const closeContactModal = () => {
  contactModal.style.display = "none";
  body.classList.remove("scroll-disabled");
  contactForm.reset();
};

// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_go951ly";
const EMAILJS_TEMPLATE_ID = "template_agzaakg";
const EMAILJS_PUBLIC_KEY = "vK51HBNLPXm2-psnN";

// Initialize EmailJS
(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

const showMessage = (message, type) => {
  const messageDiv = document.getElementById("form-message");
  messageDiv.textContent = message;
  messageDiv.className = `form-message ${type}`;
  messageDiv.style.display = "block";

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
};

const setLoadingState = (loading) => {
  const sendBtn = document.querySelector(".btn-send");
  const btnText = document.querySelector(".btn-text");
  const btnLoading = document.querySelector(".btn-loading");

  if (loading) {
    sendBtn.disabled = true;
    btnText.style.display = "none";
    btnLoading.style.display = "inline";
  } else {
    sendBtn.disabled = false;
    btnText.style.display = "inline";
    btnLoading.style.display = "none";
  }
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Hide any previous messages
  document.getElementById("form-message").style.display = "none";

  // Set loading state
  setLoadingState(true);

  const formData = new FormData(contactForm);
  const templateParams = {
    from_email: formData.get("email"),
    subject: formData.get("subject") || "Message from Portfolio Website",
    message: formData.get("message"),
    to_email: "mingyues0320@gmail.com",
  };

  try {
    // Check if EmailJS is loaded
    if (typeof emailjs === "undefined") {
      throw new Error("EmailJS library not loaded");
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      showMessage(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      contactForm.reset();

      // Close modal after 2 seconds
      setTimeout(() => {
        closeContactModal();
      }, 2000);
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    showMessage(
      "Sorry, there was an error sending your message. Please try again or contact me directly.",
      "error"
    );
  } finally {
    setLoadingState(false);
  }
};

// Event Listeners
contactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openContactModal();
});

closeModal.addEventListener("click", closeContactModal);
cancelBtn.addEventListener("click", closeContactModal);

// Close modal when clicking outside
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    closeContactModal();
  }
});

// Handle form submission
contactForm.addEventListener("submit", handleFormSubmit);

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && contactModal.style.display === "block") {
    closeContactModal();
  }
});
