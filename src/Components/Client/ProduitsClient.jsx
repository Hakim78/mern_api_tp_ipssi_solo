import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion } from 'framer-motion';
import iphone13 from '../../Assets/iphone13.jpg';
import iphone15 from '../../Assets/iphone15.png';

const ProduitsClient = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Charger les produits
    const loadProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        // Pour l'instant, juste une alerte
        alert(`${product.name} ajouté au panier !`);
    };

    // Filtrer les produits selon la recherche
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 py-12 container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold tracking-tight">Nos Produits</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Découvrez notre collection de smartphones haut de gamme
                </p>
                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>
            </motion.div>
            
            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                {filteredProducts.map((product) => (
                    <motion.div key={product._id} variants={item}>
                        <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm backdrop-blur-sm">
                                    {product.category}
                                </span>
                            </div>
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    // src={product.category === 'Smartphones' ? {iphone13} : 
                                    //     product.category === 'Tablettes' ? {iphone15} : 
                                    //     '/api/placeholder/400/320'}
                                    src={iphone13}
                                    alt={iphone15}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <div className="flex items-center text-yellow-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                        </svg>
                                        <span className="ml-1 text-sm">4.8</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold">{product.price}€</p>
                                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors group"
                                    disabled={product.stock === 0}
                                >
                                    <div className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-4h8a2 2 0 0 0 1.95-1.57L21 6H6.5m0 0l.5-2h13"/>
                                        </svg>
                                        {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ProduitsClient;