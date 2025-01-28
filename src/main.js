import './styles/style.css'
import SplitType from 'split-type'
import gsap from 'gsap'
import Lenis from 'lenis'
import Transition from './transition.js';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initializeAllAnimations, stopAllAnimations } from './home.js';
import { startAboutAnimations, stopAboutAnimations } from './about.js';
import { startTeamAnimations, stopTeamAnimations } from './team.js';
import { initializeLaunchpadCarousel } from './launchdpad.js';
import { startLaunchPageAnimations} from './launchpage.js';
import { initializePortfolioCarousels } from './portfolio.js';







// function initializePageAnimations() {
//   const currentURL = window.location.href;
  
//   // Clear any existing animations/timelines
//   gsap.globalTimeline.clear();

//   console.log('Current URL:', currentURL); // Debug log

//   if (currentURL.includes('starshot-ventures.webflow.io/about')) {
//     console.log('Initializing About animations');
//     startAboutAnimations();
//   }
//   else if (currentURL.includes('starshot-ventures.webflow.io/team')) {
//     console.log('Initializing Team animations');
//     startTeamAnimations();
//   }
//   else if (currentURL.includes('starshot-ventures.webflow.io/launchpad')) {
//     console.log('Initializing Launchpad animations');
//     initializeLaunchpadCarousel();
//     startLaunchPageAnimations();
//   }
//   else if (currentURL.includes('starshot-ventures.webflow.io/portfolio')) {
//     console.log('Initializing Portfolio animations');
//     initializePortfolioCarousels();
//   }
//   // Home page could be either the root or have some specific path
//   else if (currentURL.includes('starshot-ventures.webflow.io') && 
//            !currentURL.includes('/about') && 
//            !currentURL.includes('/team') && 
//            !currentURL.includes('/launchpad') && 
//            !currentURL.includes('/portfolio')) {
//     console.log('Initializing Home animations');
//     initializeAllAnimations();
//   }
//   else {
//     console.log('No specific animations for this page');
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   initializePageAnimations();
// });


// const lenis = new Lenis({
//   autoRaf: true,
// });




//Init All Animations
// initializeAllAnimations();
// startAboutAnimations();
// startTeamAnimations();
// initializeLaunchpadCarousel();
// startLaunchPageAnimations();
// initializePortfolioCarousels();




gsap.registerPlugin(ScrollTrigger);

// Register the Paint Worklet
if (CSS && 'paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/smooth-corners');
}

//Navbar Hover Open Effect

const iconLink = document.querySelector('.l-icon-wrapper')
const icon = document.querySelector('.n-icon-holder')
const nBackground = document.querySelector('.g-n-bg')
const logoLink = document.querySelector('.l-icon-wrapper')



const menuWrap = document.querySelector('.menu-l-wrap');



