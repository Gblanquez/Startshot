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







function initializePageAnimations() {
  const currentURL = window.location.href;
  
  // Clear any existing animations/timelines
  gsap.globalTimeline.clear();

  console.log('Current URL:', currentURL); // Debug log

  if (currentURL.includes('starshot-ventures.webflow.io/about')) {
    console.log('Initializing About animations');
    startAboutAnimations();
  }
  else if (currentURL.includes('starshot-ventures.webflow.io/team')) {
    console.log('Initializing Team animations');
    startTeamAnimations();
  }
  else if (currentURL.includes('starshot-ventures.webflow.io/launchpad')) {
    console.log('Initializing Launchpad animations');
    initializeLaunchpadCarousel();
    startLaunchPageAnimations();
  }
  else if (currentURL.includes('starshot-ventures.webflow.io/portfolio')) {
    console.log('Initializing Portfolio animations');
    initializePortfolioCarousels();
  }
  // Home page could be either the root or have some specific path
  else if (currentURL.includes('starshot-ventures.webflow.io') && 
           !currentURL.includes('/about') && 
           !currentURL.includes('/team') && 
           !currentURL.includes('/launchpad') && 
           !currentURL.includes('/portfolio')) {
    console.log('Initializing Home animations');
    initializeAllAnimations();
  }
  else {
    console.log('No specific animations for this page');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializePageAnimations();
});


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







document.addEventListener('DOMContentLoaded', () => {
  const isMobile = () => window.innerWidth <= 478;

  // Select elements
  const mobileIcon = document.querySelector('.mobile_icon');
  const mobileNavbar = document.querySelector('.mobile_navbar');
  const menuBg = document.querySelector('.mobile_menu_bg');
  const linksList = document.querySelector('.mobile_links_list_wrap');
  const logoWrap = document.querySelector('.mobile_logo_wrap');
  const mobileTexts = document.querySelectorAll('.mobile_text');

  let splitTexts = [];
  let openTimeline, closeTimeline;
  let isOpen = false;

  // Function to initialize mobile menu
  function initializeMobileMenu() {
    if (!isMobile()) return;

    // Split texts and store references
    splitTexts = Array.from(mobileTexts).map(text => 
      new SplitType(text, { types: 'chars' })
    );

    // Initial states
    gsap.set(mobileNavbar, { width: '100%', height: 'auto' });
    gsap.set(menuBg, { width: '18vw', height: '12vw', borderRadius: '100rem' });
    gsap.set([linksList, logoWrap], { display: 'none', opacity: 0 });
    splitTexts.forEach(split => {
      gsap.set(split.chars, { opacity: 0 });
    });

    // Open animation
    openTimeline = gsap.timeline({ 
      paused: true,
      onStart: () => {
        lenis.stop();
      }
    });

    // Close animation
    closeTimeline = gsap.timeline({ 
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
    isOpen = false;

    // Click event listener
    mobileIcon.addEventListener('click', toggleMobileMenu);
  }

  // Function to toggle mobile menu
  function toggleMobileMenu() {
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
  }

  // Function to reset mobile menu state
  function resetMobileMenu() {
    if (openTimeline) openTimeline.pause(0);
    if (closeTimeline) closeTimeline.pause(0);
    isOpen = false;

    gsap.set(mobileNavbar, { width: '100%', height: 'auto' });
    gsap.set(menuBg, { width: '18vw', height: '12vw', borderRadius: '100rem' });
    gsap.set([linksList, logoWrap], { display: 'none', opacity: 0 });
    splitTexts.forEach(split => {
      gsap.set(split.chars, { opacity: 0 });
    });

    if (mobileIcon) {
      mobileIcon.removeEventListener('click', toggleMobileMenu);
    }
  }

  // Initialize mobile menu on page load
  initializeMobileMenu();

  // Handle resize events
  window.addEventListener('resize', () => {
    if (isMobile()) {
      resetMobileMenu();
      initializeMobileMenu();
    } else {
      resetMobileMenu();
    }
  });
});































 




