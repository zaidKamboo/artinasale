import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


import { selectUser } from '../../store/selectors';
import { logoutUser } from '../../store/slices/user.slice';
import Title from '../../components/common/Title';
import { startLoading } from '../../store/slices/loader.slice';
import UserProducts from '../../components/proflle/UserProducts';
import ProfileInfo from '../../components/proflle/ProfileInfo';


export default function Profile() {
    const user = useSelector( selectUser );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => { if ( !user?._id ) navigate( '/' ); }, [ user, navigate ] );



    if ( !user?._id ) 
        return (
            <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
                <p>Redirecting...</p>
            </div>
        );

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
            <Title title="Profile" />
            <div className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-purple-900/40 rounded-full filter blur-[150px] opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-pink-900/40 rounded-full filter blur-[150px] opacity-30 animate-pulse delay-1000"></div>

            <motion.div
                className="container mx-auto max-w-4xl relative z-10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                {/* --- Profile Header --- */ }
                <ProfileInfo />

                {/* --- Profile Content (e.g., Posts, Gallery) --- */ }
                <motion.div className="mt-16" variants={ itemVariants }>
                    <UserProducts userId={ user?._id } />
                </motion.div>
            </motion.div>
        </div>
    );
}
