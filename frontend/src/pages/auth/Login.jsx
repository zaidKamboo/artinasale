import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import Title from '../../components/common/Title';
import { loginUser } from '../../store/slices/user.slice'; // Ensure this is the correct path
import { finishLoading, startLoading } from '../../store/slices/loader.slice';
import { selectLoader, selectUser } from '../../store/selectors';

// --- SVG Icon Components (for brevity, these are kept as they were) ---
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


export default function Login() {
    const [ showPassword, setShowPassword ] = useState( false );
    const [ formData, setFormData ] = useState( {
        email: '',
        password: ''
    } );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = useSelector( selectUser );
    const { isLoading } = useSelector( selectLoader );
    // useEffect( () => {
    //     if ( userInfo ) {
    //         navigate( '/' );
    //     }
    // }, [ navigate, userInfo ] );


    const handleGoBack = () => {
        navigate( -1 );
    };

    const handleChange = ( e ) => {
        setFormData( { ...formData, [ e.target.name ]: e.target.value } );
    };

    // The handleSubmit function dispatches the loginUser thunk.
    // This thunk handles the API call and updates the loading state,
    // which the TopLoadingBar component listens to.
    const handleSubmit = ( e ) => {
        dispatch( startLoading() )
        e.preventDefault();
        dispatch( loginUser( formData, navigate ) );
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <>
            <Title title="Login" />

            {/* The full-screen <Loader /> is removed from here. The <TopLoadingBar /> 
                in App.jsx provides a less intrusive loading indicator for API calls. */}

            <div className="h-screen flex items-center justify-center bg-black text-white p-4 relative overflow-hidden">
                <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/50 rounded-full filter blur-[150px] opacity-40 animate-pulse delay-1000"></div>

                <motion.div
                    className="relative z-10 w-full max-w-md p-8 space-y-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                    variants={ containerVariants }
                    initial="hidden"
                    animate="visible"
                >
                    <button
                        onClick={ handleGoBack }
                        className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/60 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-black"
                        title="Go Back"
                    >
                        <PiArrowCircleLeftDuotone className="w-7 h-7 text-pink-400" />
                    </button>

                    <motion.div className="text-center pt-8" variants={ itemVariants }>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" style={ { fontFamily: "'Playfair Display', serif" } }>
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-gray-400">Sign in to continue your journey.</p>
                    </motion.div>

                    <motion.form className="space-y-6" variants={ itemVariants } onSubmit={ handleSubmit }>
                        <div>
                            <label htmlFor="email" className="text-sm font-bold text-gray-300 block mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    required
                                    value={ formData.email }
                                    onChange={ handleChange }
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-bold text-gray-300 block mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={ showPassword ? 'text' : 'password' }
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                    required
                                    value={ formData.password }
                                    onChange={ handleChange }
                                />
                                <button
                                    type="button"
                                    onClick={ () => setShowPassword( !showPassword ) }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                >
                                    { showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" /> }
                                </button>
                            </div>
                        </div>

                        {/* Display error message if login fails */ }
                        {/* { error && <p className="text-sm text-red-500 text-center">{ typeof error === 'string' ? error : error.message || 'An unknown error occurred' }</p> } */ }

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <motion.button
                                type="submit"
                                className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg transition-all duration-300 transform shadow-lg hover:shadow-purple-500/40 flex items-center justify-center"
                                whileHover={ { scale: 1.05, y: -2 } }
                                whileTap={ { scale: 0.98 } }
                            // disabled={ loading }
                            >
                                { isLoading ? 'Signing In...' : 'Sign In' }
                            </motion.button>
                        </div>
                    </motion.form>

                    <motion.p className="text-center text-sm text-gray-400" variants={ itemVariants }>
                        Not a member yet?{ ' ' }
                        <Link to={ '/signup' } className="font-medium text-purple-400 hover:text-purple-300">
                            Create an account
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </>
    );
};
