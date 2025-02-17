import gsap from 'gsap';
import SplitType from 'split-type';

export function launchpadLoadAnimation() {
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
    gsap.set('[data-a="lp"]', {
        y: '120%',
        opacity: 0,
        filter: 'blur(10px)'
    });
    
    gsap.set('[data-a="hero-txt"] .char', {
        x: '120%',
        y: '120%',
        opacity: 0,
        filter: 'blur(10px)'
    });
    
    gsap.set('[data-a="small-txt"]', {
        y: '120%',
        opacity: 0
    });

    // Timeline creation
    const tl = gsap.timeline();

    // Launchpad elements animation
    tl.to('[data-a="lp"]', {
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
    }, '<') // Start slightly before launchpad elements finish

    // Small text animation
    .to('[data-a="small-txt"]', {
        y: '0%',
        opacity: 1,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.1
    }, '<'); // Start slightly before hero text finishes

    return tl;
}