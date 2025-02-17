import gsap from 'gsap';
import SplitType from 'split-type';

export function homeLoadAnimation() {



    // Initial setup for text splitting
    const smallText = document.querySelectorAll('[data-a="small-txt"]');
    
    // Clear any previous splits
    SplitType.revert(smallText);
    
    smallText.forEach(text => {
        new SplitType(text, { 
            types: ['words, chars'],
            charClass: 'char'
        });
    });

    // Set initial states for text animation
    gsap.set('[data-a="small-txt"] .char', {
        y: '120%',
        opacity: 0
    });

    // Timeline creation
    const tl = gsap.timeline();

    // Animate the home container to appear when the logo starts animating
    tl.to('[data-a="home"]', {
        opacity: 1,
        duration: 0.5,  // Smooth fade-in
        ease: 'expo.out'
    }, 0) // Start immediately

    // Animate the logo
    .fromTo('[data-a="logo"]', 
        {
            opacity: 0,
            filter: 'blur(10px)'
        },
        {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'expo.out'
        },
        0  // Explicit start time
    )

    // Animate small text characters
    .to('[data-a="small-txt"] .char', {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.02  
    }, 0);  // Start at the same time as logo animation

    return tl;
}