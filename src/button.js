import gsap from 'gsap'
import SplitType from 'split-type'


// Export the button initialization function
export function initializeButtonAnimations() {
    // Select all buttons with the class "g-button"
    const buttons = document.querySelectorAll('.g-button');
  
    if (!buttons.length) {
      console.log('No buttons with class .g-button found!');
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
}

// Initialize on DOMContentLoaded for the first page load
document.addEventListener('DOMContentLoaded', initializeButtonAnimations);