

import { motion } from 'framer-motion';
import { FiSettings, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';
import { startLoading } from '../../store/slices/loader.slice';
import { logoutUser } from '../../store/slices/user.slice';

const ProfileInfo = () => {
    const user = useSelector( selectUser )
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch( startLoading() )
        dispatch( logoutUser( navigate ) );
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return ( <motion.div className="flex flex-col md:flex-row items-center w-full" variants={ itemVariants }>
        <div className="relative flex-shrink-0">
            { user.avatar?.public_id ? (
                <img src={ user.avatar.url } alt={ user.name } className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500 shadow-lg" />
            ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-purple-500 shadow-lg bg-gray-800 flex items-center justify-center">
                    <FaUserCircle className="w-20 h-20 text-gray-500" />
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
            <motion.button className="p-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors" whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.95 } } title="Create Product" onClick={ () => navigate( '/create-product' ) } >
                <FiPlusCircle className="w-5 h-5" />
            </motion.button>
            <motion.button className="p-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors" whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.95 } } title="Edit Profile" onClick={ () => navigate( `/profile/${user?._id}` ) } >
                <FiSettings className="w-5 h-5" />
            </motion.button>
            <motion.button onClick={ handleLogout } className="p-3 bg-red-900/40 border border-red-700 rounded-lg text-white hover:bg-red-900/70 transition-colors" whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.95 } } title="Logout">
                <FiLogOut className="w-5 h-5" />
            </motion.button>
        </div>
    </motion.div>
    )
}

export default ProfileInfo