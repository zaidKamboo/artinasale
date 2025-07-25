import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { selectLoader, selectProducts } from '../../store/selectors';
// Import the deleteProduct action
import { getUserProducts } from '../../store/slices/products.slice';
import ProductImageCarousel from '../products/ProductImageCarousel';

gsap.registerPlugin( ScrollTrigger );

export default function UserProducts( { userId } ) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector( selectProducts );
    const { isLoading } = useSelector( selectLoader );

    const [ showDeleteModal, setShowDeleteModal ] = useState( false );
    const [ productToDelete, setProductToDelete ] = useState( null );

    useEffect( () => {
        if ( !userId ) return;
        dispatch( getUserProducts( userId ) );
    }, [ userId, dispatch ] );

    useEffect( () => {
        if ( isLoading || products.length === 0 ) return;

        const ctx = gsap.context( () => {
            const cards = gsap.utils.toArray( '.product-card' );

            cards.forEach( ( card ) => {
                gsap.fromTo( card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'bottom 10%',
                            toggleActions: 'play reverse play reverse',
                        }
                    }
                );
            } );
        } );

        return () => ctx.revert();

    }, [ isLoading, products ] );


    const handleDeleteClick = ( product ) => {
        setProductToDelete( product );
        setShowDeleteModal( true );
    };

    const confirmDelete = () => {
        if ( !productToDelete ) return;
        // Implemented the delete functionality
        // dispatch( deleteProduct( productToDelete._id ) ).then( () => {
        //     toast.success( `"${productToDelete.name}" was successfully deleted.` );
        //     setShowDeleteModal( false );
        //     setProductToDelete( null );
        //     // Re-fetch products to update the list instantly
        //     dispatch( getUserProducts( userId ) );
        // } );
    };

    if ( isLoading && products.length === 0 ) {
        return <div className="text-center py-20 text-gray-400">Loading your creations...</div>;
    }

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8" style={ { fontFamily: "'Playfair Display', serif" } }>Your Creations</h2>
            { products.length === 0 ? (
                <div className="text-center py-20 border-t border-gray-800">
                    <p className="text-gray-500 text-lg">You haven't created any products yet.</p>
                    <button onClick={ () => navigate( '/create-product' ) } className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40 transition-all duration-300">
                        Create Your First Masterpiece
                    </button>
                </div>
            ) : (
                // Note: The ref is no longer needed on the grid container
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    { products?.map( product => (
                        <div key={ product._id } className="product-card bg-gray-900/70 rounded-2xl overflow-hidden border border-gray-800 flex flex-col group opacity-0">
                            <div className="relative overflow-hidden">
                                <ProductImageCarousel images={ product.images } />
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-xl text-white truncate">{ product.name }</h3>
                                <p className="text-lg text-purple-400 font-semibold mt-1">₹{ product.price.toLocaleString( 'en-IN' ) }</p>
                                <p className={ `text-sm font-bold mt-2 ${product.stock > 0 ? 'text-green-400' : 'text-red-500'}` }>
                                    { product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }
                                </p>
                                <div className="mt-auto pt-5 flex justify-end items-center space-x-3">
                                    <Link to={ `/product-details/${product._id}` } className="p-2 text-gray-400 hover:text-purple-400 transition-colors" title="View"><FiEye size={ 20 } /></Link>
                                    <Link to={ `/update-product/${product._id}` } className="p-2 text-gray-400 hover:text-blue-400 transition-colors" title="Edit"><TbEditCircle size={ 22 } /></Link>
                                    <button onClick={ () => handleDeleteClick( product ) } className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete"><FiTrash2 size={ 20 } /></button>
                                </div>
                            </div>
                        </div>
                    ) ) }
                </div>
            ) }

            {/* Delete Confirmation Modal */ }
            <AnimatePresence>
                { showDeleteModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        exit={ { opacity: 0 } }
                    >
                        <motion.div
                            className="bg-gray-900 rounded-2xl p-8 border border-gray-700 w-full max-w-md text-center shadow-2xl shadow-purple-900/30"
                            initial={ { scale: 0.9, opacity: 0, y: 30 } }
                            animate={ { scale: 1, opacity: 1, y: 0 } }
                            exit={ { scale: 0.9, opacity: 0, y: 30 } }
                            transition={ { duration: 0.3, ease: 'easeOut' } }
                        >
                            <h3 className="text-2xl font-bold text-white">Confirm Deletion</h3>
                            <p className="text-gray-400 mt-3">
                                Are you sure you want to delete <span className="font-semibold text-purple-300">"{ productToDelete?.name }"</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-center space-x-4 mt-8">
                                <button onClick={ () => setShowDeleteModal( false ) } className="px-8 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
                                <button onClick={ confirmDelete } className="px-8 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">Delete</button>
                            </div>
                        </motion.div>
                    </motion.div>
                ) }
            </AnimatePresence>
        </div>
    );
};