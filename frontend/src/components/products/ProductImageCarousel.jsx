import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ProductImageCarousel = ( { images, name } ) => {
    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const [ isHovering, setIsHovering ] = useState( false );

    if ( !images || images.length <= 1 ) {
        const imageUrl = images?.[ 0 ]?.url || 'https://placehold.co/600x600/1f2937/ffffff?text=Not+Found';
        return (
            <img
                src={ imageUrl }
                alt={ name }
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                onError={ ( e ) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/1f2937/ffffff?text=Not+Found'; } }
            />
        );
    }

    useEffect( () => {
        if ( isHovering ) return;

        const timer = setInterval( () => {
            setCurrentIndex( ( prevIndex ) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 2500 );

        return () => clearInterval( timer );
    }, [ isHovering, images.length ] );

    const goToNext = ( e ) => {
        e.stopPropagation();
        setCurrentIndex( ( prev ) => ( prev === images.length - 1 ? 0 : prev + 1 ) );
    };

    const goToPrevious = ( e ) => {
        e.stopPropagation();
        setCurrentIndex( ( prev ) => ( prev === 0 ? images.length - 1 : prev - 1 ) );
    };

    return (
        <div
            className="relative w-full h-80 overflow-hidden"
            onMouseEnter={ () => setIsHovering( true ) }
            onMouseLeave={ () => setIsHovering( false ) }
        >
            <AnimatePresence initial={ false } mode="wait">
                <motion.img
                    key={ currentIndex }
                    src={ images[ currentIndex ].url }
                    alt={ `${name} ${currentIndex + 1}` }
                    className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    transition={ { opacity: { duration: 0.4 } } }
                    onError={ ( e ) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/1f2937/ffffff?text=Not+Found'; } }
                />
            </AnimatePresence>

            <button
                onClick={ goToPrevious }
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none"
                aria-label="Previous image"
            >
                &#10094;
            </button>
            <button
                onClick={ goToNext }
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none"
                aria-label="Next image"
            >
                &#10095;
            </button>
        </div>
    );
};


export default ProductImageCarousel;