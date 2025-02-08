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

const setVw = () => {
    // Set --vw to 1% of the current viewport width in pixels
    document.documentElement.style.setProperty('--vw', `${window.innerWidth / 100}px`);

     // Set --mvw to 1% of the current viewport width in pixels for mobile
     document.documentElement.style.setProperty('--mvw', `${window.innerWidth / 100}px`);

    // Set --mvw to 1% of the current viewport width in pixels for mobile
    document.documentElement.style.setProperty('--sm-vw', `${window.innerWidth / 100}px`);
};

// Set the initial value of --vw
setVw();

// Update --vw on window resize
window.addEventListener('resize', setVw);




document.addEventListener('DOMContentLoaded', () => { 
  const transitions = new Transition()
})





























 




