// ===== ANNOUNCEMENT BAR =====
const announcements = [
  `<img src="https://flagcdn.com/16x12/ke.png" alt="Kenya flag" style="display:inline-block; vertical-align:middle; margin-right:6px;"> Delivery countrywide — We deliver across Kenya!`,
  "📧 sales@GoldenGen.co.ke — Reach us anytime",
  `<i class="fa-brands fa-whatsapp"></i> Order via WhatsApp or Call 0795 044 498`,
  "🛡️ 1 Year Warranty on all laptops",
];

let currentAnnouncement = 0;
const announcementText = document.getElementById("announcementText");
let intervalId = setInterval(cycleAnnouncements, 4000);

// Pause on hover
announcementText.addEventListener("mouseenter", () =>
  clearInterval(intervalId),
);
announcementText.addEventListener("mouseleave", () => {
  intervalId = setInterval(cycleAnnouncements, 4000);
});

function cycleAnnouncements() {
  if (!announcementText) return;

  announcementText.classList.add("hide");

  setTimeout(() => {
    currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
    announcementText.innerHTML = announcements[currentAnnouncement];
    announcementText.classList.remove("hide");
  }, 650);
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded =
      hamburger.getAttribute("aria-expanded") === "true" ? false : true;
    hamburger.setAttribute("aria-expanded", expanded);
    navLinks.classList.toggle("active");

    const icon = hamburger.querySelector("i");
    if (icon) {
      if (expanded) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Close on link click
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector(".main-nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== CART COUNT BOUNCE  =====
const cartCount = document.getElementById("cartCount");
if (cartCount) {
  // Call this function whenever cart count changes
  window.animateCartCount = function () {
    cartCount.classList.add("bounce");
    setTimeout(() => cartCount.classList.remove("bounce"), 400);
  };
}

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById("typewriter");
const words = [
  "Premium Laptops",
  "Gaming Accessories",
  "Computer Peripherals",
  "Quality Tech Gear",
  "Keyboards & Mice",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  // Word fully typed
  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 1500);
  }

  // Word fully deleted
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}

// Start typewriter
typeWriter();

// ===== PRODUCT CARDS SLIDE-UP ON SCROLL =====
const productCards = document.querySelectorAll(".product-card");

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

productCards.forEach((card) => cardObserver.observe(card));

// ===== FILTER TABS =====
const filterTabs = document.querySelectorAll(".filter-tab");
const allCards = document.querySelectorAll(".product-card");
const productsGrid = document.getElementById("productsGrid");

function showCards(filter) {
  let count = 0;
  allCards.forEach((card) => {
    const category = card.dataset.category;
    const matchesFilter = filter === "all" || category === filter;

    // For 'all' show only first 8
    if (filter === "all") {
      if (count < 8) {
        card.style.display = "block";
        setTimeout(() => card.classList.add("visible"), count * 80);
        count++;
      } else {
        card.style.display = "none";
      }
    } else {
      if (matchesFilter) {
        card.style.display = "block";
        setTimeout(() => card.classList.add("visible"), count * 80);
        count++;
      } else {
        card.style.display = "none";
        card.classList.remove("visible");
      }
    }
  });
}

// Initialize — show first 8
showCards("all");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Reset visibility before filtering
    allCards.forEach((card) => card.classList.remove("visible"));

    showCards(tab.dataset.filter);
  });
});

// ===== VIDEO SECTION =====
const videoPlayBtn = document.getElementById("videoPlayBtn");
const videoPlayOverlay = document.getElementById("videoPlayOverlay");
const videoThumbnail = document.getElementById("videoThumbnail");
const videoPlayer = document.getElementById("videoPlayer");
const bgMusic = document.getElementById("bgMusic");

if (videoPlayBtn) {
  videoPlayBtn.addEventListener("click", () => {
    // Hide thumbnail and overlay
    videoThumbnail.style.display = "none";
    videoPlayOverlay.style.display = "none";

    // Show and play video
    videoPlayer.classList.add("active");
    videoPlayer.play();

    // Play background music at low volume
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play();
    }
  });

  // Stop music when video ends
  videoPlayer.addEventListener("ended", () => {
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }

    // Show thumbnail and overlay again
    videoThumbnail.style.display = "block";
    videoPlayOverlay.style.display = "flex";
    videoPlayer.classList.remove("active");
  });

  // Stop music if video is paused
  videoPlayer.addEventListener("pause", () => {
    if (bgMusic) bgMusic.pause();
  });

  // Resume music if video is played again
  videoPlayer.addEventListener("play", () => {
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play();
    }
  });
}

if (videoPlayBtn) {
  videoPlayBtn.addEventListener("click", () => {
    videoThumbnail.style.display = "none";
    videoPlayOverlay.style.display = "none";
    videoPlayer.classList.add("active");

    // Play video
    videoPlayer.play();

    // Play music with slight delay
    setTimeout(() => {
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.3;
        bgMusic
          .play()
          .then(() => console.log("Music playing!"))
          .catch((err) => console.log("Music blocked:", err));
      }
    }, 300);
  });
}
// ===== AUDIO UNLOCK =====
let audioUnlocked = false;

document.addEventListener(
  "click",
  () => {
    if (!audioUnlocked && bgMusic) {
      bgMusic
        .play()
        .then(() => {
          bgMusic.pause();
          bgMusic.currentTime = 0;
          audioUnlocked = true;
        })
        .catch((err) => console.log(err));
    }
  },
  { once: true },
);
