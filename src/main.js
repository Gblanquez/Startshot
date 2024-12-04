import './styles/style.css'
import SplitType from 'split-type'
import gsap from 'gsap'
import transition from './transition';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JourneyPath from './JourneyPath';

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

//Button Hover End


function initScrollAnimations() {
  const storyGridWrap = document.querySelector('.story-grid-wrap');
  const contentChildren = document.querySelectorAll('.story-content-child');
  const launchImages = document.querySelectorAll('.launch-img');
  const launchImgWrap = document.querySelector('.launch-img-wrap');

  if (!storyGridWrap || contentChildren.length === 0 || launchImages.length === 0 || !launchImgWrap) {
    console.error('Required elements not found!');
    return;
  }

  // Make all images initially hidden
  gsap.set(launchImages, { opacity: 1, zIndex: -1, y: '110%' });

  // Add active class to the first image and content child
  launchImages[0].classList.add('active');
  contentChildren[0].classList.add('active');

  // Ensure the first image is visible and in position
  gsap.set(launchImages[0], { opacity: 1, zIndex: 1, y: '0%' });

  // ScrollTrigger for each content-child
  contentChildren.forEach((content, index) => {
    ScrollTrigger.create({
      trigger: content,
      start: "top 65%", // Adjust for when the content reaches the center of the viewport
      end: "bottom top",
      onEnter: () => activateImage(index),
      onLeaveBack: () => activateImage(index - 1),
      onLeave: () => deactivateImage(index),
    });
  });

  // Function to activate an image
  function activateImage(index) {
    if (index < 0 || index >= launchImages.length) return;

    gsap.to(launchImages[index], {
      opacity: 1,
      zIndex: 1,
      y: '0%', // Bring the image to the default position
      duration: 1,
      ease: 'expo.out',
    });

    // Deactivate other images
    launchImages.forEach((img, imgIndex) => {
      if (imgIndex !== index) {
        gsap.to(img, {
          opacity: 1,
          zIndex: -1,
          y: '110%', // Move the image back down
          duration: 1,
          ease: 'expo.out',
        });
      }
    });
  }

  // Function to deactivate an image (when leaving its section)
  function deactivateImage(index) {
    if (index < 0 || index >= launchImages.length) return;

    gsap.to(launchImages[index], {
      opacity: 0,
      zIndex: -1,
      y: '110%',
      duration: 1,
      ease: 'expo.out',
    });
  }

  // Animate the launch-img-wrap on the Y-axis across the entire story-grid-wrap
  gsap.to(launchImgWrap, {
    y: '144vw', // Move from 0% to 100%
    scrollTrigger: {
      trigger: storyGridWrap,
      start: "top top", // Start animation when storyGridWrap reaches the top of the viewport
      end: "bottom top", // End animation when storyGridWrap reaches the bottom
      scrub: true, // Smooth scrolling effect
    },
  });
}

// Initialize the animation
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});



//Animation Venture 

document.addEventListener('DOMContentLoaded', () => {
  const vWrap = document.querySelector('.v-wrap');
  const ventures = document.querySelectorAll('.h-xl.venture');
  const vPWrap = document.querySelector('.v-p-wrap');

  if (!vWrap || ventures.length < 2 || !vPWrap) {
    console.error('Required elements not found!');
    return;
  }

  // Create a GSAP timeline
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: vWrap,
      start: "top 58%", // Start when .v-wrap reaches the top of the viewport
      end: "bottom top", // End when .v-wrap leaves the viewport
      scrub: true, // Smooth scrolling effect
    }
  });

  // Animate the first .h-xl.venture
  const splitText1 = new SplitType(ventures[0], { types: 'chars' });
  timeline.fromTo(splitText1.chars, 
    { opacity: 0, filter: 'blur(5px)' }, 
    { opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'power2.out' }
  );

  // Animate the .v-p-wrap and fade out/blur the first .h-xl.venture simultaneously
  timeline.to(splitText1.chars, 
    { opacity: 0, filter: 'blur(5px)', duration: 1, stagger: 0.05, ease: 'power2.out' },
     
  );
  timeline.fromTo(vPWrap, 
    { y: '50vw' }, 
    { y: '-50vw', duration: 10, ease: 'power2.out' },
    '<'
    
  );

  // Animate the second .h-xl.venture
  const splitText2 = new SplitType(ventures[1], { types: 'chars' });
  timeline.fromTo(splitText2.chars, 
    { opacity: 0, filter: 'blur(5px)' }, 
    { opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'power2.out' },
    '-=8'
    
  );
});







//Animation Team //

document.querySelectorAll('.team-content').forEach((teamContent) => {
  const teamCContent = teamContent.querySelector('.team-c-content');
  const teamImg = teamContent.querySelector('.team-img');
  const bodySTeam = teamContent.querySelector('.body-s.team');

  // Initialize SplitType for the text
  const splitText = new SplitType(bodySTeam, { types: 'words' });

  // Create GSAP timelines for enter and leave animations
  const enterTimeline = gsap.timeline({ paused: true });
  const leaveTimeline = gsap.timeline({ paused: true });

  // Enter animation
  enterTimeline.set(splitText.words, { y: '120%', opacity: 0 });
  enterTimeline.set(teamImg, { filter: 'blur(0px)' });

  enterTimeline.to(
    splitText.words,
    { y: '0%', opacity: 1, duration: 1.2, stagger: 0.01, ease: 'expo.out' }
  );

  enterTimeline.to(
    teamImg,
    { filter: 'blur(32px)', duration: 0.8, ease: 'expo.out' },
    '<' // Start at the same time as the text animation
  );

  // Leave animation
  leaveTimeline.set(splitText.words, { y: '0%', opacity: 1 });
  leaveTimeline.set(teamImg, { filter: 'blur(32px)' });

  leaveTimeline.to(
    splitText.words,
    { y: '-120%', opacity: 0, duration: 1.2, stagger: 0.01, ease: 'expo.out' }
  );

  leaveTimeline.to(
    teamImg,
    { filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' },
    '<' // Start at the same time as the text animation
  );

  // Event listeners for hover
  teamContent.addEventListener('mouseenter', () => {
    teamContent.classList.add('active');
    teamCContent.classList.add('active');
    leaveTimeline.pause(0); // Reset leave timeline
    enterTimeline.restart(); // Play enter animation
  });

  teamContent.addEventListener('mouseleave', () => {
    teamContent.classList.remove('active');
    teamCContent.classList.remove('active');
    enterTimeline.pause(0); // Reset enter timeline
    leaveTimeline.restart(); // Play leave animation
  });
});




//Animation Team End //



