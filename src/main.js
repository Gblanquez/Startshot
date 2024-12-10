import './styles/style.css'
import SplitType from 'split-type'
import gsap from 'gsap'
import barba from '@barba/core';
import transition from './transition';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



//Navbar Hover Open Effect

const iconLink = document.querySelector('.l-icon-wrapper')
const icon = document.querySelector('.n-icon-holder')
const nBackground = document.querySelector('.g-n-bg')
const logoLink = document.querySelector('.l-icon-wrapper')



const menuWrap = document.querySelector('.menu-l-wrap');



document.addEventListener('DOMContentLoaded', () => {
  // Select necessary elements
  const menuWraps = document.querySelectorAll('.menu-l-wrap');
  const bgElements = document.querySelectorAll('.g-n-bg'); // Multiple background elements
  const splitInstances = []; // To store SplitType instances

  if (!menuWraps.length || !bgElements.length) {
    console.error('Required elements not found!');
    return;
  }

  // GSAP setup for initial states
  menuWraps.forEach((menuWrap) => {
    gsap.set(menuWrap, { width: '3.5vw' }); // Initial width for each menuWrap
  });

  bgElements.forEach((bgElement) => {
    gsap.set(bgElement, { width: '0vw', height: '100%' }); // Initial state for each g-n-bg
  });

  // Split text for all d-nav elements once and attach hover listeners for links
  document.querySelectorAll('.d-nav').forEach((dNav) => {
    const splitText = new SplitType(dNav, { types: 'chars' });
    splitInstances.push(splitText);

    const chars = splitText.chars;

    // Hover effect for individual links
    chars.forEach((char, index) => {
      char.addEventListener('mouseenter', () => {
        const targets = [
          chars[index - 1], // Previous letter
          char, // Current letter
          chars[index + 1], // Next letter
        ].filter(Boolean); // Filter out undefined entries

        gsap.to(targets, {
          opacity: 1,
          backgroundImage: "linear-gradient(90deg, #316194, #7399C0)", // Optional gradient for hover
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.05,
          onUpdate: () => {
            targets.forEach((el) => {
              el.style.webkitBackgroundClip = "text";
              el.style.webkitTextFillColor = "transparent";
            });
          },
        });
      });

      char.addEventListener('mouseleave', () => {
        const targets = [
          chars[index - 1],
          char,
          chars[index + 1],
        ].filter(Boolean);

        gsap.to(targets, {
          opacity: 0.8,
          backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff)", // Restore original gradient
          duration: 0.3,
          ease: 'power2.inOut',
          stagger: 0.05,
          onUpdate: () => {
            targets.forEach((el) => {
              el.style.webkitBackgroundClip = "text";
              el.style.webkitTextFillColor = "transparent";
            });
          },
        });
      });
    });
  });

  // Menu animations with hover
  menuWraps.forEach((menuWrap, index) => {
    const bgElement = bgElements[index]; // Match the g-n-bg with the menuWrap by index
    if (!bgElement) {
      console.warn(`No matching g-n-bg found for menuWrap at index ${index}`);
      return;
    }

    // Create a GSAP timeline for hover effects
    const menuHoverTimeline = gsap.timeline({ paused: true });

    // Animate the background width for the current bgElement
    menuHoverTimeline.to(bgElement, {
      width: '38vw', // Expand to 38vw
      duration: 1.2, // Animation duration
      ease: 'expo.out', // Smooth easing
    });

    // Animate the menu width for the current menuWrap
    menuHoverTimeline.to(
      menuWrap,
      {
        width: 'auto', // Expand to auto
        duration: 1.2,
        ease: 'expo.out',
      },
      '<' // Start with background animation
    );

    // Handle text animation for all `.d-nav` inside the current `menuWrap`
    const textElements = menuWrap.querySelectorAll('.d-nav'); // Target all d-nav in the current menuWrap
    textElements.forEach((textElement) => {
      const splitText = splitInstances.find(
        (instance) => instance.elements[0] === textElement
      ); // Reuse existing SplitType
      const chars = splitText.chars;

      menuHoverTimeline.fromTo(
        chars,
        { opacity: 0 }, // Start invisible
        {
          opacity: 1, // Fade in
          duration: 0.8, // Animation duration
          stagger: 0.05, // Stagger effect
          ease: 'power2.out',
        },
        '<' // Start alongside other animations
      );
    });

    // Attach hover event listeners for menu
    menuWrap.addEventListener('mouseenter', () => {
      menuHoverTimeline.play(); // Play the hover-in animation
    });

    menuWrap.addEventListener('mouseleave', () => {
      menuHoverTimeline.reverse(); // Reverse the animation on hover-out
    });
  });
});





