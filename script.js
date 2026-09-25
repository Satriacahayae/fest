/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");

    if (menuToggle.classList.contains("active")) {
      menuToggle.textContent = "×";
    } else {
      menuToggle.textContent = "☰";
    }
  });

  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(`
  .about-content,
  .about-bottom,
  .experience-intro,
  .experience-image,
  .experience-grid,
  .events-list,
  .lineup-hero,
  .lineup-featured,
  .lineup-list,
  .lineup-footer,
  .tickets-hero,
  .ticket-grid,
  .tickets-footer,
  .footer-top,
  .footer-bottom
`);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("reveal-active");
  });
}

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================
   SMOOTH NAVIGATION
========================= */

const smoothLinks = document.querySelectorAll('a[href^="#"]:not(.ticket):not(.ticket-card)');

smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    let targetElement;

    try {
      targetElement = document.querySelector(targetId);
    } catch (error) {
      return;
    }

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id], footer[id]");

const navigationLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");

          navigationLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* =========================
   HERO MOUSE MOVEMENT
========================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

if (hero && heroContent) {
  hero.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 768) {
      return;
    }

    const rect = hero.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (mouseX - centerX) / 80;
    const moveY = (mouseY - centerY) / 80;

    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroContent.style.transform = "translate(0, 0)";
  });
}

/* =========================
   INTERACTIVE ROWS
========================= */

const interactiveRows = document.querySelectorAll(".event-item, .artist, .lineup-featured, .ticket-card");

interactiveRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.classList.add("is-hovered");
  });

  row.addEventListener("mouseleave", () => {
    row.classList.remove("is-hovered");
  });
});

/* =========================
   CURRENT YEAR
========================= */

const currentYear = document.querySelector(".footer-bottom span");

if (currentYear) {
  const text = currentYear.textContent;

  if (text.includes("2026")) {
    currentYear.textContent = text.replace("2026", new Date().getFullYear());
  }
}

/* =========================
   PAGE LOADED
========================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* =========================
   LINEUP CURSOR INTERACTION
========================= */

const lineupArtists = document.querySelectorAll(".artist, .lineup-featured");

lineupArtists.forEach((artist) => {
  artist.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 768) {
      return;
    }

    const rect = artist.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 25;
    const moveY = (y - centerY) / 25;

    const arrow = artist.querySelector(".artist-arrow, .featured-arrow");

    if (arrow) {
      arrow.style.transform = `translate(${moveX}px, ${moveY}px) rotate(45deg)`;
    }
  });

  artist.addEventListener("mouseleave", () => {
    const arrow = artist.querySelector(".artist-arrow, .featured-arrow");

    if (arrow) {
      arrow.style.transform = "";
    }
  });
});

/* =========================
   EVENTS CURSOR INTERACTION
========================= */

const eventItems = document.querySelectorAll(".event-item");

eventItems.forEach((eventItem) => {
  eventItem.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 768) {
      return;
    }

    const rect = eventItem.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 35;
    const moveY = (y - centerY) / 35;

    const arrow = eventItem.querySelector(".event-arrow");

    if (arrow) {
      arrow.style.transform = `translate(${moveX}px, ${moveY}px) rotate(45deg)`;
    }
  });

  eventItem.addEventListener("mouseleave", () => {
    const arrow = eventItem.querySelector(".event-arrow");

    if (arrow) {
      arrow.style.transform = "";
    }
  });
});

/* =========================
   FOOTER MOUSE INTERACTION
========================= */

const footer = document.querySelector(".footer");
const footerTitle = document.querySelector(".footer-title");

if (footer && footerTitle) {
  footer.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 768) {
      return;
    }

    const rect = footer.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 80;
    const moveY = (y - centerY) / 100;

    footerTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  footer.addEventListener("mouseleave", () => {
    footerTitle.style.transform = "translate(0, 0)";
  });
}

/* =========================
   TICKETS
========================= */

const ticketItems = document.querySelectorAll(".ticket-card");

ticketItems.forEach((ticket) => {
  ticket.addEventListener("mouseenter", () => {
    ticket.classList.add("is-hovered");
  });

  ticket.addEventListener("mouseleave", () => {
    ticket.classList.remove("is-hovered");
  });

  ticket.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 768) {
      return;
    }

    const rect = ticket.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 35;
    const moveY = (y - centerY) / 35;

    const arrow = ticket.querySelector(".ticket-arrow");

    if (arrow) {
      arrow.style.transform = `translate(${moveX}px, ${moveY}px) rotate(45deg)`;
    }
  });

  ticket.addEventListener("mouseleave", () => {
    const arrow = ticket.querySelector(".ticket-arrow");

    if (arrow) {
      arrow.style.transform = "";
    }
  });
});

/* =========================
   TICKET MODAL
========================= */

const ticketModal = document.querySelector("#ticketModal");

const ticketModalOverlay = document.querySelector(".ticket-modal-overlay");

const ticketModalClose = document.querySelector(".ticket-modal-close");

const ticketModalAction = document.querySelector(".ticket-modal-action");

const modalTicketName = document.querySelector("#modalTicketName");

const modalTicketAccess = document.querySelector("#modalTicketAccess");

const modalTicketNumber = document.querySelector(".ticket-modal-number");

const modalTicketPrice = document.querySelector(".ticket-modal-price");

/* =========================
   OPEN TICKET MODAL
========================= */

