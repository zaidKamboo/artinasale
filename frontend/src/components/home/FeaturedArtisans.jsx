import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );


const artisansData = [
    {
        id: 1,
        name: 'Riya Sharma',
        specialty: 'Master Potter',
        image: '/featured-artisans/riya-sharma.jpeg',
        quote: "Mitti ko aakar dena sirf ek kala nahi, ek ibadat hai."
    },
    {
        id: 2,
        name: 'Mohan Varma',
        specialty: 'Wood Craftsman',
        image: '/featured-artisans/mohan-varma.webp',
        quote: "Har lakdi ki apni kahani hoti hai, main bas use sunta hoon."
    },
    {
        id: 3,
        name: 'Inshada Bashir',
        specialty: 'Textile Weaver',
        image: '/featured-artisans/inshada-bashir.jpg',
        quote: "Dhaagon se main sirf kapda nahi, sapne bunti hoon."
    },
    {
        id: 4,
        name: 'Satish Gujral',
        specialty: 'Metal Sculptor',
        image: '/featured-artisans/satish-gujral.jpg',
        quote: "Dhaatu ko pighlaakar main usmein jaan daalta hoon."
    }
];
const extendedArtisansData = [ ...artisansData, ...artisansData ];

export default function FeaturedArtisans() {
    const marqueeRef = useRef( null );
    const componentRef = useRef( null );

    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            const cards = gsap.utils.toArray( '.artisan-card' );
            const marqueeTl = gsap.timeline( {
                repeat: -1,
            } );

            marqueeTl.to( marqueeRef.current, {
                xPercent: -50, duration: 25,
                ease: 'none',
            } );

            cards.forEach( card => {
                const details = card.querySelector( '.artisan-details' );

                card.addEventListener( 'mouseenter', () => {
                    marqueeTl.pause();
                    gsap.to( details, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' } );
                } );
                card.addEventListener( 'mouseleave', () => {
                    marqueeTl.play();
                    gsap.to( details, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' } );
                } );
            } );

        }, componentRef );

        return () => ctx.revert();
    }, [] );


    return (
        <div ref={ componentRef } className="bg-black text-white py-20 sm:py-28 px-4 w-full overflow-hidden">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <h2 className="text-4xl font-bold  sm:text-5xl lg:text-6xl bg-gradient-to-r from-pink-600 to-purple-400 text-transparent bg-clip-text uppercase playfair-display tracking-wider">
                    Meet Our Artisans
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                    The hands and hearts behind every masterpiece.
                </p>
            </div>

            <div className="w-full max-w-none mx-auto overflow-hidden">
                <div ref={ marqueeRef } className="flex w-max">
                    { extendedArtisansData.map( ( artisan, index ) => (
                        <div
                            key={ `${artisan.id}-${index}` }
                            className="artisan-card relative bg-gray-900 rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 shadow-lg shrink-0 h-96 w-[80vw] sm:w-80 md:w-[350px] mx-3 md:mx-4"
                        >
                            <img className="w-full h-full object-cover" src={ artisan.image } alt={ artisan.name } onError={ ( e ) => { e.target.onerror = null; e.target.src = 'https://placehold.co/350x384/111827/ffffff?text=Image+Not+Found'; } } />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                            <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                                <h3 className="text-2xl font-bold text-white">{ artisan.name }</h3>
                                <div className="artisan-details opacity-0 transform translate-y-2">
                                    <p className="text-md mt-2 font-semibold text-purple-300">{ artisan.specialty }</p>
                                    <p className="mt-1 text-sm text-gray-300 italic">
                                        "{ artisan.quote }"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) ) }
                </div>
            </div>
        </div>
    );
};

