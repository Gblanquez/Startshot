import './styles/style.css'
import SplitType from 'split-type'
import gsap from 'gsap'
import Lenis from 'lenis'
import Transition from './transition.js';
import { ScrollTrigger } from "gsap/ScrollTrigger";


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
    

        // Set --mvw to 1% of the current viewport width in pixels for mobile
        document.documentElement.style.setProperty('--lg-mvw', `${window.innerWidth / 100}px`);
};

// Set the initial value of --vw
setVw();

// Update --vw on window resize
window.addEventListener('resize', setVw);




document.addEventListener('DOMContentLoaded', () => { 
  const transitions = new Transition()
})





























 




