import gsap from 'gsap';
import SplitType from 'split-type';
import { startLaunchPageAnimations } from './launchpage.js';

export function initializeLaunchpadCarousel() {
  // DOM Elements
  const slider = document.querySelector('.swiper.is-launchdpad');
  const slides = document.querySelectorAll('.swiper-slide.is-launchdpad');
  const sliderWrapper = document.querySelector('.swiper-wrapper.is-launchdpad');
  const arrowForward = document.querySelector('.arrow-forward.is-launchdpad');
  const arrowBackward = document.querySelector('.arrow-backward.is-launchdpad');
  const paginationDots = document.querySelectorAll('.pag-dot.is-launchdpad');
  const descriptions = document.querySelectorAll('.cl-description-wrapper');

  // Desktop Variables
  let currentIndex = Math.floor(slides.length / 2);
  const spaceBetweenVW = 1;
  const inactiveWidthVW = 23;
  const activeWidthVW = 50;
  const activeMarginVW = 8;
  const offsetEdgeVW = 0.5;

  // Mobile Variables
  let mobileCurrentIndex = Math.floor(slides.length / 2);
  const mobileSlideWidthVW = 100;
  const mobileSlideHeightVW = 120;

  function initializeDesktopCarousel() {
    setSlideSizes();
    updatePosition();
    setActiveSlide();

    arrowForward.addEventListener('click', nextSlide);
    arrowBackward.addEventListener('click', previousSlide);

    paginationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        animateToSlide(index);
      });
    });
  }

  function initializeMobileCarousel() {
    setMobileSlideSizes();
    updateMobilePosition();
    setActiveSlide();

    arrowForward.addEventListener('click', nextMobileSlide);
    arrowBackward.addEventListener('click', previousMobileSlide);

    paginationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        animateToMobileSlide(index);
      });
    });
  }

  function setSlideSizes() {
    slides.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.c-h-wrap.is-launchdpad');
      if (contentWrapper) {
        const isActive = index === currentIndex;
        const totalActiveWidthVW = activeWidthVW;
        contentWrapper.style.width = isActive ? `${totalActiveWidthVW}vw` : `${inactiveWidthVW}vw`;
        contentWrapper.style.height = isActive ? `40vw` : `19vw`;
        contentWrapper.style.margin = isActive ? `0 ${activeMarginVW}vw` : '0';
      }
      slide.style.marginRight = `${spaceBetweenVW}vw`;
    });

    const totalOffsetVW = 2 * offsetEdgeVW;
    const totalWrapperWidthVW =
      slides.length * inactiveWidthVW + totalOffsetVW + slides.length * spaceBetweenVW;
    sliderWrapper.style.width = `calc(${totalWrapperWidthVW}vw)`;
  }

  function setMobileSlideSizes() {
    slides.forEach((slide) => {
      const contentWrapper = slide.querySelector('.c-h-wrap.is-launchdpad');
      if (contentWrapper) {
        contentWrapper.style.width = `${mobileSlideWidthVW}vw`;
        contentWrapper.style.height = `${mobileSlideHeightVW}vw`;
        contentWrapper.style.margin = '0';
      }
      slide.style.marginRight = '0';
    });

    sliderWrapper.style.width = `${slides.length * mobileSlideWidthVW}vw`;
  }

  function updatePosition() {
    const spaceBetween = window.innerWidth * (spaceBetweenVW / 100);
    const inactiveWidth = window.innerWidth * (inactiveWidthVW / 100);
    const activeWidth = window.innerWidth * (activeWidthVW / 100);
    const activeMargin = window.innerWidth * (activeMarginVW / 100);
    const offsetEdge = window.innerWidth * (offsetEdgeVW / 100);

    const offset =
      -(inactiveWidth + spaceBetween) * currentIndex +
      slider.offsetWidth / 2 -
      (activeWidth + 2 * activeMargin) / 2;

    gsap.to(sliderWrapper, {
      x: offset,
      duration: 0.5,
      ease: 'power2.out'
    });

    setActiveSlide();
  }

  function updateMobilePosition() {
    const offset = -mobileCurrentIndex * window.innerWidth;

    gsap.to(sliderWrapper, {
      x: offset,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => setActiveSlide()
    });
  }

  function setActiveSlide() {
    slides.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.c-h-wrap.is-launchdpad');
      if (contentWrapper) {
        const isActive = index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex);
        contentWrapper.classList.toggle('is-active', isActive);

        if (window.matchMedia("(max-width: 479px)").matches) {
          contentWrapper.style.width = `${mobileSlideWidthVW}vw`;
          contentWrapper.style.height = `${mobileSlideHeightVW}vw`;
          contentWrapper.style.margin = '0';
        } else {
          const timeline = gsap.timeline();

          if (isActive) {
            timeline.to(contentWrapper, {
              width: `${activeWidthVW}vw`,
              height: '40vw',
              margin: `0 ${activeMarginVW}vw`,
              duration: 1.4,
              ease: 'expo.out'
            });
          } else {
            timeline.to(contentWrapper, {
              width: `${inactiveWidthVW}vw`,
              height: '19vw',
              margin: 0,
              duration: 1.4,
              ease: 'expo.out'
            });
          }
        }
      }
    });

    descriptions.forEach((description, index) => {
      const isActive = index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex);
      description.classList.toggle('is-active', isActive);

      const captions = description.querySelectorAll('.caption-w.launchdpad');
      const bodyText = description.querySelectorAll('.body-s.launchdpad');
      const buttons = description.querySelectorAll('.cl-d-div.bttn');

      if (isActive) {
        // **RESET & REAPPLY SplitType for mobile**
        bodyText.forEach(text => {
          SplitType.revert(text);
          const split = new SplitType(text, { types: 'lines', lineClass: 'split-line', absolute: true });

          gsap.fromTo(split.lines,
            { y: '120%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: 1.6,
              stagger: 0.1,
              ease: 'expo.out',
              delay: 0.2
            }
          );
        });

        gsap.fromTo(captions,
          { y: '120%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.6,
            stagger: 0.1,
            ease: 'expo.out',
            delay: 0.2
          }
        );

        gsap.fromTo(buttons,
          { y: '120%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.6,
            stagger: 0.1,
            ease: 'expo.out',
            delay: 0.2
          }
        );
      } else {
        // Reset everything when not active
        gsap.set(captions, { y: '120%', opacity: 0 });
        gsap.set(bodyText, { opacity: 1 });
        gsap.set(buttons, { y: '120%', opacity: 0 });
      }

      // Ensure correct pointer events
      const parentItem = description.closest('.launchdpad-cl-item');
      if (parentItem) {
        parentItem.style.pointerEvents = isActive ? 'auto' : 'none';
        parentItem.style.zIndex = isActive ? '2' : '1';
      }
    });

    paginationDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex));
    });
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updatePosition();
    }
    // Update arrow visibility
    updateArrowVisibility();
  }

  function previousSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updatePosition();
    }
    // Update arrow visibility
    updateArrowVisibility();
  }

  function updateArrowVisibility() {
    arrowForward.style.opacity = currentIndex === slides.length - 1 ? '0' : '1';
    arrowBackward.style.opacity = currentIndex === 0 ? '0' : '1';
  }

  function nextMobileSlide() {
    if (mobileCurrentIndex < slides.length - 1) {
      mobileCurrentIndex++;
      updateMobilePosition();
    }
  }

  function previousMobileSlide() {
    if (mobileCurrentIndex > 0) {
      mobileCurrentIndex--;
      updateMobilePosition();
    }
  }

  function animateToSlide(index) {
    currentIndex = index;
    updatePosition();
  }

  function animateToMobileSlide(index) {
    mobileCurrentIndex = index;
    const offset = -mobileCurrentIndex * window.innerWidth;

    gsap.to(sliderWrapper, {
      x: offset,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => setActiveSlide()
    });
  }

  // Initialize carousel immediately
  if (slider && slides.length && sliderWrapper) {
    const isMobile = window.matchMedia("(max-width: 479px)").matches;

    if (isMobile) {
      initializeMobileCarousel();
    } else {
      initializeDesktopCarousel();
    }
  }

  // Mobile initialization on DOMContentLoaded (extra safeguard)
  document.addEventListener('DOMContentLoaded', () => {
    if (slider && slides.length && sliderWrapper) {
      const isMobile = window.matchMedia("(max-width: 479px)").matches;

      if (isMobile) {
        // Ensure any old split animations are reset
        const allBodyText = document.querySelectorAll('.body-s.launchdpad');
        allBodyText.forEach(text => {
          SplitType.revert(text);
        });

        initializeMobileCarousel();
      }
    }
  });

  let resizeTimeout;

  // Handle resize events with a debounce effect
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      if (slider && slides.length && sliderWrapper) {
        const isMobile = window.matchMedia("(max-width: 479px)").matches;

        if (isMobile) {
          mobileCurrentIndex = currentIndex;

          setMobileSlideSizes();
          updateMobilePosition();
          setActiveSlide();

          paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === mobileCurrentIndex);
            dot.addEventListener('click', () => {
              animateToMobileSlide(index);
            });
          });

        } else {
          currentIndex = mobileCurrentIndex;

          // Ensure desktop slide sizes and positions update
          setSlideSizes();
          updatePosition();
          setActiveSlide();

          paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.addEventListener('click', () => {
              animateToSlide(index);
            });
          });
        }
      }
    }, 200);
  });
}