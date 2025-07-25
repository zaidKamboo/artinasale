
import { motion } from 'framer-motion';
import Title from '../../components/common/Title';

const CollectionScene = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
);

// --- Main Collection Component with Framer Motion Animations ---

export default function Collection() {
    // Placeholder data for the product collection
    const products = [
        { id: 1, name: 'Woven Dream Catcher', artisan: 'Elena Moonweaver', image: 'https://placehold.co/600x600/a855f7/ffffff?text=Woven+Dream' },
        { id: 2, name: 'Ceramic Moon Vase', artisan: 'Kaelen Stonehand', image: 'https://placehold.co/600x600/ec4899/ffffff?text=Moon+Vase' },
        { id: 3, name: 'Enchanted Silver Locket', artisan: 'Lyra Silversmith', image: 'https://placehold.co/600x600/8b5cf6/ffffff?text=Silver+Locket' },
        { id: 4, name: 'Hand-carved Oakwood Box', artisan: 'Finnian Woodshaper', image: 'https://placehold.co/600x600/d946ef/ffffff?text=Oakwood+Box' },
        { id: 5, name: 'Celestial Stained Glass', artisan: 'Aria Lightbringer', image: 'https://placehold.co/600x600/a855f7/ffffff?text=Stained+Glass' },
        { id: 6, name: 'Leather-bound Grimoire', artisan: 'Roric Inkwell', image: 'https://placehold.co/600x600/ec4899/ffffff?text=Grimoire' },
    ];

    // Framer Motion variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };


    return (
        <>
            <Title title="Collection" />
            <motion.div
                className="w-full text-white py-16 px-4 sm:px-8 bg-black relative"
                initial="hidden"
                animate="visible"
                variants={ containerVariants }
            >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-900/40 rounded-full filter blur-[120px] opacity-50 animate-pulse"></div>
                    <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-pink-900/40 rounded-full filter blur-[120px] opacity-50 animate-pulse delay-1000"></div>
                    <CollectionScene />
                </div>
                <motion.header className="text-center mb-16" variants={ itemVariants }>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500" style={ { fontFamily: "'Playfair Display', serif" } }>
                        Our Collection
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Explore a curated selection of unique, handcrafted items from the world's most talented artisans.
                    </p>
                </motion.header>

                <motion.div
                    className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={ containerVariants }
                >
                    { products.map( ( product ) => (
                        <motion.div
                            key={ product.id }
                            className="group relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-md border border-purple-900/30 shadow-2xl shadow-purple-500/10"
                            variants={ cardVariants }
                            whileHover={ { y: -8, transition: { duration: 0.3 } } }
                        >
                            <img
                                src={ product.image }
                                alt={ product.name }
                                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onError={ ( e ) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/1f2937/ffffff?text=Not+Found'; } }
                            />
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-xl font-bold text-white">{ product.name }</h3>
                                <p className="text-sm text-purple-300">by { product.artisan }</p>
                            </div>
                        </motion.div>
                    ) ) }
                </motion.div>
            </motion.div>
        </>
    );
}
