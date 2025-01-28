import gsap from 'gsap'
import SplitType from 'split-type'

export function initFooterAnimation() {
  const footerLinks = document.querySelectorAll('.f-link');

  footerLinks.forEach(footerLink => {
    const fNav = footerLink.querySelector('.f-nav');
    if (!fNav) return;

    // Initialize SplitType
    const splitText = new SplitType(fNav, { types: 'chars' });
    const chars = splitText.chars;

    // Reset any previous text transform
    chars.forEach(char => {
      char.style.textTransform = "none";
    });

    // Setup hover interactions
    chars.forEach((char, index) => {
      const handleMouseEnter = () => {
        const targets = [chars[index - 1], char, chars[index + 1]].filter(Boolean);
        
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
      };

      const handleMouseLeave = () => {
        const targets = [chars[index - 1], char, chars[index + 1]].filter(Boolean);
        
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
      };

      char.addEventListener('mouseenter', handleMouseEnter);
      char.addEventListener('mouseleave', handleMouseLeave);
    });
  });
}

document.addEventListener('DOMContentLoaded', initFooterAnimation);

