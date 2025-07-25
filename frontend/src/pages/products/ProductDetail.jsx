import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Title from '../../components/common/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../store/slices/product.slice';
import { selectProduct } from '../../store/selectors';

// --- (SVG Components remain the same) ---
const StarIcon = ( { className } ) => ( <svg className={ className } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> );
const ChevronLeftIcon = ( props ) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }><path d="m15 18-6-6 6-6" /></svg> );


export default function ProductDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector( selectProduct );

    const [ selectedImage, setSelectedImage ] = useState( null );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    useEffect( () => {
        if ( id ) {
            dispatch( getProduct( id ) );
        }
    }, [ dispatch, id ] );

    useEffect( () => {
        if ( product?.images?.length > 0 ) {
            setSelectedImage( product.images[ 0 ].url );
        }
    }, [ product ] );

    if ( !product ) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black text-white">
                Loading product...
            </div>
        );
    }

    return (
        <div className="relative w-full bg-black text-white font-sans pt-24 md:pt-32 p-4 pb-20 overflow-x-hidden">
            <Title title={ product.name } />
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4a0e4e_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black"></div>

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                {/* Responsive grid with adjusted gaps */ }
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* --- Image Gallery (Now fully responsive) --- */ }
                    <motion.div variants={ itemVariants } className="flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnails */ }
                        <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-start">
                            { product.images?.map( ( img ) => (
                                <motion.div
                                    key={ img.public_id }
                                    className={ `w-16 h-16 md:w-20 md:h-20 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${selectedImage === img.url ? 'border-pink-500' : 'border-gray-700 hover:border-purple-400'}` }
                                    onClick={ () => setSelectedImage( img.url ) }
                                    whileHover={ { scale: 1.05 } }
                                >
                                    <img src={ img.url } alt={ `Thumbnail for ${product.name}` } className="w-full h-full object-cover" />
                                </motion.div>
                            ) ) }
                        </div>

                        {/* Main Image Container */ }
                        <div className="w-full h-80 md:h-full bg-gray-900/50 rounded-xl overflow-hidden">
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

                    {/* --- Product Info (Now fully responsive) --- */ }
                    <motion.div variants={ itemVariants } className="flex flex-col">
                        <Link to="/collection" className="flex items-center text-sm text-purple-400 hover:text-purple-300 mb-4">
                            <ChevronLeftIcon className="w-4 h-4 mr-1" />
                            Back to Collection
                        </Link>
                        {/* Responsive text size */ }
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3" style={ { fontFamily: "'Playfair Display', serif" } }>{ product.name }</h1>

                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex items-center gap-1 text-yellow-400">
                                { [ ...Array( Math.round( product.ratings || 0 ) ) ].map( ( _, i ) => <StarIcon key={ i } className="w-5 h-5" /> ) }
                            </div>
                            <span className="text-gray-400">{ product.ratings } ({ product.numOfReviews } reviews)</span>
                        </div>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">{ product.description }</p>

                        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                            ₹{ product.price?.toLocaleString( 'en-IN' ) || '0.00' }
                        </div>

                        { product.stock > 0 ? (
                            <p className="text-green-400 font-semibold mb-8">
                                { product.stock > 5 ? "In Stock" : `Only ${product.stock} left in stock!` }
                            </p>
                        ) : (
                            <p className="text-red-500 font-semibold mb-8">Out of Stock</p>
                        ) }

                        <motion.div
                            variants={ itemVariants }
                            className="border-2 border-dashed border-purple-800/60 rounded-lg p-6 text-center bg-purple-900/10 my-8"
                        >
                            <h3 className="font-semibold text-lg md:text-xl text-purple-300 mb-2">Acquire This Piece</h3>
                            <p className="text-gray-300">
                                To purchase this exclusive item, please contact our gallery for further details.
                            </p>
                            <p className="text-xl md:text-2xl mt-4 font-bold tracking-wider">
                                Call: <a href="tel:+911234567890" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:opacity-80 transition-opacity">+91 12345 67890</a>
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            <div className="border border-gray-800 rounded-lg p-4 md:p-5">
                                <h3 className="font-semibold text-lg mb-2 text-gray-200">Details & Care</h3>
                                <p className="text-gray-400"><strong>Materials:</strong> { product.details?.materials }</p>
                                <p className="text-gray-400"><strong>Dimensions:</strong> { product.details?.dimensions }</p>
                                <p className="text-gray-400 mt-2"><strong>Care:</strong> { product.details?.care }</p>
                            </div>
                            <div className="border border-gray-800 rounded-lg p-4 md:p-5">
                                <h3 className="font-semibold text-lg mb-2 text-gray-200">The Artisan's Touch</h3>
                                <p className="text-gray-400 italic">"{ product.artisan?.story }" - { product.artisan?.name }</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}