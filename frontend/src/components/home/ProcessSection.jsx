import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TbAtom2Filled } from "react-icons/tb";
import { GiCrossedSwords } from "react-icons/gi";
import { FaHandSparkles } from "react-icons/fa6";
import { GiCutDiamond } from "react-icons/gi";

gsap.registerPlugin( ScrollTrigger );

const processSteps = [
    {
        icon: (
            <div className="animate-spin [animation-duration:7.5s] [animation-timing-function:linear]">
                <TbAtom2Filled size={ 100 } className="text-pink-500" />
            </div>
        ),
        title: "01. Shaping The Vision",
        description: "Every masterpiece begins with a raw idea and the finest, ethically sourced materials..."
    },
    {
        icon: (
            <div className="animate-clash">
                <GiCrossedSwords size={ 100 } className="text-pink-500" />
            </div>
        ),
        title: "02. Forged in Fire",    
        description: "The piece is then subjected to intense heat in the kiln..."
    },
    {
        icon: (
            <div className="animate-pulse [animation-duration:1.5s]">
                <FaHandSparkles size={ 100 } className="text-pink-500" />
            </div>
        ),
        title: "03. The Artist's Touch",
        description: "With a steady hand, our artisans apply intricate details and vibrant glazes..."
    },
    {
        icon: (
            <div className="animate-shimmer">
                <GiCutDiamond size={ 100 } className="text-pink-500" />
            </div>
        ),
        title: "04. Final Polish",
        description: "Careful inspection and polish to ensure perfection..."
    }
];

export default function ProcessSection() {
    const sectionRef = useRef( null );

    useEffect( () => {
        const ctx = gsap.context( () => {
            gsap.utils.toArray( ".step" ).forEach( ( step ) => {
                const icon = step.querySelector( ".step-icon" );
                const title = step.querySelector( ".step-title" );
                const desc = step.querySelector( ".step-desc" );

                const tl = gsap.timeline( {
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: true,
                    }
                } );

                tl.from( icon, { opacity: 0, y: 60, duration: 0.5, ease: "power2.out" } )
                    .from( title, { opacity: 0, y: 60, duration: 0.5, ease: "power2.out" }, "-=0.3" )
                    .from( desc, { opacity: 0, y: 60, duration: 0.5, ease: "power2.out" }, "-=0.3" );
            } );
        }, sectionRef );

        return () => ctx.revert();
    }, [] );

    return (
        <section ref={ sectionRef } className="relative text-white bg-black">
          

            <div className="sticky top-0 z-10 py-10 text-center backdrop-blur-md">
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-400 uppercase playfair-display">
                    Our Process
                </h2>
            </div>

            <div className="space-y-[25vh]">
                { processSteps.map( ( { icon, title, description }, index ) => (
                    <div
                        key={ index }
                        className={ `step bg-black min-h-screen flex flex-col justify-center items-center px-6 text-center` }
                    >
                        <div className="step-icon mb-6">{ icon }</div>
                        <h3 className="step-title text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            { title }
                        </h3>
                        <p className="step-desc text-lg md:text-xl text-gray-300 max-w-2xl">
                            { description }
                        </p>
                    </div>
                ) ) }
            </div>
        </section>
    );
};
