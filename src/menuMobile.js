import gsap from 'gsap';
import SplitType from 'split-type';
import smoothScroll from './scroll.js'; // 

export function initMobileMenu() {
  const isMobile = () => window.innerWidth <= 478;

  // Select elements
  const mobileIcon = document.querySelector('.mobile_icon');
  const mobileNavbar = document.querySelector('.mobile_navbar');
  const menuBg = document.querySelector('.mobile_menu_bg');
  const linksList = document.querySelector('.mobile_links_list_wrap');
  const logoWrap = document.querySelector('.mobile_logo_wrap');
  const mobileTexts = document.querySelectorAll('.mobile_text');
  const mobileLinks = document.querySelectorAll('.mobile_link');

  let splitTexts = [];
  let openTimeline, closeTimeline;
  let isOpen = false;

  function resetStates() {
    if (openTimeline) openTimeline.kill();
    if (closeTimeline) closeTimeline.kill();
    
    isOpen = false;
    
    gsap.set(mobileNavbar, { clearProps: 'all' });
    gsap.set(menuBg, { clearProps: 'all' });
    gsap.set([linksList, logoWrap], { clearProps: 'all' });
    
    gsap.set(mobileNavbar, { width: '100%', height: 'auto' });
    gsap.set(menuBg, { width: '18vw', height: '12vw', borderRadius: '100rem' });
    gsap.set([linksList, logoWrap], { display: 'none', opacity: 0 });
    
    splitTexts.forEach(split => {
      if (split.chars) {
        gsap.set(split.chars, { clearProps: 'all' });
        gsap.set(split.chars, { opacity: 0 });
      }
      split.revert();
    });
    
    splitTexts = [];
  }

  function initialize() {
    if (!isMobile()) return;
    
    resetStates();

    splitTexts = Array.from(mobileTexts).map(text => 
      new SplitType(text, { types: 'chars' })
    );

    gsap.set(mobileNavbar, { width: '100%', height: 'auto' });
    gsap.set(menuBg, { width: '18vw', height: '12vw', borderRadius: '100rem' });
    gsap.set([linksList, logoWrap], { display: 'none', opacity: 0 });
    splitTexts.forEach(split => {
      gsap.set(split.chars, { opacity: 0 });
    });

    setupAnimations();
    mobileIcon.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu)); // ✅ Close on link click
  }

  function setupAnimations() {
    // Open animation
    openTimeline = gsap.timeline({ 
      paused: true,
      onStart: () => smoothScroll.stop() 
    });

    closeTimeline = gsap.timeline({ 
      paused: true,
      onComplete: () => {
        smoothScroll.start();
        gsap.set([linksList, logoWrap], { display: 'none' });
      }
    });

    // Open animation
    openTimeline
      .set([linksList, logoWrap], { display: 'flex' })
      .fromTo(mobileNavbar, 
        { height: 'auto', width: '100%' },
        { width: '100%', height: 'auto', duration: 0 }
      )
      .fromTo(menuBg,
        { width: '18vw', height: '12vw', borderRadius: '100rem' },
        { width: '100%', height: '100%', borderRadius: '2vw', duration: 0.8, ease: 'expo.out' }
      )
      .fromTo([linksList, logoWrap],
        { opacity: 0, y: '2vw' },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'expo.out' }
      )
      .fromTo(splitTexts.map(split => split.chars), 
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 0.8,
          stagger: { each: 0.02, from: "random" },
          ease: "power2.out"
        },
        '-=0.3'
      );

    // Close animation
    closeTimeline
      .to(splitTexts.map(split => split.chars), {
        opacity: 0,
        duration: 0.2,
        stagger: { each: 0.01, from: "random" },
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
  }

  function toggleMobileMenu() {
    if (!isOpen) {
      closeTimeline.pause(0);
      openTimeline.play(0);
    } else {
      openTimeline.pause();
      closeTimeline.play(0);
    }
    isOpen = !isOpen;
  }

  function closeMobileMenu(event) {
    if (isOpen) {
        openTimeline.pause();
        closeTimeline.play(0);

        // Check if the click was on a .mobile_link
        if (event.target.closest('.mobile_link')) {
            console.log('Clicked mobile link, letting Barba handle scroll...');
        }

        isOpen = false;
    }
}
}

  function cleanup() {
    if (mobileIcon) {
      mobileIcon.removeEventListener('click', toggleMobileMenu);
    }
    mobileLinks.forEach(link => link.removeEventListener('click', closeMobileMenu)); // ✅ Remove event listener
    resetStates();
  }

  // Initialize and setup resize handler
  initialize();
  window.addEventListener('resize', () => {
    cleanup();
    if (isMobile()) {
      initialize();
    }
  });

  return {
    cleanup,
    resetStates
  };
}