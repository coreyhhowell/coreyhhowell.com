// This file contains all the interactive features for the website
// It runs when the page loads and adds things like smooth scrolling, animations, and hover effects

// Wait for the page to fully load before running any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // ===== SMOOTH SCROLLING FOR NAVIGATION =====
  // This makes the page scroll smoothly when you click on navigation links instead of jumping instantly

  // Find all links that start with # (like #contact, #about, etc.)
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // For each navigation link, add a click event listener
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent the default jump-to-section behavior
      e.preventDefault();

      // Get the target section ID from the link (like "#contact")
      const targetId = this.getAttribute("href");

      // Find the actual section element on the page
      const targetSection = document.querySelector(targetId);

      // If we found the section, scroll to it smoothly
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth", // Smooth scrolling instead of instant jump
          block: "start", // Align the section to the top of the viewport
        });
      }
    });
  });

  // ===== NAVBAR SCROLL EFFECT =====
  // This makes the navigation bar change appearance when you scroll down

  // Find the navigation bar element
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0; // Keep track of where we were last time

  // Listen for scroll events on the window
  window.addEventListener("scroll", function () {
    // Get how far we've scrolled from the top
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // If we've scrolled more than 100 pixels down
    if (scrollTop > 100) {
      // Make the navbar more solid and add a shadow
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      // Make the navbar more transparent and remove shadow when near the top
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }

    // Remember this scroll position for next time
    lastScrollTop = scrollTop;
  });

  // ===== FADE-IN ANIMATIONS =====
  // This makes elements fade in and slide up when they come into view

  // Set up the animation observer options
  const observerOptions = {
    threshold: 0.1, // Start animation when 10% of element is visible
    rootMargin: "0px 0px -50px 0px", // Start animation 50px before element comes into view
  };

  // Create an observer that watches for elements coming into view
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When element comes into view, make it fully visible and move it to normal position
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Find all elements that should animate in
  const animateElements = document.querySelectorAll(
    ".project-card, .section-title, .about-content, .contact-content"
  );

  // Set up each element to start invisible and moved down, then observe it
  animateElements.forEach((el) => {
    // Start with element invisible and moved down 30px
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";

    // Set up smooth transition for when we change these properties
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    // Start watching this element for when it comes into view
    observer.observe(el);
  });

  // ===== PROJECT CARD HOVER EFFECTS =====
  // This makes project cards lift up and get slightly bigger when you hover over them

  // Find all project card elements
  const projectCards = document.querySelectorAll(".project-card");

  // Add hover effects to each card
  projectCards.forEach((card) => {
    // When mouse enters the card
    card.addEventListener("mouseenter", function () {
      // Lift the card up 8px and make it 2% bigger
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    // When mouse leaves the card
    card.addEventListener("mouseleave", function () {
      // Return the card to normal position and size
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ===== CYCLING TITLES FOR HERO SUBTITLE =====
  // This cycles through different professional titles in the hero section

  const titles = [
    "multidisciplinary designer",
    "creative technologist",
    "UX designer",
    "documentarian",
    "3D modeler",
    "photographer",
    "video artist",
    "storyteller",
    "videographer",
    "futurist",
    "coffee enthusiast",
  ];

  let currentTitleIndex = 0;
  const cyclingTitleElement = document.getElementById("cycling-title");

  if (cyclingTitleElement) {
    // Function to type out the current title
    const typeTitle = (title, index = 0) => {
      if (index < title.length) {
        cyclingTitleElement.textContent = title.substring(0, index + 1);
        setTimeout(() => typeTitle(title, index + 1), 100);
      }
    };

    // Function to cycle to the next title
    const cycleTitle = () => {
      // Clear current text
      cyclingTitleElement.textContent = "";

      // Get next title
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      const nextTitle = titles[currentTitleIndex];

      // Type out the new title
      typeTitle(nextTitle);
    };

    // Set initial title and type it out
    cyclingTitleElement.textContent = "";
    typeTitle(titles[0]);

    // Start cycling titles every 4 seconds (allowing time for typing)
    setInterval(cycleTitle, 4000);
  }
});

// ===== PROJECT FILTERING SYSTEM =====
// This allows users to filter projects by category (All, Art, Design, etc.)
document.addEventListener("DOMContentLoaded", function () {
  // Find all the filter buttons and project cards
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card-full");

  // Add click listeners to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get which category this button filters for
      const filter = this.getAttribute("data-filter");

      // Remove 'active' class from all buttons and add it to the clicked one
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Go through each project card and show/hide based on filter
      projectCards.forEach((card) => {
        // Get the categories this project belongs to (can have multiple)
        const categories = card.getAttribute("data-category").split(" ");

        // If showing all projects OR this project matches the selected category
        if (filter === "all" || categories.includes(filter)) {
          // Show the card with a fade-in animation
          card.style.display = "block";
          card.style.animation = "fadeInUp 0.6s ease forwards";
        } else {
          // Hide the card
          card.style.display = "none";
        }
      });
    });
  });
});

// ===== FADE-IN ANIMATION DEFINITION =====
// This creates the CSS animation that makes filtered projects fade in from below
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;                    /* Start invisible */
      transform: translateY(30px);   /* Start 30px below final position */
    }
    to {
      opacity: 1;                    /* End fully visible */
      transform: translateY(0);      /* End at normal position */
    }
  }
