import gsap from 'gsap'
import SplitType from 'split-type'

export function initializeAllAnimations() {
  // Fetch DOM Elements
  const slider = document.querySelector('.swiper.hero-launchdpad');
  const slides = document.querySelectorAll('.swiper-slide.hero-launchdpad');
  const sliderWrapper = document.querySelector('.swiper-wrapper.hero-launchdpad');
  const arrowForward = document.querySelector('.arrow-forward');
  const arrowBackward = document.querySelector('.arrow-backward');
  const paginationDots = document.querySelectorAll('.pag-dot');

  const slidesInvest = document.querySelectorAll('.swiper-slide.is-invest');
  const dotsInvest = document.querySelectorAll('.invest-swiper-dot');
  const investSection = document.querySelector('.invest-section');

  // Desktop Variables
  let currentIndex = Math.floor(slides.length / 2);
  const spaceBetweenVW = 1;
  const inactiveWidthVW = 23;
  const activeWidthVW = 30;
  const activeMarginVW = 5;
  const offsetEdgeVW = 0.5;

  // Mobile Variables
  let mobileCurrentIndex = Math.floor(slides.length / 2);
  const mobileSlideWidthVW = 100;
  const mobileSlideHeightVW = 120;

  // Invest Variables
  let currentInvestIndex = 0;
  const autoplayInterval = 7000;
  let autoplayTimer;

  // Initialize Carousel
  function initializeCarousel() {
    if (window.matchMedia("(max-width: 479px)").matches) {
      initializeMobileCarousel();
    } else {
      initializeDesktopCarousel();
    }

    window.addEventListener('resize', () => {
      if (window.matchMedia("(max-width: 479px)").matches) {
        initializeMobileCarousel();
      } else {
        initializeDesktopCarousel();
      }
    });
  }

  // Initialize Desktop Carousel
  function initializeDesktopCarousel() {
    setSlideSizes();
    updatePosition();
    setActiveSlide();

    arrowForward.addEventListener('click', nextSlide);
    arrowBackward.addEventListener('click', previousSlide);

    paginationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updatePosition();
      });
    });
  }

  // Initialize Mobile Carousel
  function initializeMobileCarousel() {
    setMobileSlideSizes();
    updateMobilePosition();
    setActiveSlide();

    arrowForward.addEventListener('click', nextMobileSlide);
    arrowBackward.addEventListener('click', previousMobileSlide);

    paginationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        mobileCurrentIndex = index;
        updateMobilePosition();
      });
    });
  }

  // Set sizes dynamically for slides (Desktop)
  function setSlideSizes() {
    slides.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.c-h-wrap');
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

  // Set sizes dynamically for slides (Mobile)
  function setMobileSlideSizes() {
    slides.forEach((slide) => {
      const contentWrapper = slide.querySelector('.c-h-wrap');
      if (contentWrapper) {
        contentWrapper.style.width = `${mobileSlideWidthVW}vw`;
        contentWrapper.style.height = `${mobileSlideHeightVW}vw`;
        contentWrapper.style.margin = '0';
      }
      slide.style.marginRight = '0';
    });

    sliderWrapper.style.width = `${slides.length * mobileSlideWidthVW}vw`;
  }

  // Update the position of the carousel (Desktop)
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

    sliderWrapper.style.transform = `translateX(${offset}px)`;
    sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
    setActiveSlide();
  }

  // Update the position of the carousel (Mobile)
  function updateMobilePosition() {
    const offset = -mobileCurrentIndex * window.innerWidth;
    sliderWrapper.style.transform = `translateX(${offset}px)`;
    sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
    setActiveSlide();
  }

  // Highlight the active slide and update pagination dots
  function setActiveSlide() {
    slides.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.c-h-wrap');
      const content = slide.querySelector('.c-h-content');
      const innovatorText = slide.querySelector('.h-l.innovator-t');
      const buttonWrapper = slide.querySelector('.c-h-b-wrap.h-button');

      if (contentWrapper) {
        const isActive = index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex);
        contentWrapper.classList.toggle('is-active', isActive);

        const timeline = gsap.timeline();

        if (window.matchMedia("(max-width: 479px)").matches) {
          timeline.to(contentWrapper, {
            width: `${mobileSlideWidthVW}vw`,
            height: `${mobileSlideHeightVW}vw`,
            margin: '0',
            duration: 1.4,
            ease: 'expo.out'
          });
        } else {
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
              margin: '0',
              duration: 1.4,
              ease: 'expo.out'
            });
          }
        }

        if (innovatorText) {
          const splitText = new SplitType(innovatorText, { types: 'words' });
          gsap.set(splitText.words, { y: '120%', opacity: 0 });

          if (isActive) {
            timeline.to(splitText.words, {
              y: '0%',
              opacity: 1,
              duration: 1.2,
              ease: 'expo.out',
              stagger: 0.02
            }, 0.66);

            if (buttonWrapper) {
              timeline.to(buttonWrapper,
                { y: '0%', opacity: 1, duration: 1.2, ease: 'expo.out' },
                "<"
              );
            }
          } else {
            gsap.set(splitText.words, { y: '120%', opacity: 0 });
            if (buttonWrapper) {
              gsap.set(buttonWrapper, { y: '120%', opacity: 0 });
            }
          }
        }

        if (content) {
          content.classList.toggle('is-active', isActive);
        }
      }
    });

    paginationDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === (window.matchMedia("(max-width: 479px)").matches ? mobileCurrentIndex : currentIndex));
    });
  }

  // Move to the next slide (Desktop)
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updatePosition();
    }
  }

  // Move to the previous slide (Desktop)
  function previousSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updatePosition();
    }
  }

  // Move to the next slide (Mobile)
  function nextMobileSlide() {
    if (mobileCurrentIndex < slides.length - 1) {
      mobileCurrentIndex++;
      updateMobilePosition();
    }
  }

  // Move to the previous slide (Mobile)
  function previousMobileSlide() {
    if (mobileCurrentIndex > 0) {
      mobileCurrentIndex--;
      updateMobilePosition();
    }
  }

  // Initialize the GSAP autoplay slider
  function initializeInvestSlider() {
    slidesInvest.forEach((slide) => {
      const contentWrapper = slide.querySelector('.invest-img-wrap');
      if (contentWrapper) {
        gsap.set(contentWrapper, {
          opacity: 0,
          filter: 'blur(40px)',
          zIndex: -1,
        });
      }
    });

    setActiveInvestSlide();

    autoplayTimer = setInterval(nextInvestSlide, autoplayInterval);
  }

  // Animate the active slide and corresponding dot
  function setActiveInvestSlide() {
    slidesInvest.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.invest-img-wrap');
      if (contentWrapper) {
        if (index === currentInvestIndex) {
          gsap.to(contentWrapper, {
            opacity: 1,
            filter: 'blur(0px)',
            zIndex: 1,
            duration: 2.8,
            ease: 'expo.out',
          });
        } else {
          gsap.to(contentWrapper, {
            opacity: 0,
            filter: 'blur(40px)',
            zIndex: -1,
            duration: 2.8,
            ease: 'expo.out',
          });
        }
      }
    });

    dotsInvest.forEach((dot, index) => {
      const star = dot.querySelector('.star');
      if (star) {
        if (index === currentInvestIndex) {
          gsap.to(star, {
            opacity: 1,
            scale: 1.5,
            duration: 0.8,
            ease: 'power2.out',
          });
          gsap.to(star, {
            rotation: 360,
            duration: autoplayInterval / 1000,
            ease: 'linear',
            repeat: -1,
          });
        } else {
          gsap.to(star, {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: 'power2.in',
          });
          gsap.killTweensOf(star, 'rotation');
          gsap.set(star, { rotation: 0 });
        }
      }
    });
  }

  // Move to the next slide
  function nextInvestSlide() {
    currentInvestIndex = (currentInvestIndex + 1) % slidesInvest.length;
    setActiveInvestSlide();
  }

  // Stop the slider (Clear Interval)
  function stopInvestSlider() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Add event listeners to dots for manual navigation
  dotsInvest.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentInvestIndex = index;
      setActiveInvestSlide();
      stopInvestSlider();
      autoplayTimer = setInterval(nextInvestSlide, autoplayInterval);
    });
  });

  // Initialize the sliders
  initializeCarousel();
  initializeInvestSlider();
}

export function stopAllAnimations() {
  stopInvestSlider();
  // Add any additional stop logic for other animations if needed
}
