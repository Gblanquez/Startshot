//Swiper Carrousels
// DOM Elements
const slider = document.querySelector('.swiper.hero-launchdpad');
const slides = document.querySelectorAll('.swiper-slide.hero-launchdpad');
const sliderWrapper = document.querySelector('.swiper-wrapper.hero-launchdpad');
const arrowForward = document.querySelector('.arrow-forward'); // Forward button
const arrowBackward = document.querySelector('.arrow-backward'); // Backward button

// Variables
let currentIndex = Math.floor(slides.length / 2); // Start with the middle slide
const spaceBetweenVW = 1; // 1vw gap
const inactiveWidthVW = 23; // Smaller 23vw for non-active slides
const activeWidthVW = 30; // Keep 30vw for active slide
const offsetEdgeVW = 0.5; // Subtle 0.5vw offset on both sides

// Initialize Carousel
function initializeCarousel() {
  setSlideSizes(); // Set initial sizes for slides
  updatePosition(); // Center the initial slide with symmetrical offset
  setActiveSlide(); // Highlight the active slide

  // Add button click listeners
  arrowForward.addEventListener('click', nextSlide);
  arrowBackward.addEventListener('click', previousSlide);

  // Listen for window resize to maintain layout responsiveness
  window.addEventListener('resize', () => {
    setSlideSizes();
    updatePosition();
  });
}

// Set sizes dynamically for slides
function setSlideSizes() {
  slides.forEach((slide, index) => {
    const contentWrapper = slide.querySelector('.c-h-wrap');
    if (contentWrapper) {
      const isActive = index === currentIndex;
      contentWrapper.style.width = isActive ? `${activeWidthVW}vw` : `${inactiveWidthVW}vw`;
      contentWrapper.style.height = isActive ? `40vw` : `19vw`; // Example heights
    }
    slide.style.marginRight = `${spaceBetweenVW}vw`; // Add consistent spacing in vw
  });

  // Dynamically adjust the wrapper width to account for offsets
  const totalOffsetVW = 2 * offsetEdgeVW; // Left + Right offsets
  const totalWrapperWidthVW =
    slides.length * inactiveWidthVW + totalOffsetVW + slides.length * spaceBetweenVW;
  sliderWrapper.style.width = `calc(${totalWrapperWidthVW}vw)`; // Total width with spacing
}

// Update the position of the carousel
function updatePosition() {
  const spaceBetween = window.innerWidth * (spaceBetweenVW / 100); // Convert vw to px
  const inactiveWidth = window.innerWidth * (inactiveWidthVW / 100); // Convert vw to px
  const activeWidth = window.innerWidth * (activeWidthVW / 100); // Convert vw to px
  const offsetEdge = window.innerWidth * (offsetEdgeVW / 100); // Convert vw to px for symmetrical offsets

  const offset =
    -(inactiveWidth + spaceBetween) * currentIndex + // Offset for previous slides
    slider.offsetWidth / 2 - // Center of the slider container
    activeWidth / 2; // Center the active slide

  sliderWrapper.style.transform = `translateX(${offset}px)`;
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
  setActiveSlide(); // Update the active slide
}

// Highlight the active slide
function setActiveSlide() {
  slides.forEach((slide, index) => {
    const contentWrapper = slide.querySelector('.c-h-wrap');
    if (contentWrapper) {
      const isActive = index === currentIndex;
      contentWrapper.classList.toggle('is-active', isActive);
      contentWrapper.style.width = isActive ? `${activeWidthVW}vw` : `${inactiveWidthVW}vw`;
      contentWrapper.style.height = isActive ? `40vw` : `19vw`; // Update heights dynamically
    }
  });
}

// Move to the next slide
function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updatePosition();
  }
}

// Move to the previous slide
function previousSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosition();
  }
}

// Initialize everything
initializeCarousel();





//Invest Carrousel

// DOM Elements
const slidesInvest = document.querySelectorAll('.swiper-slide.is-invest');
const dotsInvest = document.querySelectorAll('.invest-swiper-dot'); // Dots
const investSection = document.querySelector('.invest-section'); // The section containing the slider

