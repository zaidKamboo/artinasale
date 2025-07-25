import React from 'react';
import { motion } from 'framer-motion';

// --- Helper Components ---

const Title = ( { title } ) => {
    React.useEffect( () => {
        document.title = `Artisanale | ${title}`;
    }, [ title ] );
    return null;
};

// --- SVG Icons ---
const MapPinIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const MailIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const PhoneIcon = ( props ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" { ...props }>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

// --- Main Contact Component ---

export default function Contact() {
    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            <Title title="Contact Us" />
            {/* FIX: Removed min-h-screen to allow the component to fit within the MainLayout flex container */ }
            <div className="w-full bg-black text-white relative overflow-hidden py-24 px-4 sm:px-8">
                {/* Background Glows */ }
                <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-purple-900/30 rounded-full filter blur-[150px] opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-1/3 -right-1/3 w-[600px] h-[600px] bg-pink-900/30 rounded-full filter blur-[150px] opacity-60 animate-pulse delay-1000"></div>

                <motion.div
                    className="relative z-10 max-w-7xl mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/10"
                    initial="hidden"
                    animate="visible"
                    variants={ containerVariants }
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Column: Info */ }
                        <motion.div variants={ itemVariants }>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4" style={ { fontFamily: "'Playfair Display', serif" } }>
                                Get in Touch
                            </h1>
                            <p className="text-gray-300 mb-8 text-lg">
                                We'd love to hear from you. Whether you have a question about our products, artisans, or anything else, our team is ready to answer all your questions.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-800/60 rounded-full text-pink-400">
                                        <MapPinIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Our Studio</h3>
                                        <p className="text-gray-400">Koregaon Park, Pune, Maharashtra, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-800/60 rounded-full text-pink-400">
                                        <MailIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Us</h3>
                                        <p className="text-gray-400 hover:text-purple-300 transition-colors"><a href="mailto:contact@artisanale.com">contact@artisanale.com</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-800/60 rounded-full text-pink-400">
                                        <PhoneIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Call Us</h3>
                                        <p className="text-gray-400">+91 12345 67890</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Form */ }
                        <motion.div variants={ itemVariants }>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="text-sm font-bold text-gray-300 block mb-2">Full Name</label>
                                    <input type="text" id="name" name="name" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm font-bold text-gray-300 block mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="text-sm font-bold text-gray-300 block mb-2">Subject</label>
                                    <input type="text" id="subject" name="subject" placeholder="How can we help?" className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="text-sm font-bold text-gray-300 block mb-2">Message</label>
                                    <textarea id="message" name="message" rows="5" placeholder="Your message..." className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"></textarea>
                                </div>
                                <div>
                                    <motion.button
                                        type="submit"
                                        className="w-full py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40 transition-all"
                                        whileHover={ { scale: 1.05, y: -2 } }
                                        whileTap={ { scale: 0.98 } }
                                    >
                                        Send Message
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
