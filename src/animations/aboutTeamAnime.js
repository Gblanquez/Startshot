import gsap from 'gsap';
import SplitType from 'split-type';

export function aboutLoadAnimation() {
    // Initial setup for text splitting
    const heroText = document.querySelectorAll('[data-a="hero-txt"]');
    heroText.forEach(text => {
        new SplitType(text, { 
            types: ['chars', 'words', 'lines'],
            wordClass: 'word',
            lineClass: 'line'
        });
    });

    // Set initial states
    gsap.set('[data-b="ab"]', {
        y: '120%',
        opacity: 0,
        filter: 'blur(30px)'
    });
    
    gsap.set('[data-a="hero-txt"] .char', {
        x: '120%',
        y: '120%',
        opacity: 0,
        filter: 'blur(30px)'
    });
    
    gsap.set('[data-a="small-txt"]', {
        y: '120%',
        opacity: 0
    });

    gsap.set('.journey-path', {
        opacity: 0
    });

    // Timeline creation
    const tl = gsap.timeline();

    // Content animation
    tl.to('[data-b="ab"]', {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.14
    })

    // Hero text animation with random chars
    .to('[data-a="hero-txt"] .char', {
        x: '0%',
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'expo.out',
        stagger: {
            amount: 0.5,
            from: "random"
        }
    }, '<') // Start at the same time as content

    // Paragraph text animation
    .to('[data-a="small-txt"]', {
        y: '0%',
        opacity: 1,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.1
    }, '<') // Start at the same time

    // Journey path animation
    .to('.journey-path', {
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out'
    }, '<+=0.3'); // Start slightly after other animations

    return tl;
}