document.addEventListener('DOMContentLoaded', () => {
  const menuWraps = document.querySelectorAll('.menu-l-wrap');
  const bgElements = document.querySelectorAll('.g-n-bg');
  const splitInstances = []; // To store SplitType instances
  let hoverEnabled = false;

  if (!menuWraps.length || !bgElements.length) {
    console.error('Required elements not found!');
    return;
  }

  // Modified initial states - start with menu open
  menuWraps.forEach((menuWrap) => {
    gsap.set(menuWrap, { width: 'auto' });
  });

  bgElements.forEach((bgElement) => {
    gsap.set(bgElement, { width: '41vw', height: '100%' });
  });

  // Function to open all menus
  const openAllMenus = () => {
    hoverEnabled = false; // Disable hover when menu is forced open
    menuWraps.forEach((menuWrap, index) => {
      const bgElement = bgElements[index];
      
      gsap.to(menuWrap, {
        width: 'auto',
        duration: 1.2,
        ease: 'expo.out'
      });
      
      gsap.to(bgElement, {
        width: '41vw',
        duration: 1.2,
        ease: 'expo.out'
      });

      // Fade in text
      const textElements = menuWrap.querySelectorAll('.d-nav');
      textElements.forEach((textElement) => {
        const splitText = splitInstances.find(
          (instance) => instance.elements[0] === textElement
        );
        if (splitText?.chars) {
          gsap.to(splitText.chars, {
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out'
          });
        }
      });
    });
  };

  // Function to close all menus
  const closeAllMenus = () => {
    hoverEnabled = true; // Enable hover after initial close
    menuWraps.forEach((menuWrap, index) => {
      const bgElement = bgElements[index];
      
      gsap.to(menuWrap, {
        width: '3.5vw',
        duration: 1.2,
        ease: 'expo.out'
      });
      
      gsap.to(bgElement, {
        width: '0vw',
        duration: 1.2,
        ease: 'expo.out'
      });

      // Fade out text
      const textElements = menuWrap.querySelectorAll('.d-nav');
      textElements.forEach((textElement) => {
        const splitText = splitInstances.find(
          (instance) => instance.elements[0] === textElement
        );
        if (splitText?.chars) {
          gsap.to(splitText.chars, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    });
  };

  // Create hover animations for each menu
  menuWraps.forEach((menuWrap, index) => {
    const bgElement = bgElements[index];
    
    // Split text for all d-nav elements in this menuWrap
    const textElements = menuWrap.querySelectorAll('.d-nav');
    textElements.forEach((textElement) => {
      const splitText = new SplitType(textElement, { types: 'chars' });
      splitInstances.push(splitText);
      // Initially hide text chars when hover is enabled
      gsap.set(splitText.chars, { opacity: 0 });
    });
    
    const menuHoverTimeline = gsap.timeline({ paused: true });
    
    // Setup hover timeline animations
    menuHoverTimeline
      .to(bgElement, {
        width: '41vw',
        duration: 1.2,
        ease: 'expo.out'
      })
      .to(menuWrap, {
        width: 'auto',
        duration: 1.2,
        ease: 'expo.out'
      }, '<')
      // Add text animation for this specific menuWrap
      .to(menuWrap.querySelectorAll('.d-nav').forEach(nav => {
        const splitText = splitInstances.find(
          instance => instance.elements[0] === nav
        );
        return splitText?.chars || [];
      }), {
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.out'
      }, '-=0.8'); // Slightly overlap with the width animations

    // Modified hover event listeners
    menuWrap.addEventListener('mouseenter', () => {
      if (hoverEnabled) {
        menuHoverTimeline.play();
      }
    });

    menuWrap.addEventListener('mouseleave', () => {
      if (hoverEnabled) {
        menuHoverTimeline.reverse();
      }
    });
  });

  // Create a ScrollTrigger for both close and open animations
  ScrollTrigger.create({
    start: '10% top',
    onEnter: closeAllMenus,    // Close menus and enable hover
    onLeaveBack: openAllMenus, // Open menus and disable hover
  });

  // Split text for all d-nav elements once and attach hover listeners for links
  document.querySelectorAll('.d-nav').forEach((dNav) => {
    const splitText = new SplitType(dNav, { types: 'chars' });
    splitInstances.push(splitText);

    const chars = splitText.chars;
    
    // Set initial opacity for all chars to 1
    gsap.set(chars, { opacity: 1 });

    // Hover effect for individual links
    chars.forEach((char, index) => {
      char.addEventListener('mouseenter', () => {
        const targets = [
          chars[index - 2], // Two letters before
          chars[index - 1], // Previous letter
          char,             // Current letter
          chars[index + 1], // Next letter
        ].filter(Boolean);

        gsap.to(targets, {
          opacity: 0.6, // Reduce opacity on hover
          backgroundImage: "linear-gradient(90deg, #316194, #7399C0)",
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
          chars[index - 2],
          chars[index - 1],
          char,
          chars[index + 1],
        ].filter(Boolean);

        gsap.to(targets, {
          opacity: 1, // Return to full opacity
          backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff)",
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
});







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

// document.addEventListener('DOMContentLoaded', () => {
//   // Select all buttons with the class "g-button"
//   const buttons = document.querySelectorAll('.g-button');

//   if (!buttons.length) {
//     console.error('No buttons with class .g-button found!');
//     return;
//   }

//   // Loop through each button and attach hover animations
//   buttons.forEach((button) => {
//     // Target the SVGs and their paths
//     const svg1 = button.querySelector('.bttn-arrow');
//     const svg2 = button.querySelector('.bttn-arrow-2');
//     const path1 = svg1?.querySelector('path');
//     const path2 = svg2?.querySelector('path');

//     if (!svg1 || !path1 || !svg2 || !path2) {
//       console.warn('SVGs or paths not found inside g-button:', button);
//       return;
//     }

//     // Mouse enter animation
//     button.addEventListener('mouseenter', () => {
//       const timeline = gsap.timeline();

//       // First SVG - Shrink all lines and move from -3vw to 3vw
//       timeline
//         .to(path1, {
//           attr: {
//             d: `M11 6L11 6M11 6L11 6M11 6H11`, // All lines shrink to the center
//           },
//           duration: 0.5,
//           ease: 'power2.out',
//         })
//         .fromTo(
//           svg1,
//           { x: '-3vw' }, // Start from -3vw
//           { x: '3vw', duration: 0.5, ease: 'power2.out' },
//           '-=0.4' // Slight overlap for smooth transition
//         );

//       // Second SVG - Start from -3vw, grow lines
//       timeline.fromTo(
//         svg2,
//         { x: '-3vw' }, // Start from -3vw
//         { x: '0vw', duration: 0.5, ease: 'power2.out' },
//         '-=0.3' // Start slightly after the first SVG moves
//       );

//       // Second SVG - Grow the horizontal line first, then the diagonal lines
//       timeline.to(
//         path2,
//         {
//           attr: {
//             d: `M11 6L11 6M11 6L11 6M11 6H1`, // Grow horizontal line first
//           },
//           duration: 0.3,
//           ease: 'power2.out',
//         },
//         '<' // Start immediately after the second SVG moves
//       );

//       timeline.to(
//         path2,
//         {
//           attr: {
//             d: 'M11 6L6.2381 1M11 6L6.2381 11M11 6H1', // Grow diagonal lines
//           },
//           duration: 0.3,
//           ease: 'power2.out',
//         },
//         '-=0.2' // Slight overlap with the horizontal line animation
//       );
//     });

//     // Mouse leave animation
//     button.addEventListener('mouseleave', () => {
//       const timeline = gsap.timeline();

//       // Second SVG - Shrink all lines and move to 3vw
//       timeline
//         .to(path2, {
//           attr: {
//             d: `M11 6L11 6M11 6L11 6M11 6H11`, // Shrink all lines to the center
//           },
//           duration: 0.5,
//           ease: 'power2.out',
//         })
//         .fromTo(
//           svg2,
//           { x: '0vw' }, // Start from 0vw
//           { x: '3vw', duration: 0.5, ease: 'power2.out' },
//           '-=0.4' // Slight overlap for smooth transition
//         );

//       // First SVG - Move from -3vw, grow lines
//       timeline.fromTo(
//         svg1,
//         { x: '-3vw' }, // Start from -3vw
//         { x: '0vw', duration: 0.5, ease: 'power2.out' },
//         '-=0.3' // Start slightly after the second SVG moves
//       );

//       // First SVG - Grow the horizontal line first, then the diagonal lines
//       timeline.to(
//         path1,
//         {
//           attr: {
//             d: `M11 6L11 6M11 6L11 6M11 6H1`, // Grow horizontal line first
//           },
//           duration: 0.3,
//           ease: 'power2.out',
//         },
//         '<' // Start immediately after the first SVG moves
//       );

//       timeline.to(
//         path1,
//         {
//           attr: {
//             d: 'M11 6L6.2381 1M11 6L6.2381 11M11 6H1', // Grow diagonal lines
//           },
//           duration: 0.3,
//           ease: 'power2.out',
//         },
//         '-=0.2' // Slight overlap with the horizontal line animation
//       );
//     });
//   });
// });




document.addEventListener('DOMContentLoaded', () => {
  const isMobile = () => window.innerWidth <= 478;
  if (!isMobile()) return;

  // Select elements
  const mobileIcon = document.querySelector('.mobile_icon');
  const mobileNavbar = document.querySelector('.mobile_navbar');
  const menuBg = document.querySelector('.mobile_menu_bg');
  const linksList = document.querySelector('.mobile_links_list_wrap');
  const logoWrap = document.querySelector('.mobile_logo_wrap');
  const mobileTexts = document.querySelectorAll('.mobile_text');
  
  // Split texts and store references
  const splitTexts = Array.from(mobileTexts).map(text => 
    new SplitType(text, { types: 'chars' })
  );
  
  // Initial states
  gsap.set(mobileNavbar, { width: '100%', height: 'auto' });
  gsap.set(menuBg, { width: '18vw', height: '12vw', borderRadius: '100rem' });
  gsap.set([linksList, logoWrap], { display: 'none', opacity: 0 });
  splitTexts.forEach(split => {
    gsap.set(split.chars, { opacity: 0 });
  });

  const openTimeline = gsap.timeline({ 
    paused: true,
    onStart: () => {
      lenis.stop();
    }
  });
  
  const closeTimeline = gsap.timeline({ 
    paused: true,
    onComplete: () => {
      lenis.start();
      // Reset elements for next open
      gsap.set([linksList, logoWrap], { display: 'none' });
    }
  });

  // Open animation
  openTimeline
    .fromTo(mobileNavbar, 
      { height: 'auto', width: '100%' },
      { width: '100%', height: '118vw', duration: 0 }
    )
    .fromTo(menuBg,
      { width: '18vw', height: '12vw', borderRadius: '100rem' },
      { width: '100%', height: '100%', borderRadius: '2vw', duration: 0.8, ease: 'expo.out' }
    )
    .set([linksList, logoWrap], { display: 'flex' })
    .fromTo([linksList, logoWrap],
      { opacity: 0, y: '2vw' },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'expo.out' }
    )
    .fromTo(splitTexts.map(split => split.chars), 
      { opacity: 0 },
      { 
        opacity: 1,
        duration: 0.8,
        stagger: {
          each: 0.02,
          from: "random"
        },
        ease: "power2.out"
      },
      '-=0.3'
    );

  // Close animation (faster and smoother)
  closeTimeline
    .to(splitTexts.map(split => split.chars), {
      opacity: 0,
      duration: 0.2,
      stagger: {
        each: 0.01,
        from: "random"
      },
      ease: "expo.out"
    })
    .to([linksList, logoWrap], {
      opacity: 0,
      y: '1vw',
      duration: 0.3,
      ease: 'expo.out'
    }, '-=0.2')
    .to(menuBg, {
      width: '18vw',
      height: '12vw',
      borderRadius: '100rem',
      duration: 0.4,
      ease: 'expo.out'
    }, '-=0.1')
    .to(mobileNavbar, {
      height: 'auto',
      duration: 0.1
    });

  // Toggle state
  let isOpen = false;

  // Click event listener
  mobileIcon.addEventListener('click', () => {
    if (!isOpen) {
      // Reset closeTimeline and play openTimeline
      closeTimeline.pause(0);
      openTimeline.play(0);
    } else {
      // Reset openTimeline and play closeTimeline
      openTimeline.pause();
      closeTimeline.play(0);
    }
    isOpen = !isOpen;
  });
});


document.addEventListener('DOMContentLoaded', () => { 
  const transitions = new Transition()

})





























 




