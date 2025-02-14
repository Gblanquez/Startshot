import SplitType from 'split-type'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Function to initialize all animations
export function startAboutAnimations() {
  function initAnimations() {
    const storyGridWrap = document.querySelector('.story-grid-wrap');
    const contentChildren = document.querySelectorAll('.story-content-child');
    const launchImages = document.querySelectorAll('.launch-img');
    const launchImgWrap = document.querySelector('.launch-img-wrap');
    const vWrap = document.querySelector('.v-wrap');
    const ventures = document.querySelectorAll('.h-xl.venture');
    const vPWrap = document.querySelector('.v-p-wrap');
    const svgPath = document.querySelector('.story-line-path');

    if (!storyGridWrap || contentChildren.length === 0 || launchImages.length === 0 || !launchImgWrap || !vWrap || ventures.length < 1) {
      console.error('Required elements not found!');
      return;
    }

    // Initialize scroll animations
    gsap.set(launchImages, { opacity: 1, zIndex: -1, filter: 'blur(10px)' });
    launchImages[0].classList.add('active');
    contentChildren[0].classList.add('active');
    gsap.set(launchImages[0], { opacity: 1, zIndex: 1, filter: 'blur(0px)' });

    contentChildren.forEach((content, index) => {
      ScrollTrigger.create({
        trigger: content,
        start: "top 50%",
        end: "bottom top",
        onEnter: () => activateImage(index),
        onLeaveBack: () => activateImage(index - 1),
        onLeave: () => deactivateImage(index),
      });
    });

    function activateImage(index) {
      if (index < 0 || index >= launchImages.length) return;
      gsap.to(launchImages[index], {
        opacity: 1,
        zIndex: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'expo.out',
      });
      launchImages.forEach((img, imgIndex) => {
        if (imgIndex !== index) {
          gsap.to(img, {
            opacity: 1,
            zIndex: -1,
            filter: 'blur(10px)',
            duration: 1.4,
            ease: 'expo.out',
          });
        }
      });
    }

    function deactivateImage(index) {
      if (index < 0 || index >= launchImages.length) return;
      gsap.to(launchImages[index], {
        opacity: 0,
        zIndex: -1,
        filter: 'blur(10px)',
        duration: 1.4,
        ease: 'expo.out',
      });
    }

    // Initialize the SVG path
    gsap.set(svgPath, {
      strokeDasharray: svgPath.getTotalLength(),
      strokeDashoffset: svgPath.getTotalLength(),
      filter: 'blur(0px)'
    });

    // Create a timeline for synchronized animations
    gsap.timeline({
      scrollTrigger: {
        trigger: storyGridWrap,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    })
    .to(svgPath, {
      strokeDashoffset: 0,
      duration: 0.5
    }, 0)

    // Initialize venture animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: vWrap,
        start: "top 58%",
        end: "bottom 70%",
        scrub: true,
      }
    });

    const splitText1 = new SplitType(ventures[0], { types: 'words, chars' });
    timeline.fromTo(splitText1.chars, 
      { opacity: 0, filter: 'blur(5px)' }, 
      { opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.05, ease: 'power2.out' }
    );


  }

  // document.addEventListener('DOMContentLoaded', initAnimations);
  initAnimations();
  // setTimeout(() => {
  //   initAnimations();
  // }, 1200);

}

// Function to stop animations
export function stopAboutAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}