// Variables
let currentInvestIndex = 0; // Start with the first slide
const autoplayInterval = 6000; // 6 seconds
let autoplayTimer; // For storing the interval reference

// Initialize the GSAP autoplay slider
function initializeInvestSlider() {
  console.log("Slider Initialized");
  // Set up initial styles for all slides
  slidesInvest.forEach((slide, index) => {
    const contentWrapper = slide.querySelector('.invest-img-wrap');
    if (contentWrapper) {
      gsap.set(contentWrapper, {
        y: '110%', // Start below
        opacity: 0, // Hidden by default
        rotate: 25, // Rotate slightly for entrance animation
        scale: 0.94, // Scale down initially
        zIndex: -1, // Push inactive slides back
      });
    }
  });

  // Set up initial styles for dots
  dotsInvest.forEach((dot) => {
    const star = dot.querySelector('.star');
    if (star) {
      gsap.set(star, { opacity: 0, scale: 0 }); // Hidden and scaled down
    }
  });

  setActiveInvestSlide(); // Set the first active slide

  // Start autoplay
  autoplayTimer = setInterval(nextInvestSlide, autoplayInterval);
}

// Animate the active slide and corresponding dot
function setActiveInvestSlide() {
  slidesInvest.forEach((slide, index) => {
    const contentWrapper = slide.querySelector('.invest-img-wrap');
    if (contentWrapper) {
      if (index === currentInvestIndex) {
        // Animate the active slide into view
        gsap.to(contentWrapper, {
          y: '0%',
          opacity: 1,
          rotate: 0, // Reset rotation
          scale: 1, // Scale up to full size
          zIndex: 1, // Bring to front
          duration: 0.8,
          ease: 'power2.out',
        });
      } else {
        // Animate the inactive slides out of view
        gsap.to(contentWrapper, {
          y: '110%',
          opacity: 0,
          rotate: -25, // Rotate out of view
          scale: 0.94, // Scale down
          zIndex: -1, // Push back
          duration: 0.8,
          ease: 'power2.in',
        });
      }
    }
  });

  // Update dots and stars
  dotsInvest.forEach((dot, index) => {
    const star = dot.querySelector('.star');
    if (star) {
      if (index === currentInvestIndex) {
        // Animate active star (rotation over 6 seconds)
        gsap.to(star, {
          opacity: 1,
          scale: 1.5, // Grow active star
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(star, {
          rotation: 360, // Rotate 360 degrees
          duration: autoplayInterval / 1000, // Complete in 6 seconds
          ease: 'linear',
          repeat: -1, // Keep spinning
        });
      } else {
        // Animate inactive stars
        gsap.to(star, {
          opacity: 0,
          scale: 0, // Shrink inactive stars
          duration: 0.8,
          ease: 'power2.in',
        });
        gsap.killTweensOf(star, 'rotation'); // Stop rotation for inactive stars
        gsap.set(star, { rotation: 0 }); // Reset rotation for inactive stars
      }
    }
  });
}

// Move to the next slide
function nextInvestSlide() {
  currentInvestIndex = (currentInvestIndex + 1) % slidesInvest.length; // Loop back to the first slide
  setActiveInvestSlide(); // Update the active slide and dot
}

// Stop the slider (Clear Interval)
function stopInvestSlider() {
  console.log("Slider Stopped");
  clearInterval(autoplayTimer);
  autoplayTimer = null; // Ensure it's fully cleared
}

// Use ScrollTrigger to Start/Stop the Slider
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: investSection,
  start: "top top", // Start when the top of the section reaches the top of the viewport
  end: "bottom top", // End when the bottom of the section reaches the top of the viewport
  onEnter: () => {
    if (!autoplayTimer) {
      initializeInvestSlider(); // Start the slider when in view
    }
  },
  onLeave: () => {
    stopInvestSlider(); // Stop the slider when out of view
  },
  onEnterBack: () => {
    if (!autoplayTimer) {
      initializeInvestSlider(); // Restart the slider when scrolling back
    }
  },
  onLeaveBack: () => {
    stopInvestSlider(); // Stop the slider when leaving in reverse
  },
});