//Navbar Hover End Effect


// NavLink Hover Effect

// const navlinks = document.querySelectorAll('.g-n-l-wrapper');


// navlinks.forEach(navlink => {

//   const dNav = navlink.querySelector('.d-nav');
//   if (!dNav) return;

//   const splitText = new SplitType(dNav, { types: 'chars' });
//   const chars = splitText.chars;

//   chars.forEach((char, index) => {
//     char.addEventListener('mouseenter', () => {

//       const targets = [
//         chars[index - 1],
//         char,            
//         chars[index + 1] 
//       ].filter(Boolean); 

//       gsap.to(targets, {
//         backgroundImage: "linear-gradient(90deg, #316194, #7399C0)", // Hover gradient
//         duration: 0.3,
//         ease: 'power2.out',
//         stagger: 0.05,
//         onUpdate: () => {
//           targets.forEach(el => {
//             el.style.webkitBackgroundClip = "text";
//             el.style.webkitTextFillColor = "transparent";
//           });
//         }
//       });
//     });

//     char.addEventListener('mouseleave', () => {

//       const targets = [
//         chars[index - 1], 
//         char,             
//         chars[index + 1]  
//       ].filter(Boolean);  


//       gsap.to(targets, {
//         backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff)", 
//         duration: 0.3,
//         ease: 'power2.inOut',
//         stagger: 0.05,
//         onUpdate: () => {
//           targets.forEach(el => {
//             el.style.webkitBackgroundClip = "text";
//             el.style.webkitTextFillColor = "transparent"; 
//           });
//         },
//         onComplete: () => {

//           gsap.to(targets, {
//             backgroundImage: "none",                      
//             duration: 0.3,                                
//             ease: 'power2.inOut',                          
//             onUpdate: () => {
//               targets.forEach(el => {
//                 el.style.webkitTextFillColor = "#FFFFFF";  
//               });
//             }
//           });
//         }
//       });
//     });
//   });
// });
//NavLink Hover Effect End




//Footer Links Hover Effect

const footerLinks = document.querySelectorAll('.f-link');

footerLinks.forEach(footerLink => {
  const fNav = footerLink.querySelector('.f-nav');
  if (!fNav) return;

  // Split the text into characters using SplitType
  const splitText = new SplitType(fNav, { types: 'chars' });
  const chars = splitText.chars;

  // Apply text-transform directly to each character after split
  chars.forEach(char => {
    // Apply the same text-transform as the parent, e.g., capitalize
    char.style.textTransform = "none";  // or "inherit", depending on your design
  });

  // Event listeners for mouseenter and mouseleave
  chars.forEach((char, index) => {
    char.addEventListener('mouseenter', () => {
      const targets = [
        chars[index - 1], 
        char,             
        chars[index + 1]  
      ].filter(Boolean); // Filter out undefined values

      gsap.to(targets, {
        backgroundImage: "linear-gradient(90deg, #06072A, #7399C0)",
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05,
        onUpdate: () => {
          targets.forEach(el => {
            el.style.webkitBackgroundClip = "text";
            el.style.webkitTextFillColor = "transparent";
          });
        }
      });
    });

    char.addEventListener('mouseleave', () => {
      const targets = [
        chars[index - 1], 
        char,            
        chars[index + 1]
      ].filter(Boolean);

      gsap.to(targets, {
        backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff)",
        duration: 0.3,
        ease: 'power2.inOut',
        stagger: 0.05,
        onUpdate: () => {
          targets.forEach(el => {
            el.style.webkitBackgroundClip = "text";
            el.style.webkitTextFillColor = "transparent";
          });
        },
        onComplete: () => {
          gsap.to(targets, {
            backgroundImage: "none",
            duration: 0.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              targets.forEach(el => {
                el.style.webkitTextFillColor = "#FFFFFF";
              });
            }
          });
        }
      });
    });
  });
});