`;
document.head.appendChild(style);

// ===== UTILITY FUNCTION: DEBOUNCING =====
// This prevents a function from running too many times in quick succession
// Useful for scroll events that fire constantly
// Not sure really how this works but it was recommended to me via Stack discussion
function debounce(func, wait) {
  let timeout; // Store the timeout ID

  // Return a new function that will be debounced
  return function executedFunction(...args) {
    // Function to run the actual function later
    const later = () => {
      clearTimeout(timeout); // Clear any existing timeout
      func(...args); // Run the function with its arguments
    };

    // Clear any existing timeout and set a new one
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
// This makes the hero section move at a different speed than the scroll
// Creates a depth effect where background moves slower than foreground
window.addEventListener(
  "scroll",
  debounce(function () {
    // Get how far we've scrolled
    const scrolled = window.pageYOffset;

    // Find the hero section
    const hero = document.querySelector(".hero");

    if (hero) {
      // Move the hero section at half the scroll speed (creates parallax effect)
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  }, 10) // Only run this function every 10ms maximum
);

// ===== P5.JS INTERACTIVE BACKGROUND =====
// This creates an animated bouncing square in the hero section
// P5.js is a creative coding library that makes it easy to create graphics and animations

// Variables to track the square's position and movement
let circleX, circleY; // Current position
let circleVX, circleVY; // Current velocity (speed and direction)
const circleSize = 40; // Size of the square

// Variables for interaction effects
let isHit = false; // Track if square was just hit
let hitTimer = 0; // Timer for hit effect
let hitColor = [251, 86, 7]; // Original orange color
let hitSize = circleSize; // Original size
let permanentSize = circleSize; // Track permanent size growth

// This function runs once when the page loads
function setup() {
  // Find the hero section and create a canvas that covers it
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    // Create a canvas that covers the entire window
    const canvas = createCanvas(windowWidth, windowHeight);

    // Put the canvas inside the hero section
    canvas.parent("hero-canvas-container");

    // Position the canvas absolutely so it sits behind the text
    canvas.style("position", "absolute");
    canvas.style("top", "0");
    canvas.style("left", "0");
    canvas.style("z-index", "0");

    // Start the square in the center of the screen
    circleX = width / 2;
    circleY = height / 2;

    // Give it random velocity (speed and direction)
    circleVX = random(-4, 4); // Random speed between -4 and 4 pixels per frame
    circleVY = random(-4, 4);
  }
}

// This function runs every frame (about 60 times per second)
function draw() {
  // Clear the background completely (no trails)
  background(255);

  // Move the square by adding velocity to position
  circleX += circleVX;
  circleY += circleVY;

  // Bounce off the left and right edges
  if (circleX <= permanentSize / 2 || circleX >= width - permanentSize / 2) {
    circleVX *= -1; // Reverse horizontal direction
  }

  // Bounce off the top and bottom edges
  if (circleY <= permanentSize / 2 || circleY >= height - permanentSize / 2) {
    circleVY *= -1; // Reverse vertical direction
  }

  // Keep the square within bounds (just in case)
  circleX = constrain(circleX, permanentSize / 2, width - permanentSize / 2);
  circleY = constrain(circleY, permanentSize / 2, height - permanentSize / 2);

  // Handle hit effects
  if (isHit && hitTimer > 0) {
    hitTimer--;
    if (hitTimer === 0) {
      isHit = false; // Reset hit state
    }
  }

  // Draw the square with hit effects
  noStroke(); // No outline

  // Change color and size when hit
  if (isHit) {
    // Flash between orange and white when hit
    if (hitTimer % 6 < 3) {
      fill(255, 255, 255); // White
    } else {
      fill(251, 86, 7); // Orange
    }
    // Make it bigger when hit (temporary effect)
    hitSize = permanentSize * 1.5;
  } else {
    fill(251, 86, 7); // Normal orange color
    hitSize = permanentSize; // Use permanent size
  }

  rectMode(CENTER); // Draw from center point
  rect(circleX, circleY, hitSize, hitSize); // Draw the square
}

// This function runs when you click the mouse
function mousePressed() {
  // Check if mouse click is within the square
  const d = dist(mouseX, mouseY, circleX, circleY);

  if (d < permanentSize / 2) {
    // Square was hit!
    isHit = true;
    hitTimer = 30; // Set timer for 30 frames (about 0.5 seconds)

    // Grow permanently by 5 pixels
    permanentSize += 5;

    // Change direction randomly
    circleVX = random(-6, 6);
    circleVY = random(-6, 6);

    // Make it bounce more dramatically
    circleVX *= 1.5;
    circleVY *= 1.5;
  }
}

// This function runs when the window is resized
// Makes sure the canvas and square stay properly positioned
function windowResized() {
  // Resize the canvas to match the new window size
  resizeCanvas(windowWidth, windowHeight);

  // Make sure the square is still within the new canvas bounds
  circleX = constrain(circleX, permanentSize / 2, width - permanentSize / 2);
  circleY = constrain(circleY, permanentSize / 2, height - permanentSize / 2);
}
