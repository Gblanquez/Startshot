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

    console.log(storyGridWrap, contentChildren);

    if (!storyGridWrap || contentChildren.length === 0 || launchImages.length === 0 || !launchImgWrap || !vWrap || ventures.length < 2 || !vPWrap) {
      console.error('Required elements not found!');
      return;
    }

    // Initialize scroll animations
    gsap.set(launchImages, { opacity: 1, zIndex: -1, y: '110%' });
    launchImages[0].classList.add('active');
    contentChildren[0].classList.add('active');
    gsap.set(launchImages[0], { opacity: 1, zIndex: 1, y: '0%' });

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

    function activateImage(index) {
      if (index < 0 || index >= launchImages.length) return;
      gsap.to(launchImages[index], {
        opacity: 1,
        zIndex: 1,
        y: '0%',
        duration: 1,
        ease: 'expo.out',
      });
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

    gsap.to(launchImgWrap, {
      y: '144vw',
      scrollTrigger: {
        trigger: storyGridWrap,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Initialize venture animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: vWrap,
        start: "top 58%",
        end: "bottom top",
        scrub: true,
      }
    });

    const splitText1 = new SplitType(ventures[0], { types: 'chars' });
    timeline.fromTo(splitText1.chars, 
      { opacity: 0, filter: 'blur(5px)' }, 
      { opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'power2.out' }
    );

    timeline.to(splitText1.chars, 
      { opacity: 0, filter: 'blur(5px)', duration: 1, stagger: 0.05, ease: 'power2.out' },
    );
    timeline.fromTo(vPWrap, 
      { y: '50vw' }, 
      { y: '-50vw', duration: 10, ease: 'power2.out' },
      '<'
    );

    const splitText2 = new SplitType(ventures[1], { types: 'chars' });
    timeline.fromTo(splitText2.chars, 
      { opacity: 0, filter: 'blur(5px)' }, 
      { opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'power2.out' },
      '-=8'
    );
  }

//   document.addEventListener('DOMContentLoaded', initAnimations);
//   initAnimations();
  setTimeout(() => {
    initAnimations();
  }, 1200);

}

// Function to stop animations
export function stopAboutAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}