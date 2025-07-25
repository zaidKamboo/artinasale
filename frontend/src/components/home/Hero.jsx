import { useNavigate } from "react-router-dom";

import AnimatedText from "./portal-scene/AnimatedText";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <>
            <div className=" px-5 py-3 rounded-full bg-transparent backdrop-blur-lg">

                <AnimatedText
                    text="Artisanale"
                    className="text-6xl  md:text-8xl font-bold uppercase tracking-widest playfair-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    isGradient={ true }
                />
            </div>
            <p className="hero-desc mt-4 text-lg md:text-xl max-w-2xl">
                Discover handcrafted masterpieces that tell a story.
            </p>
            <button className=" mt-6 px-8 py-3 border-2 border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:shadow-[0_0_25px_rgba(138,43,226,1)]" onClick={ () => navigate( "/collection" ) } >
                Explore Collection
            </button>
        </>
    )
}