import { motion, AnimatePresence } from "framer-motion";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from 'react-redux';

import { selectLoader } from "../../store/selectors";

export default function Loader() {
    const { isLoading } = useSelector( selectLoader );

    return (
        <AnimatePresence>
            { isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                    initial={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    transition={ { duration: 0.5 } }
                >
                    {/* Background decorative blur element */ }
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-900/50 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>

                    <div className="text-center relative z-10 w-64">
                        <ImSpinner9 className="animate-spin text-5xl sm:text-6xl text-purple-400 mx-auto drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                        <p className="mt-6 tracking-widest text-gray-300" style={ { fontFamily: "'Poppins', sans-serif" } }>
                            Crafting the experience...
                        </p>
                    </div>
                </motion.div>
            ) }
        </AnimatePresence>
    );
};