//Footer Links Hover Effect End


// const transitions = new transition()

const setVw = () => {
    // Set --vw to 1% of the current viewport width in pixels
    document.documentElement.style.setProperty('--vw', `${window.innerWidth / 100}px`);

        // Set --mvw to 1% of the current viewport width in pixels for mobile
        document.documentElement.style.setProperty('--mvw', `${window.innerWidth / 100}px`);
};

// Set the initial value of --vw
setVw();

// Update --vw on window resize
window.addEventListener('resize', setVw);





//Button Hover

document.addEventListener('DOMContentLoaded', () => {
  // Select all buttons with the class "g-button"
  const buttons = document.querySelectorAll('.g-button');

  if (!buttons.length) {
    console.error('No buttons with class .g-button found!');
    return;
  }

  // Loop through each button and attach hover animations
  buttons.forEach((button) => {
    // Target the SVGs and their paths
    const svg1 = button.querySelector('.bttn-arrow');
    const svg2 = button.querySelector('.bttn-arrow-2');
    const path1 = svg1?.querySelector('path');
    const path2 = svg2?.querySelector('path');

    if (!svg1 || !path1 || !svg2 || !path2) {
      console.warn('SVGs or paths not found inside g-button:', button);
      return;
    }

    // Mouse enter animation
    button.addEventListener('mouseenter', () => {
      const timeline = gsap.timeline();

      // First SVG - Shrink all lines and move from -3vw to 3vw
      timeline
        .to(path1, {
          attr: {
            d: `M11 6L11 6M11 6L11 6M11 6H11`, // All lines shrink to the center
          },
          duration: 0.5,
          ease: 'power2.out',
        })
        .fromTo(
          svg1,
          { x: '-3vw' }, // Start from -3vw
          { x: '3vw', duration: 0.5, ease: 'power2.out' },
          '-=0.4' // Slight overlap for smooth transition
        );

      // Second SVG - Start from -3vw, grow lines
      timeline.fromTo(
        svg2,
        { x: '-3vw' }, // Start from -3vw
        { x: '0vw', duration: 0.5, ease: 'power2.out' },
        '-=0.3' // Start slightly after the first SVG moves
      );

      // Second SVG - Grow the horizontal line first, then the diagonal lines
      timeline.to(
        path2,
        {
          attr: {
            d: `M11 6L11 6M11 6L11 6M11 6H1`, // Grow horizontal line first
          },
          duration: 0.3,
          ease: 'power2.out',
        },
        '<' // Start immediately after the second SVG moves
      );

      timeline.to(
        path2,
        {
          attr: {
            d: 'M11 6L6.2381 1M11 6L6.2381 11M11 6H1', // Grow diagonal lines
          },
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.2' // Slight overlap with the horizontal line animation
      );
    });

    // Mouse leave animation
    button.addEventListener('mouseleave', () => {
      const timeline = gsap.timeline();

      // Second SVG - Shrink all lines and move to 3vw
      timeline
        .to(path2, {
          attr: {
            d: `M11 6L11 6M11 6L11 6M11 6H11`, // Shrink all lines to the center
          },
          duration: 0.5,
          ease: 'power2.out',
        })
        .fromTo(
          svg2,
          { x: '0vw' }, // Start from 0vw
          { x: '3vw', duration: 0.5, ease: 'power2.out' },
          '-=0.4' // Slight overlap for smooth transition
        );

      // First SVG - Move from -3vw, grow lines
      timeline.fromTo(
        svg1,
        { x: '-3vw' }, // Start from -3vw
        { x: '0vw', duration: 0.5, ease: 'power2.out' },
        '-=0.3' // Start slightly after the second SVG moves
      );

      // First SVG - Grow the horizontal line first, then the diagonal lines
      timeline.to(
        path1,
        {
          attr: {
            d: `M11 6L11 6M11 6L11 6M11 6H1`, // Grow horizontal line first
          },
          duration: 0.3,
          ease: 'power2.out',
        },
        '<' // Start immediately after the first SVG moves
      );

      timeline.to(
        path1,
        {
          attr: {
            d: 'M11 6L6.2381 1M11 6L6.2381 11M11 6H1', // Grow diagonal lines
          },
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.2' // Slight overlap with the horizontal line animation
      );
    });
  });
});



//Slider Animations


//Swiper Carrousels
// DOM Elements
const slider = document.querySelector('.swiper.hero-launchdpad');
const slides = document.querySelectorAll('.swiper-slide.hero-launchdpad');
const sliderWrapper = document.querySelector('.swiper-wrapper.hero-launchdpad');
const arrowForward = document.querySelector('.arrow-forward'); // Forward button
const arrowBackward = document.querySelector('.arrow-backward'); // Backward button
const paginationDots = document.querySelectorAll('.pag-dot'); // Pagination dots

// Desktop Variables
let currentIndex = Math.floor(slides.length / 2); // Start with the middle slide
const spaceBetweenVW = 1; // 1vw gap
const inactiveWidthVW = 23; // Smaller 23vw for non-active slides
const activeWidthVW = 30; // Keep 30vw for active slide
const activeMarginVW = 5; // 5vw margin for active slide (left and right)
const offsetEdgeVW = 0.5; // Subtle 0.5vw offset on both sides

// Mobile Variables
let mobileCurrentIndex = Math.floor(slides.length / 2); // Start with the middle slide
const mobileSlideWidthVW = 100; // 90vw for each slide on mobile
const mobileSlideHeightVW = 120; // 96vw height for each slide on mobile

// Initialize Carousel
function initializeCarousel() {
  if (window.matchMedia("(max-width: 479px)").matches) {
    initializeMobileCarousel();
  } else {
    initializeDesktopCarousel();
  }

  // Listen for window resize to switch between desktop and mobile
  window.addEventListener('resize', () => {
    if (window.matchMedia("(max-width: 479px)").matches) {
      initializeMobileCarousel();
    } else {
      initializeDesktopCarousel();
    }
  });
}

// Initialize Desktop Carousel
function initializeDesktopCarousel() {
  setSlideSizes(); // Set initial sizes for slides
  updatePosition(); // Center the initial slide with symmetrical offset
  setActiveSlide(); // Highlight the active slide

  // Add button click listeners
  arrowForward.addEventListener('click', nextSlide);
  arrowBackward.addEventListener('click', previousSlide);

  // Add click listeners to pagination dots
  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index; // Set currentIndex to the clicked dot's index
      updatePosition(); // Update the carousel position
    });
  });
}

