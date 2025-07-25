import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- SVG Icon Components ---
const StarIcon = ( { className } ) => (
    <svg className={ className } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
const PlusIcon = ( { className } ) => (
    <svg className={ className } xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const MinusIcon = ( { className } ) => (
    <svg className={ className } xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const ChevronLeftIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }><path d="m15 18-6-6 6-6" /></svg>
);

// --- Placeholder Data ---
const product = {
    name: "Hand-Painted 'Pichwai' Wooden Tray",
    price: 3499,
    rating: 4.8,
    reviews: 72,
    description: "A stunning wooden tray, meticulously hand-painted by master artisans from Rajasthan. Featuring the traditional Pichwai art form, this piece depicts serene scenes of nature and mythology. Perfect as a decorative centerpiece or for serving guests with a touch of royal elegance.",
    images: [
        "https://placehold.co/800x800/1a1a1a/f0f0f0?text=Main+View",
        "https://placehold.co/800x800/3a2a3a/f0f0f0?text=Detail+1",
        "https://placehold.co/800x800/2a3a3a/f0f0f0?text=Detail+2",
        "https://placehold.co/800x800/3a3a2a/f0f0f0?text=In+Use",
    ],
    details: {
        materials: "Teak Wood, Natural Pigment Colors, Clear Varnish",
        dimensions: "16\" (L) x 12\" (W) x 2\" (H)",
        care: "Wipe with a soft, dry cloth. Avoid direct contact with water."
    },
    artisan: {
        name: "Ramesh Sharma",
        story: "Ramesh, a third-generation artist from Nathdwara, has dedicated his life to preserving the intricate art of Pichwai painting. Each brushstroke is a testament to his family's legacy and passion."
    }
};

export default function ProductDetails() {
    const [ selectedImage, setSelectedImage ] = useState( product.images[ 0 ] );
    const [ quantity, setQuantity ] = useState( 1 );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const handleQuantityChange = ( amount ) => {
        setQuantity( prev => Math.max( 1, prev + amount ) );
    };

    return (
        <div className="relative w-full bg-black text-white font-sans pt-24 md:pt-32 p-4 pb-20 overflow-x-hidden">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4a0e4e_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black"></div>

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery */ }
                    <motion.div variants={ itemVariants } className="flex flex-col-reverse md:flex-row gap-4">
                        <div className="flex md:flex-col gap-3 justify-center">
                            { product.images.map( ( img, index ) => (
                                <motion.div
                                    key={ index }
                                    className={ `w-16 h-16 md:w-20 md:h-20 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-300 ${selectedImage === img ? 'border-pink-500' : 'border-gray-700 hover:border-purple-400'}` }
                                    onClick={ () => setSelectedImage( img ) }
                                    whileHover={ { scale: 1.05 } }
                                >
                                    <img src={ img } alt={ `Thumbnail ${index + 1}` } className="w-full h-full object-cover" />
                                </motion.div>
                            ) ) }
                        </div>
                        <div className="flex-grow w-full aspect-square bg-gray-900/50 rounded-xl overflow-hidden">
                            <motion.img
                                key={ selectedImage }
                                src={ selectedImage }
                                alt="Selected Product"
                                className="w-full h-full object-cover"
                                initial={ { opacity: 0.5 } }
                                animate={ { opacity: 1 } }
                                transition={ { duration: 0.4 } }
                            />
                        </div>
                    </motion.div>

                    {/* Product Info */ }
                    <motion.div variants={ itemVariants } className="flex flex-col">
                        <Link to="/collection" className="flex items-center text-sm text-purple-400 hover:text-purple-300 mb-4">
                            <ChevronLeftIcon className="w-4 h-4 mr-1" />
                            Back to Collection
                        </Link>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3" style={ { fontFamily: "'Playfair Display', serif" } }>{ product.name }</h1>

                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex items-center gap-1 text-yellow-400">
                                { [ ...Array( 5 ) ].map( ( _, i ) => <StarIcon key={ i } className="w-5 h-5" /> ) }
                            </div>
                            <span className="text-gray-400">{ product.rating } ({ product.reviews } reviews)</span>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-6">{ product.description }</p>

                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
                            ₹{ product.price.toLocaleString( 'en-IN' ) }
                        </div>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center border border-gray-700 rounded-lg">
                                <button onClick={ () => handleQuantityChange( -1 ) } className="p-3 text-gray-400 hover:text-white"><MinusIcon /></button>
                                <span className="px-4 text-lg font-semibold">{ quantity }</span>
                                <button onClick={ () => handleQuantityChange( 1 ) } className="p-3 text-gray-400 hover:text-white"><PlusIcon /></button>
                            </div>
                            <motion.button
                                className="flex-grow py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40"
                                whileHover={ { scale: 1.03 } }
                                whileTap={ { scale: 0.98 } }
                            >
                                Add to Cart
                            </motion.button>
                        </div>

                        {/* Accordion for Details */ }
                        <div className="space-y-4">
                            <div className="border border-gray-800 rounded-lg p-4">
                                <h3 className="font-semibold text-lg mb-2 text-gray-200">Materials & Dimensions</h3>
                                <p className="text-gray-400">{ product.details.materials }</p>
                                <p className="text-gray-400">{ product.details.dimensions }</p>
                            </div>
                            <div className="border border-gray-800 rounded-lg p-4">
                                <h3 className="font-semibold text-lg mb-2 text-gray-200">The Artisan's Touch</h3>
                                <p className="text-gray-400 italic">"{ product.artisan.story }" - { product.artisan.name }</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

