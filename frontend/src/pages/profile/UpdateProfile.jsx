import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";

// Icons
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaUserEdit, FaUser, FaAt } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { FiUploadCloud } from 'react-icons/fi';

// Components and Redux
import Title from "../../components/common/Title";
import { selectUser } from '../../store/selectors';
import { getUserProfile, updateUserProfile } from '../../store/slices/user.slice';
import { startLoading } from '../../store/slices/loader.slice';

export default function UpdateProfile() {
    const currentUser = useSelector( selectUser );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState( {
        name: '',
        username: '',
        bio: '',
    } );

    const [ avatarFile, setAvatarFile ] = useState( null );

    // Get profile if not loaded
    useEffect( () => {
        if ( !currentUser?.bio ) {
            dispatch( getUserProfile() );
        }
    }, [ currentUser, dispatch ] );

    // Redirect if not logged in and set form data
    useEffect( () => {
        if ( !currentUser?._id ) {
            navigate( '/login' );
        } else {
            setFormData( {
                name: currentUser.name || '',
                username: currentUser.username || '',
                bio: currentUser.bio || '',
            } );
        }
    }, [ navigate ] );

    const { getRootProps, getInputProps, isDragActive } = useDropzone( {
        accept: { 'image/*': [ '.jpeg', '.jpg', '.png', '.webp' ] },
        multiple: false,
        onDrop: ( acceptedFiles ) => {
            const file = acceptedFiles[ 0 ];
            if ( file ) {
                setAvatarFile( Object.assign( file, {
                    preview: URL.createObjectURL( file )
                } ) );
            }
        },
    } );

    useEffect( () => {
        return () => {
            if ( avatarFile ) {
                URL.revokeObjectURL( avatarFile.preview );
            }
        };
    }, [ avatarFile ] );

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( ( prev ) => ( {
            ...prev,
            [ name ]: value || '',
        } ) );
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startLoading() );

        const updateData = new FormData();
        updateData.append( 'name', formData.name );
        updateData.append( 'username', formData.username );
        updateData.append( 'bio', formData.bio );
        if ( avatarFile ) {
            updateData.append( 'avatar', avatarFile );
        }

        dispatch( updateUserProfile( updateData, navigate ) );
    };

    if ( !currentUser?._id ) {
        return <div className="min-h-screen w-full bg-black flex items-center justify-center text-white"><p>Redirecting...</p></div>;
    }

    const avatarPreview = avatarFile ? avatarFile.preview : currentUser.avatar?.url;

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen w-full bg-black text-white flex items-center justify-center font-sans p-4 relative overflow-hidden">
            <Title title="Edit Profile" />

            <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse delay-1000"></div>

            <motion.div
                className="relative z-10 w-full max-w-2xl p-8 space-y-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                <button
                    onClick={ () => navigate( '/profile' ) }
                    className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/60 hover:bg-gray-800"
                    title="Go Back"
                >
                    <IoArrowBackCircleOutline className="w-8 h-8" />
                </button>

                <motion.div className="text-center" variants={ itemVariants }>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center gap-3" style={ { fontFamily: "'Playfair Display', serif" } }>
                        <FaUserEdit />
                        Edit Your Profile
                    </h1>
                </motion.div>

                <motion.form className="space-y-6" variants={ itemVariants } onSubmit={ handleSubmit }>
                    <div className="flex flex-col items-center space-y-4">
                        <div { ...getRootProps() } className="relative w-32 h-32 rounded-full cursor-pointer group">
                            <input { ...getInputProps() } />
                            <img
                                src={ avatarPreview || `https://placehold.co/128x128/1f2937/6b7280?text=${formData.name?.charAt( 0 ) || 'A'}` }
                                alt="Avatar Preview"
                                className="w-full h-full rounded-full object-cover border-4 border-purple-500"
                            />
                            <div className={ `absolute inset-0 rounded-full bg-black/60 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${isDragActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}` }>
                                <FiUploadCloud className="w-8 h-8 mb-1" />
                                <p className="text-xs font-semibold">{ isDragActive ? 'Drop image here' : 'Change Photo' }</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-300 block mb-2">Full Name</label>
                            <div className="relative">
                                <FaUser className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-full w-5 text-gray-400" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={ formData.name || '' }
                                    onChange={ handleInputChange }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="text-sm font-bold text-gray-300 block mb-2">Username</label>
                            <div className="relative">
                                <FaAt className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-full w-5 text-gray-400" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={ formData.username || '' }
                                    onChange={ handleInputChange }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bio" className="text-sm font-bold text-gray-300 block mb-2 flex items-center gap-2">
                            <BsTextParagraph /> Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            value={ formData.bio || '' }
                            onChange={ handleInputChange }
                            className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div>
                        <motion.button
                            type="submit"
                            className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg transition-all duration-300 transform shadow-lg hover:shadow-purple-500/40"
                            whileHover={ { scale: 1.05, y: -2 } }
                            whileTap={ { scale: 0.98 } }
                        >
                            Save Changes
                        </motion.button>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}
