import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { selectLoader } from '../../store/selectors';

export default function TopLoadingBar() {
    const { isLoading } = useSelector( selectLoader );
    useEffect( () => {
        const barElement = document.getElementById( 'nprogress' );
        if ( barElement )
            barElement.style.setProperty( '--nprogress-color', '#A855F7' );


        if ( isLoading ) NProgress.start();
        else NProgress.done();

    }, [ isLoading ] );

    return null;
};

