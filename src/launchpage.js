import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';


export function startLaunchPageAnimations() {

    const ecoWrap = document.querySelector('.l-h-ecosystem-section')
    const ecoItems = document.querySelectorAll('.eco-list-wrap')

    const teamWrapper = document.querySelector('.m-team-wrapper');
    const teamElements = document.querySelectorAll('.h-xl.team, .body-m.team');
    const teamImages = document.querySelectorAll('.team-img-wrapper');

    // Create a GSAP timeline
    gsap.timeline({
        scrollTrigger: {
            trigger: ecoWrap,
            start: "top 60%", // Start when the top of ecoWrap hits the bottom of the viewport
            end: "bottom 70%",   // End when the bottom of ecoWrap hits the top of the viewport
            scrub: true          // Smooth scrubbing
        }
    })
    .fromTo(ecoItems, 
        { y: "120%" }, // Starting position
        { y: "0%", stagger: 0.3, duration: 1 } // Ending position with stagger and duration
    );


        // New animation for team elements
    

        if (!teamWrapper || teamElements.length === 0 || teamImages.length === 0) {
            console.error('Required team elements not found!');
            return;
        }
    
        // Initialize team animations
        const teamTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: teamWrapper,
                start: "top bottom",
                end: "bottom 70%",
                scrub: true,
            }
        });
    
        // Adjust SplitType configuration for better text wrapping
        teamElements.forEach((teamElement, index) => {
            // Adjust the types or other options if needed
            const splitText = new SplitType(teamElement, { types: 'words, chars' }); // Example: split by words and chars
            teamTimeline.fromTo(splitText.chars, 
                { opacity: 0, filter: 'blur(5px)' }, 
                { opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'expo.out' },
                index === 0 ? 0 : "<" // Start the next animation after the previous one
            );
        });
    
        // Animate body-m.team separately with character splitting
        const bodyMTeam = teamElements[1]; // Assuming body-m.team is the second element
        const splitBodyM = new SplitType(bodyMTeam, { types: 'chars' });
        teamTimeline.fromTo(splitBodyM.chars, 
            { opacity: 0, filter: 'blur(5px)' }, 
            { opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.05, ease: 'expo.out' },
            "+=0.05" // Start after h-xl.team animation
        );
    
        // Animate team-img-wrapper
        teamTimeline.fromTo(teamImages, 
            { y: "120%", filter: 'blur(20px)', opacity: 0 }, 
            { y: "0%", filter: 'blur(0px)', opacity: 1, duration: 1.4, stagger: 0.1, ease: 'expo.out' },
            "+=0.05"
        );

   

}