function openTicketModal(ticket) {
  if (!ticketModal) {
    return;
  }

  const name = ticket.querySelector(".ticket-card-main h3");

  const access = ticket.querySelector(".ticket-card-main p");

  const number = ticket.querySelector(".ticket-number");

  const price = ticket.getAttribute("data-price");

  if (name && modalTicketName) {
    modalTicketName.textContent = name.textContent.trim().replace(/\s+/g, " ");
  }

  if (access && modalTicketAccess) {
    modalTicketAccess.textContent = access.textContent.trim().replace(/\s+/g, " ");
  }

  if (number && modalTicketNumber) {
    modalTicketNumber.textContent = number.textContent.trim();
  }

  if (modalTicketPrice) {
    modalTicketPrice.textContent = price || "PRICE TBA";
  }

  ticketModal.classList.add("active");

  document.body.style.overflow = "hidden";
}

/* =========================
   CLOSE TICKET MODAL
========================= */

function closeTicketModal() {
  if (!ticketModal) {
    return;
  }

  ticketModal.classList.remove("active");

  document.body.style.overflow = "";
}

/* =========================
   TICKET CLICK
========================= */

ticketItems.forEach((ticket) => {
  ticket.addEventListener("click", (event) => {
    event.preventDefault();
    openTicketModal(ticket);
  });
});

/* =========================
   TICKET CLOSE BUTTON
========================= */

if (ticketModalClose) {
  ticketModalClose.addEventListener("click", closeTicketModal);
}

/* =========================
   TICKET OVERLAY
========================= */

if (ticketModalOverlay) {
  ticketModalOverlay.addEventListener("click", closeTicketModal);
}

/* =========================
   TICKET MODAL ACTION
========================= */

if (ticketModalAction) {
  ticketModalAction.addEventListener("click", () => {
    closeTicketModal();

    const contact = document.querySelector("#contact");

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

/* =========================
   ARTIST MODAL
========================= */

const artistModal = document.getElementById("artistModal");

const artistModalOverlay = document.querySelector(".artist-modal-overlay");

const artistModalClose = document.querySelector(".artist-modal-close");

const modalArtistImage = document.getElementById("modalArtistImage");

const modalArtistNumber = document.getElementById("modalArtistNumber");

const modalArtistName = document.getElementById("modalArtistName");

const modalArtistStage = document.getElementById("modalArtistStage");

const modalArtistDate = document.getElementById("modalArtistDate");

const modalArtistTime = document.getElementById("modalArtistTime");

const artistItems = document.querySelectorAll(".artist, .lineup-featured");

/* =========================
   ARTIST DATA
========================= */

const artistData = {
  PERUNGGU: {
    number: "01",
    stage: "MAIN STAGE",
    date: "18 JULY 2027",
    time: "21:00 — 22:00",
    image: "Assets/perunggu.jpg",
  },

  HINDIA: {
    number: "02",
    stage: "MAIN STAGE",
    date: "18 JULY 2027",
    time: "19:00 — 20:00",
    image: "Assets/hindia.jpg",
  },

  "THE PANTURAS": {
    number: "03",
    stage: "MAIN STAGE",
    date: "18 JULY 2027",
    time: "18:00 — 19:00",
    image: "Assets/panturas.jpg",
  },

  MORFEM: {
    number: "04",
    stage: "COMMUNITY STAGE",
    date: "18 JULY 2027",
    time: "17:00 — 18:00",
    image: "Assets/morfem.jpg",
  },

  FOURTWNTY: {
    number: "05",
    stage: "MAIN STAGE",
    date: "18 JULY 2027",
    time: "20:30 — 21:30",
    image: "Assets/fourtwenty.jpg",
  },
};

/* =========================
   OPEN ARTIST MODAL
========================= */

artistItems.forEach((artist) => {
  artist.addEventListener("click", (event) => {
    event.preventDefault();

    const artistName = (artist.dataset.artist || "").trim();

    const artistStage = (artist.dataset.stage || "").trim();

    const artistDate = (artist.dataset.date || "").trim();

    const artistTime = (artist.dataset.time || "").trim();

    const artistImage = (artist.dataset.image || "").trim();

    if (modalArtistNumber) {
      modalArtistNumber.textContent = artist.querySelector(".artist-number")?.textContent.trim() || "";
    }

    if (modalArtistName) {
      modalArtistName.textContent = artistName.toUpperCase();

      if (artistName.toUpperCase() === "THE PANTURAS") {
        modalArtistName.classList.add("panturas-name");
      } else {
        modalArtistName.classList.remove("panturas-name");
      }
    }

    if (modalArtistStage) {
      modalArtistStage.textContent = artistStage.toUpperCase();
    }

    if (modalArtistDate) {
      modalArtistDate.textContent = artistDate;
    }

    if (modalArtistTime) {
      modalArtistTime.textContent = artistTime;
    }

    if (modalArtistImage && artistImage) {
      modalArtistImage.src = artistImage;
      modalArtistImage.alt = artistName;
    }

    if (artistModal) {
      artistModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

/* =========================
   CLOSE ARTIST MODAL
========================= */

function closeArtistModal() {
  if (!artistModal) {
    return;
  }

  artistModal.classList.remove("active");

  document.body.style.overflow = "";
}

/* =========================
   ARTIST CLOSE BUTTON
========================= */

if (artistModalClose) {
  artistModalClose.addEventListener("click", closeArtistModal);
}

/* =========================
   ARTIST OVERLAY
========================= */

if (artistModalOverlay) {
  artistModalOverlay.addEventListener("click", closeArtistModal);
}

/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTicketModal();
    closeArtistModal();
  }
});
