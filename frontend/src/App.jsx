import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ToastContainer } from 'react-toastify';

import AllRoutes from './pages/AllRoutes';
import Loader from './components/common/Loader';
import PortalScene from "./components/home/PortalScene";
import TopLoadingBar from './components/common/TopLoadingBar';
import { finishLoading } from './store/slices/loader.slice';
import { selectLoader } from './store/selectors';

gsap.registerPlugin( ScrollTrigger );

export default function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector( selectLoader );
  const { pathname } = useLocation();
  const appContainerRef = useRef( null );
  const lenisRef = useRef( null );

  const [ isPortalEntered, setIsPortalEntered ] = useState( () => {
    try {
      const storedValue = sessionStorage.getItem( 'portal-entered' );
      return storedValue === 'true';
    } catch {
      return false;
    }
  } );

  const [ initialLoadFinished, setInitialLoadFinished ] = useState( false );

  const shouldShowPortal = pathname === '/' && !isPortalEntered;

  useEffect( () => {
    if ( initialLoadFinished ) return; 

    const handleLoad = () => {
      dispatch( finishLoading() );
      setInitialLoadFinished( true ); 
    };

    if ( document.readyState === 'complete' )
      setTimeout( handleLoad, 200 );
    else {
      window.addEventListener( 'load', handleLoad );
      const fallbackTimer = setTimeout( () => {
        console.warn( "Loader fallback timer triggered. Forcing loader to hide." );
        handleLoad();
      }, 4000 );

      return () => {
        window.removeEventListener( 'load', handleLoad );
        clearTimeout( fallbackTimer );
      };
    }
  }, [ dispatch, initialLoadFinished ] );

  useEffect( () => {
    if ( isLoading ) return;

    const lenis = new Lenis( {
      duration: 1.5,
      easing: ( t ) => 1 - Math.pow( 1 - t, 4 ),
      smooth: true,
    } );
    lenisRef.current = lenis;

    const animationFrame = ( time ) => {
      lenis.raf( time );
      requestAnimationFrame( animationFrame );
    };
    const frame = requestAnimationFrame( animationFrame );

    return () => {
      cancelAnimationFrame( frame );
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [ isLoading ] );

  useEffect( () => {
    if ( lenisRef.current ) lenisRef.current.scrollTo( 0, { immediate: true } );
    else window.scrollTo( 0, 0 );

    const timer = setTimeout( () => {
      ScrollTrigger.refresh();
    }, 150 );
    return () => clearTimeout( timer );
  }, [ pathname ] );

  const handleEnter = () => {
    try {
      sessionStorage.setItem( 'portal-entered', 'true' );
    } catch ( error ) {
      console.error( "Session storage not available." );
    }
    setIsPortalEntered( true );
  };


  return (
    <div ref={ appContainerRef } className="bg-black min-h-screen font-sans antialiased text-white">
      <TopLoadingBar />
      <Loader />
      <ToastContainer
        position="top-right"
        autoClose={ 5000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="fixed inset-0 z-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-transparent to-black" />


      <div style={ { visibility: !isLoading ? 'visible' : 'hidden', opacity: !isLoading ? 1 : 0, transition: 'opacity 0.5s ease-in-out' } }>
        { shouldShowPortal ?
          <PortalScene onEnter={ handleEnter } />
          : <div className="relative z-10">
            <AllRoutes />
          </div>
        }
      </div>
    </div>
  );
}
