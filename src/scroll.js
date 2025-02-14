import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'

// Create a single Lenis instance
const smoothScroll = new Lenis({
  autoRaf: false, // GSAP will handle RAF
});

// Attach Lenis to ScrollTrigger if available
smoothScroll.on('scroll', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.update();
  }
});

// Make Lenis work with GSAP's RAF
gsap.ticker.add((time) => {
  smoothScroll.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Utility functions
export function stopScroll() {
  smoothScroll.stop();
}

export function startScroll() {
  smoothScroll.start();
}

export function destroyScroll() {
  smoothScroll.destroy();
}

// Export the instance globally
export default smoothScroll;