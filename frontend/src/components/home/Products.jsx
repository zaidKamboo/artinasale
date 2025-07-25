import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

const products = [
    {
        id: 1,
        name: "The Celestial Vase",
        description: "Molded from earthen clay and glazed with a pattern that mirrors the cosmos.",
        imageUrl: "/products/celestial-vase.jpeg",
    },
    {
        id: 2,
        name: "The Sunstone Bowl",
        description: "A hand-carved masterpiece that captures the warmth and radiance of a setting sun.", imageUrl: "/products/sunstone-bowl.jpeg",

    },
    {
        id: 3,
        name: "The Forest Mug",
        description: "Feel the tranquility of the woods with every sip from this moss-textured mug.",
        imageUrl: "/products/forest-mug.jpeg",

    },
];

export default function ProductShowcase() {
    const sectionRef = useRef( null );

    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            gsap.utils.toArray( '.product-card' ).forEach( ( card ) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 100,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'top 40%',
                            scrub: 1,
                        },
                    }
                );
            } );
        }, sectionRef );

        return () => ctx.revert();
    }, [] );

    return (
        <div
            ref={ sectionRef }
            className="bg-black/80 product-showcase-container min-h-screen w-full flex flex-col justify-center items-center text-white px-4 py-20 md:px-8 "
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r playfair-display from-purple-400 to-pink-600 uppercase">
                Our Collection
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 sm:mb-16 max-w-2xl text-center">
                Each piece is a unique blend of traditional techniques and modern aesthetics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-6xl">
                { products.map( ( { id, imageUrl, name, description } ) => (
                    <div
                        key={ id }
                        className="product-card bg-gray-900/80 backdrop-blur-sm border border-purple-900/50 rounded-xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-700/80"
                    >
                        <div className="overflow-hidden rounded-t-xl">
                            <img
                                src={ imageUrl }
                                alt={ name }
                                className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onError={ ( e ) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/111827/ffffff?text=Image+Not+Found'; } }
                            />
                        </div>
                        <div className="p-5 sm:p-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{ name }</h3>
                            <p className="text-sm sm:text-base text-gray-400 mb-6 h-12">{ description }</p>
                            <button className="w-full py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-purple-500/40">
                                View Details
                            </button>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
};

