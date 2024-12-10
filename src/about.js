import SplitType from 'split-type'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Function to initialize scroll animations
export function startAboutAnimations() {
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
        start: "top 65%",
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
        y: '0%',
        duration: 1,
        ease: 'expo.out',
      });

      // Deactivate other images
      launchImages.forEach((img, imgIndex) => {
        if (imgIndex !== index) {
          gsap.to(img, {
            opacity: 1,
            zIndex: -1,
            y: '110%',
            duration: 1,
            ease: 'expo.out',
          });
        }
      });
    }

    // Function to deactivate an image
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

    // Animate the launch-img-wrap on the Y-axis
    gsap.to(launchImgWrap, {
      y: '144vw',
      scrollTrigger: {
        trigger: storyGridWrap,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Initialize the animation
  document.addEventListener('DOMContentLoaded', initScrollAnimations);

  // Animation Venture
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
        start: "top 58%",
        end: "bottom top",
        scrub: true,
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
}

// Function to stop animations
export function stopAboutAnimations() {
  // Kill all ScrollTriggers and GSAP animations
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}