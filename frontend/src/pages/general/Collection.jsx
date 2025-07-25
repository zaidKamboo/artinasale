
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../components/common/Title';
import { selectProducts } from '../../store/selectors';
import { useEffect, useState } from 'react';
import { getProducts } from '../../store/slices/products.slice';
import { useNavigate } from 'react-router-dom';
import { startLoading } from '../../store/slices/loader.slice';
import ProductImageCarousel from '../../components/products/ProductImageCarousel';





const CollectionScene = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
);


export default function Collection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect( () => {
        dispatch( startLoading() );
        dispatch( getProducts() );
    }, [ dispatch ] )
    const products = useSelector( selectProducts );

    console.log( products )


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };


    return (
        <>
            <Title title="Collection" />
            <motion.div
                className="w-full text-white py-16 px-4 sm:px-8 bg-black relative"
                initial="hidden"
                animate="visible"
                variants={ containerVariants }
            >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-900/40 rounded-full filter blur-[120px] opacity-50 animate-pulse"></div>
                    <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-pink-900/40 rounded-full filter blur-[120px] opacity-50 animate-pulse delay-1000"></div>
                    <CollectionScene />
                </div>
                <motion.header className="text-center mb-16" variants={ itemVariants }>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500" style={ { fontFamily: "'Playfair Display', serif" } }>
                        Our Collection
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Explore a curated selection of unique, handcrafted items from the world's most talented artisans.
                    </p>
                </motion.header>

                <motion.div
                    className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"

                    variants={ containerVariants }
                >
                    { products?.map( ( product ) => (
                        <motion.div
                            key={ product._id }
                            onClick={ () => navigate( `/product-details/${product?._id}` ) }
                            className="hover:cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-md border border-purple-900/30 shadow-2xl shadow-purple-500/10"
                            variants={ cardVariants }
                            whileHover={ { y: -8, transition: { duration: 0.3 } } }
                        >
                            <ProductImageCarousel images={ product.images } name={ product.name } />

                            <div className="flex flex-col justify-end flex-grow p-4 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-xl font-bold text-white">{ product.name }</h3>
                                <p className="text-sm text-purple-300">by { product.artisan.name }</p>
                                <p className="mt-1 text-sm text-gray-400">"{ product.description }"</p>
                            </div>
                        </motion.div>
                    ) ) }
                </motion.div>
            </motion.div>
        </>
    );
}
