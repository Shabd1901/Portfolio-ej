// Main JavaScript for Shabdansh Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initTypewriter()
  initMarquee()
  initContactForm()
  initSmoothScrolling()
  initNavbarScroll()
  initProjectHovers()
  initPixelhackDemo()
})

// Typewriter Effect
function initTypewriter() {
  const typewriterElement = document.getElementById("typewriter")
  if (!typewriterElement) return

  const texts = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeSpeed = 100

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typeSpeed = 50
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typeSpeed = 100
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Marquee Controls
function initMarquee() {
  const marqueeContent = document.getElementById("marqueeContent")
  if (!marqueeContent) return

  const serviceItems = document.querySelectorAll(".service-item")

  serviceItems.forEach((item) => {
    // Pause on hover
    item.addEventListener("mouseenter", () => {
      marqueeContent.style.animationPlayState = "paused"
    })

    item.addEventListener("mouseleave", () => {
      marqueeContent.style.animationPlayState = "running"
    })

    // Pause on focus (keyboard navigation)
    item.addEventListener("focus", () => {
      marqueeContent.style.animationPlayState = "paused"
    })

    item.addEventListener("blur", () => {
      marqueeContent.style.animationPlayState = "running"
    })

    // Handle keyboard interaction
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        item.click()
      }
    })
  })
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.innerHTML

    // Check honeypot field
    if (formData.get("honeypot")) {
      showModal("errorModal")
      return
    }

    // Show loading state
    submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...'
    submitButton.disabled = true

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      })

      if (response.ok) {
        showModal("successModal")
        contactForm.reset()
      } else {
        throw new Error("Network response was not ok")
      }
    } catch (error) {
      console.error("Error:", error)
      showModal("errorModal")
    } finally {
      // Reset button state
      submitButton.innerHTML = originalText
      submitButton.disabled = false
    }
  })
}

// Pixelhack demo functionality
function initPixelhackDemo() {
  // Create demo modal if it doesn't exist
  if (!document.getElementById("pixelhackModal")) {
    const modalHTML = `
      <div class="modal fade" id="pixelhackModal" tabindex="-1" aria-labelledby="pixelhackModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header border-secondary">
              <h5 class="modal-title" id="pixelhackModalLabel">Pixelhack Interactive Demo</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div id="pixelhackCanvas" class="position-relative" style="height: 500px; background: linear-gradient(45deg, #1a1a2e, #16213e, #0f3460);">
                <canvas id="demoCanvas" width="800" height="500" class="w-100 h-100"></canvas>
                <div class="position-absolute top-50 start-50 translate-middle text-center">
                  <h3 class="mb-3">Interactive Web Demo</h3>
                  <p class="mb-4">Click and drag to create particles!</p>
                  <div class="demo-controls">
                    <button class="btn btn-primary me-2" onclick="toggleAnimation()">Toggle Animation</button>
                    <button class="btn btn-secondary" onclick="clearCanvas()">Clear Canvas</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer border-secondary">
              <small class="text-muted me-auto">Built with vanilla JavaScript and Canvas API</small>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `
    document.body.insertAdjacentHTML("beforeend", modalHTML)
  }
}

// Pixelhack demo functions
function openPixelhackDemo() {
  const modal = new window.bootstrap.Modal(document.getElementById("pixelhackModal"))
  modal.show()

  // Initialize canvas animation when modal opens
  setTimeout(() => {
    initCanvasDemo()
  }, 300)
}

function initCanvasDemo() {
  const canvas = document.getElementById("demoCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const particles = []
  let animationId
  let isAnimating = true

  // Set canvas size
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 4
      this.vy = (Math.random() - 0.5) * 4
      this.life = 1
      this.decay = Math.random() * 0.02 + 0.005
      this.size = Math.random() * 3 + 1
      this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.life -= this.decay
      this.size *= 0.99
    }

    draw() {
      ctx.save()
      ctx.globalAlpha = this.life
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(26, 26, 46, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.update()
      particle.draw()

      if (particle.life <= 0) {
        particles.splice(i, 1)
      }
    }

    if (isAnimating) {
      animationId = requestAnimationFrame(animate)
    }
  }

  // Mouse interaction
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(x, y))
    }
  })

  // Touch interaction
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault()
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(x, y))
    }
  })

  // Global functions for demo controls
  window.toggleAnimation = () => {
    isAnimating = !isAnimating
    if (isAnimating) {
      animate()
    }
  }

  window.clearCanvas = () => {
    particles.length = 0
    ctx.fillStyle = "rgba(26, 26, 46, 1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  animate()
}

// Modal Helper
function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    const bootstrapModal = new window.bootstrap.Modal(modal)
    bootstrapModal.show()
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const navbarToggler = document.querySelector(".navbar-toggler")
          navbarToggler.click()
        }
      }
    })
  })
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById("mainNav")
  if (!navbar) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Project Card Hover Effects
function initProjectHovers() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    // Touch support for mobile
    card.addEventListener("touchstart", function () {
      this.classList.add("touch-active")
    })

    card.addEventListener("touchend", function () {
      setTimeout(() => {
        this.classList.remove("touch-active")
      }, 300)
    })
  })
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".project-card, .skill-category, .stat-item")
  animateElements.forEach((el) => observer.observe(el))
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    .project-card,
    .skill-category,
    .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .touch-active .project-overlay {
        opacity: 1;
    }
    
    .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`
document.head.appendChild(style)

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
  // Handle scroll-based animations here if needed
}, 16) // ~60fps

window.addEventListener("scroll", debouncedScrollHandler)

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
  const element = document.querySelector(selector)
  if (element && typeof callback === "function") {
    callback(element)
  }
}

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
    const mainContent = document.querySelector("main") || document.querySelector("#home")
    if (mainContent) {
      mainContent.focus()
    }
  }
})

// Preload critical images
function preloadImages() {
  const criticalImages = [
    "/assets/images/hero-avatar.jpg",
    "/assets/images/psnotes-screenshot.jpg",
    "/assets/images/sharedbox-screenshot.jpg",
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading
preloadImages()
