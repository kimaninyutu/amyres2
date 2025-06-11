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
  initAccessibilityFeatures()
  initSocialMediaLinks()
})

// Social Media Sharing Functions
function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent("AMYRES AGTECH - Your Research, Innovation and Development Partner")
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`
  openShareWindow(shareUrl, "Facebook")
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(
    "Check out AMYRES AGTECH - Empowering Farmers & Agribusinesses with Research-Driven Solutions for Sustainable Agriculture in Kenya.",
  )
  const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=AgTech,Kenya,Agriculture,Innovation`
  openShareWindow(shareUrl, "Twitter")
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent("AMYRES AGTECH - Agricultural Innovation Through Research")
  const summary = encodeURIComponent(
    "Leading agricultural innovation through research, technology, and sustainable practices in Kenya.",
  )
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`
  openShareWindow(shareUrl, "LinkedIn")
}

function shareOnWhatsApp() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(
    "Check out AMYRES AGTECH - Your Research, Innovation and Development Partner for Sustainable Agriculture in Kenya: ",
  )
  const shareUrl = `https://wa.me/?text=${text}${url}`
  openShareWindow(shareUrl, "WhatsApp")
}

function shareOnTelegram() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(
    "Check out AMYRES AGTECH - Your Research, Innovation and Development Partner for Sustainable Agriculture in Kenya: ",
  )
  const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`
  openShareWindow(shareUrl, "Telegram")
}

function openShareWindow(url, platform) {
  const width = 600
  const height = 400
  const left = (window.innerWidth - width) / 2
  const top = (window.innerHeight - height) / 2

  window.open(
    url,
    `share${platform}`,
    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
  )

  // Analytics tracking (if you have analytics setup)
  if (typeof gtag !== "undefined") {
    gtag("event", "share", {
      method: platform.toLowerCase(),
      content_type: "website",
      content_id: window.location.pathname,
    })
  }
}

// Enhanced Accessibility Features
function initAccessibilityFeatures() {
  // Add keyboard navigation for social sharing buttons
  const shareButtons = document.querySelectorAll(".share-btn")
  shareButtons.forEach((button) => {
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        button.click()
      }
    })
  })

  // Add keyboard navigation for contact items
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    const link = item.querySelector("a")
    if (link) {
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          link.click()
        }
      })

      // Make contact items focusable
      item.setAttribute("tabindex", "0")
      item.setAttribute("role", "button")
    }
  })

  // Enhanced focus management
  document.addEventListener("keydown", (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === "m") {
      e.preventDefault()
      const mainContent = document.querySelector(".main-content")
      if (mainContent) {
        mainContent.focus()
        mainContent.scrollIntoView({ behavior: "smooth" })
      }
    }

    // Skip to navigation with Alt+N
    if (e.altKey && e.key === "n") {
      e.preventDefault()
      const nav = document.querySelector("nav")
      if (nav) {
        const firstLink = nav.querySelector("a")
        if (firstLink) {
          firstLink.focus()
        }
      }
    }
  })
}

// Enhanced Contact Item Interactions
function initContactInteractions() {
  const contactItems = document.querySelectorAll(".contact-item")

  contactItems.forEach((item) => {
    const link = item.querySelector("a")
    if (link) {
      // Add click handler to the entire contact item
      item.addEventListener("click", (e) => {
        if (
          e.target === item ||
          e.target === item.querySelector("i") ||
          e.target === item.querySelector(".contact-label")
        ) {
          link.click()
        }
      })

      // Add hover sound effect (optional)
      item.addEventListener("mouseenter", () => {
        // You can add a subtle sound effect here if desired
        item.style.cursor = "pointer"
      })

      // Add visual feedback for successful interaction
      link.addEventListener("click", () => {
        showNotification(`Opening ${link.getAttribute("aria-label")}...`)
      })
    }
  })
}

// Notification system for user feedback
function showNotification(message, type = "info", duration = 3000) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#7ed957" : type === "error" ? "#e74c3c" : "#004aad"};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, duration)
}

// Show specific slide
function showSlideImpl(index) {
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
function moveSlideImpl(direction) {
  const slides = document.querySelectorAll(".carousel-item")
  const totalSlides = slides.length

  if (totalSlides === 0) return

  currentSlideIndex += direction

  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1
  }

  showSlideImpl(currentSlideIndex)
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
    moveSlideImpl(1)
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
function handleKeyboardNavigationImpl(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveSlideImpl(-1)
      break
    case "ArrowRight":
      moveSlideImpl(1)
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

      // Update ARIA attributes for accessibility
      const isExpanded = navMenu.classList.contains("active")
      navToggle.setAttribute("aria-expanded", isExpanded)
      navMenu.setAttribute("aria-hidden", !isExpanded)
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        navToggle.setAttribute("aria-expanded", "false")
        navMenu.setAttribute("aria-hidden", "true")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        navToggle.setAttribute("aria-expanded", "false")
        navMenu.setAttribute("aria-hidden", "true")
      }
    })

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        navToggle.setAttribute("aria-expanded", "false")
        navMenu.setAttribute("aria-hidden", "true")
        navToggle.focus()
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

        // Update ARIA attributes
        item.setAttribute("aria-expanded", !isOpen)
      }
    })

    // Add keyboard support
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        item.click()
      }
    })

    // Make FAQ items focusable
    item.setAttribute("tabindex", "0")
    item.setAttribute("role", "button")
    item.setAttribute("aria-expanded", "false")
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

        // Focus the target element for accessibility
        targetElement.setAttribute("tabindex", "-1")
        targetElement.focus()
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

  showNotification("Download started!", "success")
}

function submitContactForm() {
  const form = document.getElementById("contactForm")
  if (form) {
    form.submit()
    showNotification("Form submitted successfully!", "success")
  }
}

function submitservicerequest() {
  const form = document.getElementById("servicerequest")
  if (form) {
    form.submit()
    showNotification("Service request submitted!", "success")
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
    if (navMenu) {
      navMenu.classList.remove("active")
      navMenu.setAttribute("aria-hidden", "true")
    }
    if (navToggle) {
      navToggle.classList.remove("active")
      navToggle.setAttribute("aria-expanded", "false")
    }
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

// Initialize contact interactions
document.addEventListener("DOMContentLoaded", () => {
  initContactInteractions()
})

// Make functions globally available for HTML onclick handlers
window.moveSlide = moveSlideImpl
window.currentSlide = currentSlide
window.moveCarousel = moveCarousel
window.downloadFile = downloadFile
window.submitContactForm = submitContactForm
window.triggerLogin = triggerLogin
window.triggerDownload = triggerDownload
window.submitservicerequest = submitservicerequest
window.readMore = readMore
window.shareOnFacebook = shareOnFacebook
window.shareOnTwitter = shareOnTwitter
window.shareOnLinkedIn = shareOnLinkedIn
window.shareOnWhatsApp = shareOnWhatsApp
window.shareOnTelegram = shareOnTelegram

// Initialize carousel on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initCarousel()
})

function initCarousel() {
  const slides = document.querySelectorAll(".carousel-item")
  const indicators = document.querySelectorAll(".indicator")

  if (slides.length === 0) return

  showSlideImpl(currentSlideIndex)
  startAutoPlay()

  document.addEventListener("keydown", handleKeyboardNavigationImpl)

  const carouselContainer = document.querySelector(".carousel-container")
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopAutoPlay)
    carouselContainer.addEventListener("mouseleave", startAutoPlay)
  }
}

function currentSlide(index) {
  showSlideImpl(index - 1)
  resetAutoPlay()
}

function triggerLogin() {
  const form = document.getElementById("loginForm")
  if (form) form.submit()
}

function triggerDownload() {
  const form = document.getElementById("downloadForm")
  if (form) form.submit()
}

// Enhanced social media link handling
function initSocialMediaLinks() {
  const socialLinks = document.querySelectorAll(".social-link")

  socialLinks.forEach((link) => {
    // Ensure links are properly clickable
    link.addEventListener("click", function (e) {
      // Don't prevent default for actual links
      console.log("Social link clicked:", this.href)

      // Add visual feedback
      this.style.transform = "translateY(-2px) scale(1.05)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })

    // Add keyboard support
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })

    // Add touch support for mobile
    link.addEventListener("touchstart", function (e) {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    link.addEventListener("touchend", function (e) {
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })
}

// Initialize social media links when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initSocialMediaLinks()
})

// Declare gtag to prevent linting error
let gtag
