import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/selectors';

// --- SVG Icon Components ---
const MenuIcon = ( { className } ) => (
    <svg className={ className } stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = ( { className } ) => (
    <svg className={ className } stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const ProfileIcon = ( { className } ) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ className }>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);


const Header = () => {
    const user = useSelector( selectUser );
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( true );
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Collection', path: '/collection' },
        { label: 'Our Story', path: '/story' },
        { label: 'Contact', path: '/contact' },
    ];

    useEffect( () => {
        setIsMenuOpen( false );
    }, [ location ] );

    useEffect( () => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if ( currentScrollY > lastScrollY && currentScrollY > 100 ) {
                setIsVisible( false );
            } else {
                setIsVisible( true );
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener( "scroll", handleScroll );
        return () => window.removeEventListener( "scroll", handleScroll );
    }, [] );

    const linkClasses = "uppercase tracking-widest text-sm font-semibold transition-all duration-300";
    const activeLinkClasses = "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600";
    const inactiveLinkClasses = "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600";

    return (
        <>
            <header
                className={ `
                    fixed top-0 left-0 w-full z-40 p-4 md:p-6 md:py-4 bg-black/50 backdrop-blur-md
                    transition-transform duration-500 ease-in-out
                    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
                `}
            >
                <nav className="container mx-auto flex justify-between items-center">
                    <NavLink to="/" className="text-3xl font-bold tracking-wider poppins text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Artisanale
                    </NavLink>

                    <ul className="hidden md:flex items-center space-x-8">
                        { navLinks.map( ( link ) => (
                            <li key={ link.path }>
                                <NavLink
                                    to={ link.path }
                                    className={ ( { isActive } ) =>
                                        `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                                    }
                                >
                                    { link.label }
                                </NavLink>
                            </li>
                        ) ) }
                        <li>
                            { user?._id ? (
                                <NavLink to="/profile" title="Go to Profile">
                                    { user.avatar.public ? (
                                        <img src={ user.avatar.url } alt="Profile" className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 hover:border-pink-500 transition-all" />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full border-2 border-purple-400 flex items-center justify-center bg-gray-800 hover:border-pink-500 transition-all">
                                            <ProfileIcon className="h-6 w-6 text-white" />
                                        </div>
                                    ) }
                                </NavLink>
                            ) : (
                                <button className=" px-8 py-1 border-2 border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:shadow-[0_0_25px_rgba(138,43,226,1)]" onClick={ () => navigate( "/login" ) } >
                                    Login
                                </button>
                            ) }
                        </li>
                    </ul>

                    <button className="md:hidden text-white z-50" onClick={ () => setIsMenuOpen( !isMenuOpen ) }>
                        { isMenuOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" /> }
                    </button>
                </nav>
            </header>

            <div
                className={ `fixed inset-0 z-30 bg-black/95 backdrop-blur-lg transition-opacity duration-500 md:hidden
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}` }
            >
                <ul className="flex flex-col items-center justify-center h-full space-y-10">
                    { navLinks.map( ( { path, label } ) => (
                        <li key={ path }>
                            <NavLink
                                to={ path }
                                className={ ( { isActive } ) =>
                                    `text-3xl tracking-widest font-semibold transition-all duration-300 
                                     ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600' : 'text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600'}`
                                }
                            >
                                { label }
                            </NavLink>
                        </li>
                    ) ) }
                    <li>
                        { user?._id ? (
                            <NavLink to="/profile" className="flex items-center space-x-4">
                                { user.avatar?.public ? (
                                    <img src={ user?.avatar?.url } alt="Profile" className="h-12 w-12 rounded-full object-cover border-2 border-purple-400" />
                                ) : (
                                    <div className="h-12 w-12 rounded-full border-2 border-purple-400 flex items-center justify-center bg-gray-800">
                                        <ProfileIcon className="h-7 w-7 text-white" />
                                    </div>
                                ) }
                                <span className="text-2xl text-white">Profile</span>
                            </NavLink>
                        ) : (
                            <button onClick={ () => navigate( '/login' ) } className="mt-6 px-8 py-3 border-2 border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:shadow-[0_0_25px_rgba(138,43,226,1)]">
                                Login
                            </button>
                        ) }
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;