// Initialize Mobile Carousel
function initializeMobileCarousel() {
  setMobileSlideSizes();
  updateMobilePosition();
  setActiveSlide();

  // Add button click listeners
  arrowForward.addEventListener('click', nextMobileSlide);
  arrowBackward.addEventListener('click', previousMobileSlide);

  // Add click listeners to pagination dots
  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      mobileCurrentIndex = index;
      updateMobilePosition();
    });
  });
}

// Set sizes dynamically for slides (Desktop)
function setSlideSizes() {
  slides.forEach((slide, index) => {
    const contentWrapper = slide.querySelector('.c-h-wrap');
    if (contentWrapper) {
      const isActive = index === currentIndex;
      const totalActiveWidthVW = activeWidthVW;
      contentWrapper.style.width = isActive ? `${totalActiveWidthVW}vw` : `${inactiveWidthVW}vw`;
      contentWrapper.style.height = isActive ? `40vw` : `19vw`;
      contentWrapper.style.margin = isActive ? `0 ${activeMarginVW}vw` : '0';
    }
    slide.style.marginRight = `${spaceBetweenVW}vw`;
  });

  const totalOffsetVW = 2 * offsetEdgeVW;
  const totalWrapperWidthVW =
    slides.length * inactiveWidthVW + totalOffsetVW + slides.length * spaceBetweenVW;
  sliderWrapper.style.width = `calc(${totalWrapperWidthVW}vw)`;
}

