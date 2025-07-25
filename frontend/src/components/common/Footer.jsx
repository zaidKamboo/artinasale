import { useLayoutEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin( ScrollTrigger );

const InstagramIcon = ( { className } ) => (
    <svg className={ className } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const LinkedInIcon = ( { className } ) => (
    <svg className={ className } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const GitHubIcon = ( { className } ) => (
    <svg className={ className } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export default function Footer() {
    const footerRef = useRef( null );
    const location = useLocation(); // 1. Get the current location

    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            const footer = footerRef.current;

            const tl = gsap.timeline( {
                scrollTrigger: {
                    trigger: footer,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            } );

            tl.from( footer.querySelectorAll( ".animate-item" ), {
                opacity: 0,
                y: 50,
                skewY: 5,
                stagger: 0.2,
                ease: 'power4.out'
            } )
                .from( footer.querySelectorAll( ".border-line" ), {
                    scaleX: 0,
                    ease: 'power2.out',
                    duration: 1.5
                }, "<0.5" );

        }, footerRef );

        return () => {
            ctx.revert();
        };
    }, [ location.pathname ] );

    const navLinks = [
        { label: 'Collection', path: '/collection' },
        { label: 'Our Story', path: '/story' },
        { label: 'Contact', path: '/contact' },
    ];

    const socialLinks = [
        { Icon: InstagramIcon, href: '#' },
        { Icon: LinkedInIcon, href: '#' },
        { Icon: GitHubIcon, href: '#' },
    ];

    return (
        <footer ref={ footerRef } className="relative z-10 bg-black text-white pt-20 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 text-center md:text-left">
                    <div className="animate-item">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Artisanale
                        </h2>
                        <p className="text-gray-400 max-w-xs mx-auto md:mx-0 text-sm sm:text-base">
                            Breathing modern life into timeless Indian craftsmanship.
                        </p>
                    </div>
                    <div className="animate-item">
                        <h3 className="text-lg font-semibold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">Menu</h3>
                        <ul className="space-y-3">
                            { navLinks.map( link => (
                                <motion.li key={ link.path } whileHover={ { x: 5 } } transition={ { type: 'spring', stiffness: 400 } }>
                                    <NavLink to={ link.path } className="hover:text-pink-300 transition-colors">
                                        { link.label }
                                    </NavLink>
                                </motion.li>
                            ) ) }
                        </ul>
                    </div>
                    <div className="animate-item">
                        <h3 className="text-lg font-semibold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">Connect</h3>
                        <div className="flex justify-center md:justify-start space-x-6 mb-8">
                            { socialLinks.map( ( link, index ) => (
                                <motion.a
                                    key={ index }
                                    href={ link.href }
                                    className="text-gray-400 hover:text-pink-400 transition-colors"
                                    whileHover={ { scale: 1.2, y: -4 } }
                                    transition={ { type: 'spring', stiffness: 300 } }
                                >
                                    <link.Icon className="h-6 w-6" />
                                </motion.a>
                            ) ) }
                        </div>
                        <p className="text-gray-400 mb-2 text-sm sm:text-base">Join our newsletter:</p>
                        <form className="flex max-w-sm mx-auto md:mx-0">
                            <input type="email" placeholder="Your Email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
                            <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 transition-colors">
                                →
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-20 pt-8 relative text-center text-gray-500">
                    <div className="absolute top-0 left-0 w-full flex justify-center items-center">
                        <div className="border-line w-1/2 h-[2px] bg-gray-700 origin-right" />
                        <div className="border-line w-1/2 h-[2px] bg-gray-700 origin-left" />
                    </div>
                    <p className="animate-item text-xs sm:text-sm">&copy; { new Date().getFullYear() } Artisanale. All Rights Reserved. Crafted with ❤️ in India.</p>
                </div>
            </div>
        </footer>
    );
};

