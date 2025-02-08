import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initializeMenuAnimations() {
  const menuWraps = document.querySelectorAll('.menu-l-wrap');
  const linkWraps = document.querySelectorAll('.g-n-links-wrap');
  const splitInstances = [];
  let hoverEnabled = false;
  let scrollTriggerInstance = null;

  if (!menuWraps.length || !linkWraps.length) {
    console.warn('Menu elements not found!');
    return;
  }

  // Initial states
  menuWraps.forEach((menuWrap) => {
    gsap.set(menuWrap, { width: 'auto' });
  });

  linkWraps.forEach((linkWrap) => {
    gsap.set(linkWrap, { 
      transformOrigin: 'left',
      scaleX: 1 
    });
  });

  function resetAnimations(forceOpen = false) {
    // Kill all running animations
    menuWraps.forEach((menuWrap, index) => {
      const linkWrap = linkWraps[index];
      gsap.killTweensOf([menuWrap, linkWrap]);
    });
    splitInstances.forEach(instance => {
      if (instance.chars) {
        gsap.killTweensOf(instance.chars);
      }
    });

    // Reset to appropriate state
    if (forceOpen || window.scrollY < window.innerHeight * 0.05) {
      openAllMenus();
    } else {
      closeAllMenus();
    }
  }

  function cleanup() {
    // Kill all GSAP animations
    gsap.killTweensOf([...menuWraps, ...linkWraps]);
    splitInstances.forEach(instance => {
      if (instance.chars) {
        gsap.killTweensOf(instance.chars);
      }
      instance.revert(); // Revert SplitType
    });
    splitInstances.length = 0;

    // Remove scroll trigger
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    // Remove event listeners (if needed)
    menuWraps.forEach(menuWrap => {
      menuWrap.removeEventListener('mouseenter', menuWrap._mouseenterHandler);
      menuWrap.removeEventListener('mouseleave', menuWrap._mouseleaveHandler);
    });
  }

  function openAllMenus() {
    hoverEnabled = false;
    menuWraps.forEach((menuWrap, index) => {
      const linkWrap = linkWraps[index];
      
      gsap.to(menuWrap, {
        width: 'auto',
        duration: 1.2,
        ease: 'expo.out'
      });
      
      gsap.fromTo(linkWrap, 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.out',
          onComplete: () => {
            setTimeout(() => {
              animateTextElements(menuWrap, true);
            }, 100);
          }
        }
      );
    });
  }

  function closeAllMenus() {
    hoverEnabled = true;
    menuWraps.forEach((menuWrap, index) => {
      const linkWrap = linkWraps[index];
      
      animateTextElements(menuWrap, false);
      
      setTimeout(() => {
        gsap.to(menuWrap, {
          width: '3.5vw',
          duration: 1.2,
          ease: 'expo.out'
        });
        
        gsap.to(linkWrap, {
          scaleX: 0,
          duration: 1.2,
          ease: 'expo.out'
        });
      }, 200);
    });
  }

  function animateTextElements(menuWrap, show) {
    const textElements = menuWrap.querySelectorAll('.d-nav');
    textElements.forEach((textElement) => {
      const splitText = splitInstances.find(
        (instance) => instance.elements[0] === textElement
      );
      if (splitText?.chars) {
        gsap.to(splitText.chars, {
          opacity: show ? 1 : 0,
          duration: 0.8,
          stagger: show ? 0.05 : 0,
          ease: 'power2.out',
          overwrite: true
        });
      }
    });
  }

  function setupHoverEffects() {
    menuWraps.forEach((menuWrap, index) => {
      const linkWrap = linkWraps[index];
      const textElements = menuWrap.querySelectorAll('.d-nav');
      
      textElements.forEach((textElement) => {
        if (!splitInstances.find(instance => instance.elements[0] === textElement)) {
          const splitText = new SplitType(textElement, { types: 'chars' });
          splitInstances.push(splitText);
          gsap.set(splitText.chars, { opacity: 0 });
        }
      });
      
      menuWrap._mouseenterHandler = () => {
        if (hoverEnabled) {
          gsap.killTweensOf([menuWrap, linkWrap]);
          
          gsap.to(menuWrap, {
            width: 'auto',
            duration: 1.2,
            ease: 'expo.out'
          });
          
          gsap.fromTo(linkWrap,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'expo.out',
              onComplete: () => {
                setTimeout(() => {
                  animateTextElements(menuWrap, true);
                }, 300);
              }
            }
          );
        }
      };
      
      menuWrap._mouseleaveHandler = () => {
        if (hoverEnabled) {
          gsap.killTweensOf([menuWrap, linkWrap]);
          
          animateTextElements(menuWrap, false);
          
          setTimeout(() => {
            gsap.to(menuWrap, {
              width: '3.5vw',
              duration: 1.2,
              ease: 'expo.out'
            });
            
            gsap.to(linkWrap, {
              scaleX: 0,
              duration: 1.2,
              ease: 'expo.out'
            });
          }, 300);
        }
      };

      menuWrap.addEventListener('mouseenter', menuWrap._mouseenterHandler);
      menuWrap.addEventListener('mouseleave', menuWrap._mouseleaveHandler);
    });
  }

  function setupTextHoverEffects() {
    document.querySelectorAll('.d-nav').forEach((dNav) => {
      const splitText = new SplitType(dNav, { types: 'chars' });
      splitInstances.push(splitText);
      const chars = splitText.chars;
      
      gsap.set(chars, { opacity: 1 });

      chars.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
          const targets = [chars[index - 2], chars[index - 1], char, chars[index + 1]].filter(Boolean);
          gsap.to(targets, {
            opacity: 0.6,
            backgroundImage: "linear-gradient(90deg, #316194, #7399C0)",
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
          const targets = [chars[index - 2], chars[index - 1], char, chars[index + 1]].filter(Boolean);
          gsap.to(targets, {
            opacity: 1,
            backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff)",
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
  }

  // Update scroll trigger initialization
  scrollTriggerInstance = ScrollTrigger.create({
    start: '5% top',
    onEnter: () => {
      resetAnimations(false);
    },
    onLeaveBack: () => {
      resetAnimations(true);
    }
  });

  // Add click handler for navigation links
  document.querySelectorAll('.d-nav').forEach(link => {
    link.addEventListener('click', () => {
      // Small delay to ensure proper state after navigation
      setTimeout(() => resetAnimations(), 100);
    });
  });

  // Setup all interactions
  setupHoverEffects();
  setupTextHoverEffects();

  // Return cleanup function
  return cleanup;
}

function initializeWhenReady() {
  const menuWraps = document.querySelectorAll('.menu-l-wrap');
  const linkWraps = document.querySelectorAll('.g-n-links-wrap');
  const navElements = document.querySelectorAll('.d-nav');

  if (!menuWraps.length || !linkWraps.length || !navElements.length) {
    setTimeout(initializeWhenReady, 300);
    return;
  }

  const allElementsHaveDimensions = [...menuWraps, ...linkWraps].every(el => 
    el.offsetWidth > 0 && el.offsetHeight > 0
  );

  if (!allElementsHaveDimensions) {
    setTimeout(initializeWhenReady, 300);
    return;
  }

  // Initialize animations once everything is ready
  const cleanup = initializeMenuAnimations();
  
  // Force initial state by dispatching scroll event
  const scrollEvent = new Event('scroll');
  window.dispatchEvent(scrollEvent);
    
  // Clean up before reinitializing on page transitions
  document.addEventListener('beforeunload', cleanup);
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWhenReady);
} else {
  initializeWhenReady();
}
