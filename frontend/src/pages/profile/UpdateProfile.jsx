import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { selectUser } from '../../store/selectors';
import { getUserProfile, updateUserProfile } from '../../store/slices/user.slice';
import { startLoading } from '../../store/slices/loader.slice';

const UserIcon = ( props ) =>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>


const EditIcon = ( props ) =>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>

const BackIcon = ( props ) =>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M19 12H5" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
    ;


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
    const [ avatarPreview, setAvatarPreview ] = useState( '' );
    console.log( currentUser )
    useEffect( () => {
        if ( !currentUser.bio ) {
            console.log( "DATA" )
            dispatch( getUserProfile() )
        }
    }, [ currentUser ] )
    useEffect( () => {
        if ( !currentUser?._id ) 
            navigate( '/' );
        else {
            setFormData( {
                name: currentUser.name || '',
                username: currentUser.username || '',
                bio: currentUser.bio || '',
            } );
            setAvatarPreview( currentUser.avatar?.url || '' );
        }
    }, [ currentUser, navigate ] );

    const handleInputChange = ( e ) => {
        setFormData( { ...formData, [ e.target.name ]: e.target.value } );
    };

    const handleFileChange = ( e ) => {
        const file = e.target.files[ 0 ];
        if ( file ) {
            setAvatarFile( file );
            setAvatarPreview( URL.createObjectURL( file ) );
        }
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startLoading() )
        const updateData = new FormData();
        updateData.append( 'name', formData.name );
        updateData.append( 'username', formData.username );
        updateData.append( 'bio', formData.bio );
        if ( avatarFile ) updateData.append( 'avatar', avatarFile );

        dispatch( updateUserProfile( updateData,navigate ) );
    };

    if ( !currentUser?._id ) {
        return <div className="min-h-screen w-full bg-black flex items-center justify-center text-white"><p>Redirecting...</p></div>;
    }

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
            <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse delay-1000"></div>

            <motion.div
                className="relative z-10 w-full max-w-2xl p-8 space-y-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                <button onClick={ () => navigate( '/profile' ) } className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/60 hover:bg-gray-800" title="Go Back">
                    <BackIcon className="w-6 h-6" />
                </button>

                <motion.div className="text-center" variants={ itemVariants }>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" style={ { fontFamily: "'Playfair Display', serif" } }>
                        Edit Your Profile
                    </h1>
                </motion.div>

                <motion.form className="space-y-6" variants={ itemVariants } onSubmit={ handleSubmit }>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <img src={ avatarPreview } alt="Avatar Preview" className="w-32 h-32 rounded-full object-cover border-4 border-purple-500" />
                            <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 p-2 bg-pink-500 rounded-full cursor-pointer hover:bg-pink-600 transition-colors">
                                <EditIcon className="w-5 h-5 text-white" />
                                <input id="avatar-upload" name="avatar" type="file" className="hidden" accept="image/*" onChange={ handleFileChange } />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-300 block mb-2">Full Name</label>
                            <div className="relative">
                                <UserIcon className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-full w-5 text-gray-400" />
                                <input id="name" name="name" type="text" value={ formData.name } onChange={ handleInputChange } className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="text-sm font-bold text-gray-300 block mb-2">Username</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">@</span>
                                <input id="username" name="username" type="text" value={ formData.username } onChange={ handleInputChange } className="w-full pl-7 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bio" className="text-sm font-bold text-gray-300 block mb-2">Bio</label>
                        <textarea id="bio" name="bio" rows="3" value={ formData.bio } onChange={ handleInputChange } className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Tell us about yourself..."></textarea>
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
