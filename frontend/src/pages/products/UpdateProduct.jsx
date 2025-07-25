import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

import Title from "../../components/common/Title";
import { selectProduct, selectUser } from '../../store/selectors';
import { getProduct, updateProduct } from '../../store/slices/product.slice';
import { startLoading } from '../../store/slices/loader.slice';

export default function UpdateProduct() {
    const { id: productId } = useParams();

    const user = useSelector( selectUser );
    const product = useSelector( selectProduct );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState( {
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        details: { materials: "", dimensions: "", care: "" },
        artisan: { name: "", story: "" },
    } );

    const [ existingImages, setExistingImages ] = useState( [] );
    const [ newImages, setNewImages ] = useState( [] );

    useEffect( () => {
        dispatch( startLoading() )
        dispatch( getProduct( productId ) );
    }, [ dispatch, productId ] );

    useEffect( () => {
        if ( product ) {
            setFormData( {
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                category: product.category || "",
                stock: product.stock || "",
                details: product.details || { materials: "", dimensions: "", care: "" },
                artisan: product.artisan || { name: "", story: "" },
            } );
            setExistingImages( product.images || [] );
        }
    }, [ product ] );

    const { getRootProps, getInputProps, isDragActive } = useDropzone( {
        accept: { "image/*": [ ".jpeg", ".jpg", ".png", ".webp" ] },
        onDrop: ( acceptedFiles ) => {
            const newFilesWithPreview = acceptedFiles.map( ( file ) =>
                Object.assign( file, {
                    preview: URL.createObjectURL( file ),
                } )
            );
            setNewImages( ( prev ) => [ ...prev, ...newFilesWithPreview ].slice( 0, 10 - existingImages.length ) );
        },
    } );

    const removeNewImage = ( index ) => {
        setNewImages( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
    };

    const removeExistingImage = ( public_id ) => {
        setExistingImages( ( prev ) => prev.filter( ( img ) => img.public_id !== public_id ) );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
    };

    const handleNestedChange = ( group, e ) => {
        const { name, value } = e.target;
        setFormData( ( prev ) => ( {
            ...prev,
            [ group ]: { ...prev[ group ], [ name ]: value },
        } ) );
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startLoading() );
        const productData = new FormData();

        productData.append( "name", formData.name );
        productData.append( "description", formData.description );
        productData.append( "price", formData.price );
        productData.append( "category", formData.category );
        productData.append( "stock", formData.stock );
        productData.append( "details", JSON.stringify( formData.details ) );
        productData.append( "artisan", JSON.stringify( formData.artisan ) );
        productData.append( "existingImages", JSON.stringify( existingImages ) );

        newImages.forEach( ( imageFile ) => {
            productData.append( "productImages", imageFile );
        } );
        console.log(productId)
        dispatch( updateProduct(  productId, productData, navigate  ) );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen w-full bg-black text-white flex items-center justify-center font-sans p-4 relative overflow-hidden">
            <Title title="Edit Product" />
            <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse delay-1000"></div>

            <motion.div
                className="relative z-10 w-full max-w-4xl my-16 p-8 space-y-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                <button
                    onClick={ () => navigate( -1 ) }
                    className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/60 hover:bg-gray-800"
                    title="Go Back"
                >
                    <IoArrowBackCircleOutline className="w-8 h-8" />
                </button>

                <motion.div className="text-center" variants={ itemVariants }>
                    <h1
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                        style={ { fontFamily: "'Playfair Display', serif" } }
                    >
                        Update Your Masterpiece
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Refine the details of your product to keep it up-to-date.
                    </p>
                </motion.div>

                <motion.form
                    className="space-y-6"
                    variants={ itemVariants }
                    onSubmit={ handleSubmit }
                >
                    {/* Image Upload */ }
                    <div>
                        <label className="text-sm font-bold text-gray-300 block mb-2">
                            Product Images
                        </label>
                        {/* Image Previews */ }
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            { existingImages.map( ( img ) => (
                                <div key={ img.public_id } className="relative aspect-square">
                                    <img src={ img.url } alt="Existing" className="w-full h-full object-cover rounded-md" />
                                    <button type="button" onClick={ () => removeExistingImage( img.public_id ) } className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                                        <CgClose className="w-4 h-4" />
                                    </button>
                                </div>
                            ) ) }
                            { newImages.map( ( file, index ) => (
                                <div key={ file.name + index } className="relative aspect-square">
                                    <img src={ file.preview } alt="Preview" className="w-full h-full object-cover rounded-md" />
                                    <button type="button" onClick={ () => removeNewImage( index ) } className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                                        <CgClose className="w-4 h-4" />
                                    </button>
                                </div>
                            ) ) }
                        </div>
                        {/* Dropzone */ }
                        <div
                            { ...getRootProps() }
                            className={ `mt-4 p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? "border-pink-500 bg-pink-900/20" : "border-gray-700 hover:border-purple-400"}` }
                        >
                            <input { ...getInputProps() } />
                            <FiUploadCloud className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                            <p>Add new images here, or click to select files</p>
                        </div>
                    </div>

                    {/* Form Fields (same as create product) */ }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="name" value={ formData.name } onChange={ handleInputChange } placeholder="Product Name" required className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input name="category" value={ formData.category } onChange={ handleInputChange } placeholder="Category" required className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <textarea name="description" value={ formData.description } onChange={ handleInputChange } placeholder="Product Description" rows="4" required className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="price" type="number" value={ formData.price } onChange={ handleInputChange } placeholder="Price (₹)" required className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input name="stock" type="number" value={ formData.stock } onChange={ handleInputChange } placeholder="Stock Quantity" required className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="materials" value={ formData.details.materials } onChange={ ( e ) => handleNestedChange( "details", e ) } placeholder="Materials" className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input name="dimensions" value={ formData.details.dimensions } onChange={ ( e ) => handleNestedChange( "details", e ) } placeholder='Dimensions (e.g., 12" x 12")' className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input name="name" value={ formData.artisan.name } onChange={ ( e ) => handleNestedChange( "artisan", e ) } placeholder="Artisan Name" className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input name="care" value={ formData.details.care } onChange={ ( e ) => handleNestedChange( "details", e ) } placeholder="Care Instructions" className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <textarea name="story" value={ formData.artisan.story } onChange={ ( e ) => handleNestedChange( "artisan", e ) } placeholder="Artisan's Story" rows="3" className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>

                    <motion.button
                        type="submit"
                        className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40"
                        whileHover={ { scale: 1.02 } }
                        whileTap={ { scale: 0.98 } }
                    >
                        Update Product
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}