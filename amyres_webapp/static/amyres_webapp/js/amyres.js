// Enhanced AMYRES JavaScript - Integrating existing functionality with new features

// Global variables
const currentIndex = 0
const carouselIndices = new Map()
let currentSlideIndex = 0
let autoPlayInterval

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initCarousel()
  initMobileNav()
  initSmoothScrolling()
  initScrollAnimations()
  initTestimonialCarousel()
  initFAQ()
})

// Show specific slide
function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-item")
  const indicators = document.querySelectorAll(".indicator")

  if (slides.length === 0) return

  // Remove active class from all slides and indicators
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Add active class to current slide and indicator
  if (slides[index]) {
    slides[index].classList.add("active")
  }
  if (indicators[index]) {
    indicators[index].classList.add("active")
  }

  currentSlideIndex = index
}

// Move to next/previous slide (enhanced version of your original moveSlide)
function moveSlide(direction) {
  const slides = document.querySelectorAll(".carousel-item")
  const totalSlides = slides.length

  if (totalSlides === 0) return

  currentSlideIndex += direction

  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1
  }

  showSlide(currentSlideIndex)
  resetAutoPlay()
}



// Your original moveCarousel function for multiple carousels
function moveCarousel(direction, carouselIndex) {
  const carousels = document.querySelectorAll(".carousel")
  const carousel = carousels[carouselIndex]
  if (!carousel) return

  if (!carouselIndices.has(carouselIndex)) {
    carouselIndices.set(carouselIndex, 0)
  }

  let currentIndex = carouselIndices.get(carouselIndex)
  const items = carousel.children

  currentIndex = (currentIndex + direction + items.length) % items.length

  carouselIndices.set(carouselIndex, currentIndex)

  carousel.style.transform = `translateX(-${currentIndex * 100}%)`
}

// Auto-play functionality
function startAutoPlay() {
  const slides = document.querySelectorAll(".carousel-item")
  if (slides.length === 0) return

  autoPlayInterval = setInterval(() => {
    moveSlide(1)
  }, 5000) // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval)
}

function resetAutoPlay() {
  stopAutoPlay()
  startAutoPlay()
}

// Keyboard navigation
function handleKeyboardNavigation(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveSlide(-1)
      break
    case "ArrowRight":
      moveSlide(1)
      break
    case "Escape":
      stopAutoPlay()
      break
  }
}

// Mobile navigation toggle
function initMobileNav() {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector("nav ul")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    })
  }
}

// Your original testimonial carousel functionality
function initTestimonialCarousel() {
  let carouselIndex = 0
  const testimonials = document.querySelectorAll(".testimonial")
  const totalTestimonials = testimonials.length

  if (totalTestimonials === 0) return

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? "block" : "none"
    })
  }

  function nextTestimonial() {
    carouselIndex = (carouselIndex + 1) % totalTestimonials
    showTestimonial(carouselIndex)
  }

  function prevTestimonial() {
    carouselIndex = (carouselIndex - 1 + totalTestimonials) % totalTestimonials
    showTestimonial(carouselIndex)
  }

  showTestimonial(carouselIndex) // Show the first testimonial

  // Automatically cycle testimonials
  setInterval(nextTestimonial, 5000) // Change every 5 seconds

  // Make functions globally available
  window.nextTestimonial = nextTestimonial
  window.prevTestimonial = prevTestimonial
}

// Your original FAQ Accordion functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.querySelector("p")
      if (answer) {
        const isOpen = answer.style.display === "block"
        answer.style.display = isOpen ? "none" : "block"
      }
    })
  })
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe stat items
  const statItems = document.querySelectorAll(".stat-item")
  statItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })
}

// Your original utility functions
function downloadFile(file) {
  const link = document.createElement("a")
  link.href = file
  link.download = file.split("/").pop()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function submitContactForm() {
  const form = document.getElementById("contactForm")
  if (form) {
    form.submit()
  }
}


function submitservicerequest() {
  const form = document.getElementById("servicerequest")
  if (form) {
    form.submit()
  }
}

// Your original readMore function for news items
function readMore(id) {
  const element = document.getElementById(id)
  if (element) {
    if (element.style.display === "none") {
      element.style.display = "block"
    } else {
      element.style.display = "none"
    }
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  const navMenu = document.querySelector("nav ul")
  const navToggle = document.querySelector(".nav-toggle")

  if (window.innerWidth > 768) {
    if (navMenu) navMenu.classList.remove("active")
    if (navToggle) navToggle.classList.remove("active")
  }
})

// Performance optimization: Preload next image
function preloadNextImage() {
  const slides = document.querySelectorAll(".carousel-item")
  if (slides.length === 0) return

  const nextIndex = (currentSlideIndex + 1) % slides.length
  const nextSlide = slides[nextIndex]
  if (nextSlide) {
    const img = nextSlide.querySelector("img")
    if (img && !img.complete) {
      const preloadImg = new Image()
      preloadImg.src = img.src
    }
  }
}

// Call preload function periodically
setInterval(preloadNextImage, 3000)

// Auto-slide function for carousel (your original)
setInterval(() => {
  moveCarousel(1, 0)
}, 5000) // Change every 5 seconds

// Make functions globally available for HTML onclick handlers
window.moveSlide = moveSlide
window.currentSlide = currentSlide
window.moveCarousel = moveCarousel
window.downloadFile = downloadFile
window.submitContactForm = submitContactForm
window.triggerLogin = triggerLogin
window.triggerDownload = triggerDownload
window.submitservicerequest = submitservicerequest
window.readMore = readMore


// Initialize carousel on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});

function initCarousel() {
  const slides = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");

  if (slides.length === 0) return;

  showSlide(currentSlideIndex);
  startAutoPlay();

  document.addEventListener("keydown", handleKeyboardNavigation);

  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");

  slides.forEach(slide => slide.classList.remove("active"));
  indicators.forEach(indicator => indicator.classList.remove("active"));

  if (slides[index]) slides[index].classList.add("active");
  if (indicators[index]) indicators[index].classList.add("active");

  currentSlideIndex = index;
}

function moveSlide(direction) {
  const slides = document.querySelectorAll(".carousel-item");
  if (slides.length === 0) return;

  currentSlideIndex += direction;
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
  else if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

  showSlide(currentSlideIndex);
  resetAutoPlay();
}

function currentSlide(index) {
  showSlide(index - 1);
  resetAutoPlay();
}

function handleKeyboardNavigation(event) {
  switch (event.key) {
    case "ArrowLeft": moveSlide(-1); break;
    case "ArrowRight": moveSlide(1); break;
    case "Escape": stopAutoPlay(); break;
  }
}

function startAutoPlay() {
  const slides = document.querySelectorAll(".carousel-item");
  if (slides.length === 0) return;

  autoPlayInterval = setInterval(() => {
    moveSlide(1);
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

function triggerLogin() {
  const form = document.getElementById("loginForm");
  if (form) form.submit();
}

function triggerDownload() {
  const form = document.getElementById("downloadForm");
  if (form) form.submit();
}

window.moveSlide = moveSlide;
window.currentSlide = currentSlide;
window.triggerLogin = triggerLogin;
window.triggerDownload = triggerDownload;

