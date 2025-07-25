import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { selectUser } from '../../store/selectors'; // Adjust path as needed
import { logoutUser } from '../../store/slices/user.slice'; // Make sure this path is correct

// --- SVG Icon Components ---
const SettingsIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const LogoutIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
const DefaultProfileIcon = ( { className } ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ className }>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);


export default function Profile() {
    const user = useSelector( selectUser );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => { if ( !user?._id ) navigate( '/' ); }, [ user, navigate ] );

    const handleLogout = () => {
        dispatch( logoutUser( navigate ) );
        navigate( '/' );
    };

    if ( !user?._id ) {
        return (
            <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
                <p>Redirecting...</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <div className="relative w-full bg-black text-white font-sans pt-24 md:pt-32 p-4 pb-20 overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-purple-900/40 rounded-full filter blur-[150px] opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-pink-900/40 rounded-full filter blur-[150px] opacity-30 animate-pulse delay-1000"></div>

            <motion.div
                className="container mx-auto max-w-4xl relative z-10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                {/* --- Profile Header --- */ }
                <motion.div className="flex flex-col md:flex-row items-center w-full" variants={ itemVariants }>
                    <div className="relative flex-shrink-0">
                        { user.avatar?.public_id ? (
                            <img src={ user.avatar.url } alt={ user.name } className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500 shadow-lg" />
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-purple-500 shadow-lg bg-gray-800 flex items-center justify-center">
                                <DefaultProfileIcon className="w-20 h-20 text-gray-500" />
                            </div>
                        ) }
                    </div>
                    <div className="w-full md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-white break-words" style={ { fontFamily: "'Playfair Display', serif" } }>{ user.name }</h1>
                        <p className="text-lg text-gray-400 mt-1 break-all">@{ user.username }</p>
                        <p className="text-md text-gray-300 mt-4 max-w-lg mx-auto md:mx-0">{ user.bio || 'No bio yet. Click edit to add one!' }</p>
                        <div className="flex items-center justify-center md:justify-start space-x-6 mt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{ user.followers?.length || 0 }</p>
                                <p className="text-sm text-gray-400">Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{ user.following?.length || 0 }</p>
                                <p className="text-sm text-gray-400">Following</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-shrink-0 space-x-3 mt-6 md:mt-0 md:ml-auto">
                        <motion.button className="p-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors" whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.95 } } title="Edit Profile" onClick={ () => navigate( `/profile/${user?._id}` ) } >
                            <SettingsIcon className="w-5 h-5" />
                        </motion.button>
                        <motion.button onClick={ handleLogout } className="p-3 bg-red-900/40 border border-red-700 rounded-lg text-white hover:bg-red-900/70 transition-colors" whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.95 } } title="Logout">
                            <LogoutIcon className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* --- Profile Content (e.g., Posts, Gallery) --- */ }
                <motion.div className="mt-16" variants={ itemVariants }>
                    <div className="w-full border-t border-gray-800"></div>
                    <div className="text-center py-20">
                        <p className="text-gray-500">User's content would appear here.</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
