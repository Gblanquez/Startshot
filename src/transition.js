import barba from '@barba/core';
import gsap from 'gsap'
import { initializeAllAnimations, stopAllAnimations } from './home.js';
import { startAboutAnimations, stopAboutAnimations } from './about.js';
import { startTeamAnimations, stopTeamAnimations } from './team.js';

export default class Transition {
    constructor(options) {
        this.barba();
    }

    barba() {
        barba.init({
            debug: true,
            views: [
                {
                    namespace: 'home',
                    beforeEnter(data) {},
                    beforeLeave(data) {
                        stopAllAnimations();
                    },
                    afterEnter(data) {
                        initializeAllAnimations();
                    }
                },
                {
                    namespace: 'about',
                    beforeEnter(data) {},
                    beforeLeave(data) {
                        stopAboutAnimations();
                    },
                    afterEnter(data) {
                        startAboutAnimations();
                    }
                },
                {
                    namespace: 'team',
                    beforeEnter(data) {},
                    beforeLeave(data) {
                        stopTeamAnimations();
                    },
                    afterEnter(data) {
                        startTeamAnimations();
                    }
                },
                {
                    namespace: 'launchpad',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                },
                {
                    namespace: 'contact',
                    beforeEnter(data) {},
                    beforeLeave(data) {}
                }
            ],
            transitions: [
                {
                    name: 'home-transition',
                    sync: true,
                    to: { namespace: ['home'] },
                    leave({ current }) {
                        console.log(`Leaving home`);
                        stopAllAnimations();
                        const currentContainer = current.container;
                        gsap.set(currentContainer, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            zIndex: -1,
                            opacity: 0.7,
                        });
                        return gsap.to(currentContainer, {
                            opacity: 0.4,
                            y: '50%',
                            scale: 0.96,
                            duration: 1.6,
                            ease: 'expo.out',
                            onComplete: () => {
                                console.log('Leave animation complete');
                            },
                        });
                    },
                    enter({ next }) {
                        console.log(`Entering home`);
                        initializeAllAnimations();
                        const nextContainer = next.container;
                        gsap.set(nextContainer, {
                            position: 'fixed',
                            top: '110%',
                            left: '0',
                            width: '100%',
                        });
                        return gsap.to(nextContainer, {
                            top: '0%',
                            duration: 1.4,
                            ease: 'expo.out',
                            onComplete: () => {
                                gsap.set(nextContainer, {
                                    position: 'relative',
                                    top: '0',
                                });
                                console.log('Enter animation complete');
                            },
                        });
                    },
                },
                {
                    name: 'about-transition',
                    sync: true,
                    to: { namespace: ['about'] },
                    leave({ current }) {
                        console.log(`Leaving about`);
                        stopAboutAnimations();
                        const currentContainer = current.container;
                        gsap.set(currentContainer, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            zIndex: -1,
                            opacity: 0.7,
                        });
                        return gsap.to(currentContainer, {
                            opacity: 0.4,
                            y: '50%',
                            scale: 0.96,
                            duration: 1.6,
                            ease: 'expo.out',
                            onComplete: () => {
                                console.log('Leave animation complete');
                            },
                        });
                    },
                    enter({ next }) {
                        console.log(`Entering about`);
                        startAboutAnimations();
                        const nextContainer = next.container;
                        gsap.set(nextContainer, {
                            position: 'fixed',
                            top: '110%',
                            left: '0',
                            width: '100%',
                        });
                        return gsap.to(nextContainer, {
                            top: '0%',
                            duration: 1.4,
                            ease: 'expo.out',
                            onComplete: () => {
                                gsap.set(nextContainer, {
                                    position: 'relative',
                                    top: '0',
                                });
                                console.log('Enter animation complete');
                            },
                        });
                    },
                },
                {
                    name: 'team-transition',
                    sync: true,
                    to: { namespace: ['team'] },
                    leave({ current }) {
                        console.log(`Leaving team`);
                        stopTeamAnimations();
                        const currentContainer = current.container;
                        gsap.set(currentContainer, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            zIndex: -1,
                            opacity: 0.7,
                        });
                        return gsap.to(currentContainer, {
                            opacity: 0.4,
                            y: '50%',
                            scale: 0.96,
                            duration: 1.6,
                            ease: 'expo.out',
                            onComplete: () => {
                                console.log('Leave animation complete');
                            },
                        });
                    },
                    enter({ next }) {
                        console.log(`Entering team`);
                        startTeamAnimations();
                        const nextContainer = next.container;
                        gsap.set(nextContainer, {
                            position: 'fixed',
                            top: '110%',
                            left: '0',
                            width: '100%',
                        });
                        return gsap.to(nextContainer, {
                            top: '0%',
                            duration: 1.4,
                            ease: 'expo.out',
                            onComplete: () => {
                                gsap.set(nextContainer, {
                                    position: 'relative',
                                    top: '0',
                                });
                                console.log('Enter animation complete');
                            },
                        });
                    },
                },
            ],
        });
    }
}