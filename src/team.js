import SplitType from 'split-type';
import gsap from 'gsap';

// Function to initialize and start all animations
export function startTeamAnimations() {
  document.querySelectorAll('.team-content').forEach((teamContent) => {
    const teamCContent = teamContent.querySelector('.team-c-content');
    const teamImg = teamContent.querySelector('.team-img');
    const bodySTeam = teamContent.querySelector('.body-s.team');
  
    const splitText = new SplitType(bodySTeam, { types: 'words' });
    const enterTimeline = gsap.timeline({ paused: true });
    const leaveTimeline = gsap.timeline({ paused: true });
  
    enterTimeline.set(splitText.words, { y: '120%', opacity: 0 });
    enterTimeline.set(teamImg, { filter: 'blur(0px)' });
    enterTimeline.to(splitText.words, { y: '0%', opacity: 1, duration: 1.2, stagger: 0.01, ease: 'expo.out' });
    enterTimeline.to(teamImg, { filter: 'blur(32px)', duration: 0.8, ease: 'expo.out' }, '<');
  
    leaveTimeline.set(splitText.words, { y: '0%', opacity: 1 });
    leaveTimeline.set(teamImg, { filter: 'blur(32px)' });
    leaveTimeline.to(splitText.words, { y: '-120%', opacity: 0, duration: 1.2, stagger: 0.01, ease: 'expo.out' });
    leaveTimeline.to(teamImg, { filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' }, '<');
  
    teamContent.addEventListener('mouseenter', () => {
      teamContent.classList.add('active');
      teamCContent.classList.add('active');
      leaveTimeline.pause(0);
      enterTimeline.restart();
    });
  
    teamContent.addEventListener('mouseleave', () => {
      teamContent.classList.remove('active');
      teamCContent.classList.remove('active');
      enterTimeline.pause(0);
      leaveTimeline.restart();
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia("(max-width: 479px)").matches) {
      const teamWraps = document.querySelectorAll('.team-c-m-container');
      let activeWrap = null;
  
      teamWraps.forEach((wrap) => {
        wrap.addEventListener('click', () => {
          if (wrap === activeWrap) {
            reverseAnimation(wrap);
            activeWrap = null;
          } else {
            if (activeWrap) {
              reverseAnimation(activeWrap);
            }
            animateTeamWrap(wrap);
            activeWrap = wrap;
          }
        });
      });
    }
  });
}

// Function to stop all animations
export function stopTeamAnimations() {
  gsap.globalTimeline.clear();
}

//Mobile Animation Team Card //
  
function animateTeamWrap(wrap) {
    wrap.classList.add('active');
    const teamImg = wrap.querySelector('.team-img-m');
    const textElements = wrap.querySelectorAll('.h-l.team-m, .caption-n.team-m');
    const arrowDiv = wrap.querySelector('.m-arrow-div');
    const bodyText = wrap.querySelector('.body-s.m-team');
    const teamDescription = new SplitType(bodyText, { types: 'lines, words, chars' });
    const teamDAbDiv = wrap.querySelector('.team-d-ab-div');
    const arrowBDiv = wrap.querySelector('.arrow-b-div');
  
    const initialTimeline = gsap.timeline();
  
    initialTimeline.to(teamImg, {
      x: '120%',
      duration: 1.4,
      ease: 'expo.out',
    });
  
    initialTimeline.to(arrowDiv, {
      x: '110%',
      opacity: 0,
      duration: 0.5,
      ease: 'expo.out',
    }, '<');
  
    initialTimeline.to(textElements, {
      y: '120%',
      opacity: 0,
      duration: 1.4,
      stagger: 0.01,
      ease: 'expo.out',
    }, '<');
  
    teamDAbDiv.classList.add('active');
  
    initialTimeline.fromTo(arrowBDiv, {
      x: '-110%',
      opacity: 0,
    }, {
      x: '0%',
      opacity: 1,
      duration: 1.1,
      ease: 'expo.out',
    }, '-=0.5');
  
    initialTimeline.from(teamDescription.words, {
      y: '120%',
      opacity: 0,
      duration: 1.2,
      stagger: 0.01,
      ease: 'expo.out',
    }, '<');
  }
  
  function reverseAnimation(wrap) {
    const reverseTimeline = gsap.timeline({
      onComplete: () => {
        wrap.classList.remove('active');
        const teamDAbDiv = wrap.querySelector('.team-d-ab-div');
        teamDAbDiv.classList.remove('active');
      }
    });
  
    const teamImg = wrap.querySelector('.team-img-m');
    const textElements = wrap.querySelectorAll('.h-l.team-m, .caption-n.team-m');
    const arrowDiv = wrap.querySelector('.m-arrow-div');
    const bodyText = wrap.querySelector('.body-s.m-team');
    const teamDescription = new SplitType(bodyText, { types: 'lines, words, chars' });
    const arrowBDiv = wrap.querySelector('.arrow-b-div');
  
    reverseTimeline.to(teamDescription.words, {
      y: '120%',
      opacity: 0,
      duration: 1,
      stagger: 0.003,
      ease: 'expo.out',
    }, '<');
  
    reverseTimeline.fromTo(arrowBDiv, {
      x: '0%',
      opacity: 1,
    }, {
      x: '-110%',
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
    }, '<');
  
    reverseTimeline.fromTo(arrowDiv, {
      x: '110%',
      opacity: 0,
    }, {
      x: '0%',
      opacity: 1,
      duration: 1.1,
      ease: 'expo.out',
    }, '-=0.5');
  
    reverseTimeline.fromTo(textElements, {
      y: '120%',
      opacity: 0,
    }, {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger: 0.01,
      ease: 'expo.out',
    }, '<');
  
    reverseTimeline.fromTo(teamImg, {
      x: '120%',
    }, {
      x: '0%',
      duration: 1.4,
      ease: 'expo.out',
    }, '<');
  }