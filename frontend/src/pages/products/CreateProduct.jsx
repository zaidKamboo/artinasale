import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
// import { createProduct } from '../store/slices/product.slice'; // Adjust path as needed

// --- SVG Icon Components ---
const UploadIcon = ( props ) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    { ...props }
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const BackIcon = ( props ) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    { ...props }
  >
    <path d="M19 12H5" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const XIcon = ( props ) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    { ...props }
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function CreateProduct() {
  const user = useSelector( ( state ) => state.user.userInfo ); // Assuming user info is in state.user.userInfo
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ formData, setFormData ] = useState( {
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "1",
    details: { materials: "", dimensions: "", care: "" },
    artisan: { name: "", story: "" },
  } );
  const [ images, setImages ] = useState( [] );

  // useEffect( () => {
  //   if ( !user?._id ) {
  //     navigate( "/login" );
  //   }
  // }, [ user, navigate ] );

  const { getRootProps, getInputProps, isDragActive } = useDropzone( {
    accept: { "image/*": [ ".jpeg", ".jpg", ".png", ".webp" ] },
    onDrop: ( acceptedFiles ) => {
      const newFiles = acceptedFiles.map( ( file ) =>
        Object.assign( file, {
          preview: URL.createObjectURL( file ),
        } )
      );
      setImages( ( prev ) => [ ...prev, ...newFiles ].slice( 0, 10 ) );
    },
  } );

  const removeImage = ( index ) => {
    setImages( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
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
    const productData = new FormData();

    productData.append( "name", formData.name );
    productData.append( "description", formData.description );
    productData.append( "price", formData.price );
    productData.append( "category", formData.category );
    productData.append( "stock", formData.stock );
    productData.append( "details", JSON.stringify( formData.details ) );
    productData.append( "artisan", JSON.stringify( formData.artisan ) );

    images.forEach( ( imageFile ) => {
      productData.append( "productImages", imageFile );
    } );

    // dispatch(createProduct(productData, navigate));
    console.log( "Submitting Product:", Object.fromEntries( productData ) );
    navigate( "/collection" );
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
          <BackIcon className="w-6 h-6" />
        </button>

        <motion.div className="text-center" variants={ itemVariants }>
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            style={ { fontFamily: "'Playfair Display', serif" } }
          >
            Add a New Masterpiece
          </h1>
          <p className="mt-2 text-gray-400">
            Fill in the details to showcase a new product in your collection.
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
            <div
              { ...getRootProps() }
              className={ `p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive
                ? "border-pink-500 bg-pink-900/20"
                : "border-gray-700 hover:border-purple-400"
                }` }
            >
              <input { ...getInputProps() } />
              <UploadIcon className="w-8 h-8 mx-auto text-gray-500 mb-2" />
              { isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              ) }
            </div>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              { images.map( ( file, index ) => (
                <div key={ file.name + index } className="relative aspect-square">
                  <img
                    src={ file.preview }
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={ () => removeImage( index ) }
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <XIcon />
                  </button>
                </div>
              ) ) }
            </div>
          </div>

          {/* Basic Info */ }
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              value={ formData.name }
              onChange={ handleInputChange }
              placeholder="Product Name"
              required
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="category"
              value={ formData.category }
              onChange={ handleInputChange }
              placeholder="Category (e.g., Decor, Apparel)"
              required
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <textarea
            name="description"
            value={ formData.description }
            onChange={ handleInputChange }
            placeholder="Product Description"
            rows="4"
            required
            className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="price"
              type="number"
              value={ formData.price }
              onChange={ handleInputChange }
              placeholder="Price (₹)"
              required
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="stock"
              type="number"
              value={ formData.stock }
              onChange={ handleInputChange }
              placeholder="Stock Quantity"
              required
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Details & Artisan */ }
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="materials"
              value={ formData.details.materials }
              onChange={ ( e ) => handleNestedChange( "details", e ) }
              placeholder="Materials"
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="dimensions"
              value={ formData.details.dimensions }
              onChange={ ( e ) => handleNestedChange( "details", e ) }
              placeholder='Dimensions (e.g., 12" x 12")'
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="artisan"
              value={ formData.artisan.name }
              onChange={ ( e ) => handleNestedChange( "artisan", e ) }
              placeholder="Artisan Name"
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="care"
              value={ formData.details.care }
              onChange={ ( e ) => handleNestedChange( "details", e ) }
              placeholder="Care Instructions"
              className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <textarea
            name="story"
            value={ formData.artisan.story }
            onChange={ ( e ) => handleNestedChange( "artisan", e ) }
            placeholder="Artisan's Story"
            rows="3"
            className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <motion.button
            type="submit"
            className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40"
            whileHover={ { scale: 1.02 } }
            whileTap={ { scale: 0.98 } }
          >
            Create Product
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