// Set sizes dynamically for slides (Mobile)
function setMobileSlideSizes() {
  slides.forEach((slide) => {
    const contentWrapper = slide.querySelector('.c-h-wrap');
    if (contentWrapper) {
      contentWrapper.style.width = `${mobileSlideWidthVW}vw`; // Uniform width for each slide
      contentWrapper.style.height = `${mobileSlideHeightVW}vw`; // Uniform height for each slide
      contentWrapper.style.margin = '0'; // No margin
    }
    slide.style.marginRight = '0'; // No space between slides
  });

  sliderWrapper.style.width = `${slides.length * mobileSlideWidthVW}vw`; // Total width for all slides
}

// Update the position of the carousel (Desktop)
function updatePosition() {
  const spaceBetween = window.innerWidth * (spaceBetweenVW / 100);
  const inactiveWidth = window.innerWidth * (inactiveWidthVW / 100);
  const activeWidth = window.innerWidth * (activeWidthVW / 100);
  const activeMargin = window.innerWidth * (activeMarginVW / 100);
  const offsetEdge = window.innerWidth * (offsetEdgeVW / 100);

  const offset =
    -(inactiveWidth + spaceBetween) * currentIndex +
    slider.offsetWidth / 2 -
    (activeWidth + 2 * activeMargin) / 2;

  sliderWrapper.style.transform = `translateX(${offset}px)`;
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
  setActiveSlide();
}

// Update the position of the carousel (Mobile)
function updateMobilePosition() {
  const offset = -mobileCurrentIndex * window.innerWidth;
  sliderWrapper.style.transform = `translateX(${offset}px)`;
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
  setActiveSlide();
}

// Highlight the active slide and update pagination dots
function setActiveSlide() {
  slides.forEach((slide, index) => {
    const contentWrapper = slide.querySelector('.c-h-wrap');
    const content = slide.querySelector('.c-h-content');
    if (contentWrapper) {
      const isActive = index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex);
      contentWrapper.classList.toggle('is-active', isActive);
      
      // Apply mobile styles if in mobile view
      if (window.matchMedia("(max-width: 479px)").matches) {
        contentWrapper.style.width = `${mobileSlideWidthVW}vw`;
        contentWrapper.style.height = `${mobileSlideHeightVW}vw`;
        contentWrapper.style.margin = '0';
      } else {
        contentWrapper.style.width = isActive ? `${activeWidthVW}vw` : `${inactiveWidthVW}vw`;
        contentWrapper.style.height = isActive ? `40vw` : `19vw`;
        contentWrapper.style.margin = isActive ? `0 ${activeMarginVW}vw` : '0';
      }

      if (content) {
        content.classList.toggle('is-active', isActive);
      }
    }
  });

  paginationDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex));
  });
}

// Move to the next slide (Desktop)
function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updatePosition();
  }
}

// Move to the previous slide (Desktop)
function previousSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosition();
  }
}

// Move to the next slide (Mobile)
function nextMobileSlide() {
  if (mobileCurrentIndex < slides.length - 1) {
    mobileCurrentIndex++;
    updateMobilePosition();
  }
}

// Move to the previous slide (Mobile)
function previousMobileSlide() {
  if (mobileCurrentIndex > 0) {
    mobileCurrentIndex--;
    updateMobilePosition();
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
const autoplayInterval = 5000; // 6 seconds
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
        x: '110%',
        scale: 0.8,
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
          x: '0%',
          opacity: 1,
          rotate: 0, // Reset rotation
          scale: 1, // Scale up to full size
          zIndex: 1, // Bring to front
          duration: 1.6,
          ease: 'expo.out',
        });
      } else {
        // Animate the inactive slides out of view
        gsap.to(contentWrapper, {
          y: '110%',
          x: '110%',
          opacity: 0,
          rotate: -25, // Rotate out of view
          scale: 0.8, // Scale down
          zIndex: -1, // Push back
          duration: 1.6,
          ease: 'expo.out',
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

// Add event listeners to dots for manual navigation
dotsInvest.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentInvestIndex = index; // Set current index to the clicked dot's index
    setActiveInvestSlide(); // Update the active slide and dot
    stopInvestSlider(); // Stop the current autoplay
    autoplayTimer = setInterval(nextInvestSlide, autoplayInterval); // Restart autoplay
  });
});

// Initialize the slider immediately
initializeInvestSlider();









 




