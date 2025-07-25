import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { PiArrowCircleLeftDuotone } from "react-icons/pi";

import Title from '../../components/common/Title';
import { registerUser } from '../../store/slices/user.slice'; // Adjust path as needed
import { startLoading } from '../../store/slices/loader.slice';

// --- SVG Icon Components ---
const Mail = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const Lock = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);
const UserIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const Eye = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const EyeOff = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

export default function Signup() {
    const [ showPassword, setShowPassword ] = useState( false );
    const [ formData, setFormData ] = useState( {
        name: '',
        username: '',
        email: '',
        password: '',
    } );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector( ( state ) => state.user );

    useEffect( () => {
        if ( userInfo ) {
            navigate( '/' );
        }
    }, [ navigate, userInfo ] );

    const handleGoBack = () => navigate( -1 );

    const handleChange = e =>
        setFormData( { ...formData, [ e.target.name ]: e.target.value } );

    const handleSubmit = e => {
        dispatch( startLoading() )
        e.preventDefault();
        dispatch( registerUser( formData, navigate ) );
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1, scale: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen w-full bg-black text-white flex items-center justify-center font-sans p-4 relative overflow-hidden">
            <Title title="Sign-Up" />
            <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse delay-1000"></div>

            <motion.div
                className="relative z-10 w-full max-w-md p-8 space-y-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                variants={ containerVariants }
                initial="hidden"
                animate="visible"
            >
                <button onClick={ handleGoBack } className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/60 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-black" title="Go Back">
                    <PiArrowCircleLeftDuotone className="w-7 h-7 text-pink-400" />
                </button>

                <motion.div className="text-center pt-8" variants={ itemVariants }>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" style={ { fontFamily: "'Playfair Display', serif" } }>
                        Create Your Account
                    </h1>
                    <p className="mt-2 text-gray-400">Join our community and start your journey.</p>
                </motion.div>

                <motion.form className="space-y-5" variants={ itemVariants } onSubmit={ handleSubmit }>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-300 block mb-2">Full Name</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="name" name="name" type="text" required className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" placeholder="John Doe" value={ formData.name } onChange={ handleChange } />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="text-sm font-bold text-gray-300 block mb-2">Username</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="username" name="username" type="text" required className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" placeholder="johndoe" value={ formData.username } onChange={ handleChange } />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-300 block mb-2">Email address</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="email" name="email" type="email" autoComplete="email" required className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" placeholder="you@example.com" value={ formData.email } onChange={ handleChange } />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-gray-300 block mb-2">Password</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="password" name="password" type={ showPassword ? 'text' : 'password' } autoComplete="new-password" required className="w-full pl-10 pr-10 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300" placeholder="••••••••" value={ formData.password } onChange={ handleChange } />
                            <button type="button" onClick={ () => setShowPassword( !showPassword ) } className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white">
                                { showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" /> }
                            </button>
                        </div>
                    </div>

                    { error && <p className="text-sm text-red-500 text-center">{ error }</p> }

                    <div>
                        <motion.button
                            type="submit"
                            className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg transition-all duration-300 transform shadow-lg hover:shadow-purple-500/40 flex items-center justify-center"
                            whileHover={ { scale: 1.05, y: -2 } }
                            whileTap={ { scale: 0.98 } }
                            disabled={ loading }
                        >
                            { loading ? 'Creating Account...' : 'Create Account' }
                        </motion.button>
                    </div>
                </motion.form>

                <motion.p className="text-center text-sm text-gray-400" variants={ itemVariants }>
                    Already a member?{ ' ' }
                    <Link to={ '/login' } className="font-medium text-purple-400 hover:text-purple-300">
                        Sign In
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}
