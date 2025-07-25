import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../components/common/Title';
import { selectUser } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';
import { contact } from '../../store/slices/user.slice';
import { startLoading } from '../../store/slices/loader.slice';

gsap.registerPlugin( ScrollTrigger );

export default function Contact() {
    const componentRef = useRef( null );
    const user = useSelector( selectUser );
    const [ formData, setFormData ] = useState( {
        name: '',
        email: '',
        subject: '',
        message: '',
    } );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if ( user ) {
            setFormData( prev => ( {
                ...prev,
                name: user.name || '',
                email: user.email || '',
                user: user?._id || null
            } ) );
        }
    }, [ user ] );

    const handleChange = e =>
        setFormData( { ...formData, [ e.target.name ]: e.target.value } )


    const handleSubmit = ( e ) => {
        dispatch( startLoading() )
        e.preventDefault();
        dispatch( contact( formData, navigate ) )
    };

    useLayoutEffect( () => {
        const ctx = gsap.context( () => {
            const columns = gsap.utils.toArray( '.contact-column' );

            gsap.from( columns, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            } );
        }, componentRef );

        return () => ctx.revert();
    }, [] );

    return (
        <>
            <Title title="Contact Us" />
            <div ref={ componentRef } className="w-full bg-black text-white relative overflow-hidden py-24 px-4 sm:px-8">
                <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/30 rounded-full filter blur-[150px] opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/30 rounded-full filter blur-[150px] opacity-60 animate-pulse delay-1000"></div>

                <div
                    className="relative z-10 max-w-7xl mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="contact-column">
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4" style={ { fontFamily: "'Playfair Display', serif" } }>
                                Get in Touch
                            </h1>
                            <p className="text-gray-300 mb-8 text-lg">
                                We'd love to hear from you. Whether you have a question about our products, artisans, or anything else, our team is ready to answer all your questions.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-800/60 rounded-full text-pink-400">
                                        <FiMapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Our Studio</h3>
                                        <p className="text-gray-400">Koregaon Park, Pune, Maharashtra, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-800/60 rounded-full text-pink-400">
                                        <FiMail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Us</h3>
                                        <p className="text-gray-400 hover:text-purple-300 transition-colors"><a href="mailto:contact@artisanale.com">contact@artisanale.com</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-800/60 rounded-full text-pink-400">
                                        <FiPhone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Call Us</h3>
                                        <p className="text-gray-400">+91 12345 67890</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-column">
                            <form className="space-y-6" onSubmit={ handleSubmit }>
                                <div>
                                    <label htmlFor="name" className="text-sm font-bold text-gray-300 block mb-2">Full Name</label>
                                    <input type="text" id="name" name="name" placeholder="Your Name" value={ formData.name } onChange={ handleChange } className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm font-bold text-gray-300 block mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="you@example.com" value={ formData.email } onChange={ handleChange } className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="text-sm font-bold text-gray-300 block mb-2">Subject</label>
                                    <input type="text" id="subject" name="subject" placeholder="How can we help?" value={ formData.subject } onChange={ handleChange } className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="text-sm font-bold text-gray-300 block mb-2">Message</label>
                                    <textarea id="message" name="message" rows="5" placeholder="Your message..." value={ formData.message } onChange={ handleChange } className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40 transition-all"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
