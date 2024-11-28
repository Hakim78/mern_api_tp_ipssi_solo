import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    });

    // Filtrer les produits selon le terme de recherche
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    // Load Products
    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8080/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.response?.data?.error || 'Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        
        try {
            if (currentProduct) {
                await axios.put(
                    `http://localhost:8080/api/update/${currentProduct._id}`,
                    newProduct,
                    { headers: { Authorization: `Bearer ${token}` }}
                );
                alert('Produit modifié avec succès !');
            } else {
                await axios.post(
                    'http://localhost:8080/api/products',
                    newProduct,
                    { headers: { Authorization: `Bearer ${token}` }}
                );
                alert('Produit ajouté avec succès !');
            }
            closeModal();
            loadProducts();
        } catch (error) {
            alert(error.response?.data?.error || 'Une erreur est survenue');
        }
    };

    // Close modal and reset form
    const closeModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
        setNewProduct({
            name: "",
            description: "",
            price: "",
            stock: "",
            category: ""
        });
    };

   const handleEdit = (product) => {
        setCurrentProduct(product);
        setNewProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category
        });
        setShowModal(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:8080/api/delete/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Produit supprimé avec succès !');
                loadProducts();
            } catch (error) {
                alert(error.response?.data?.error || 'Erreur lors de la suppression');
            }
        }
    };

    const Modal = ({ children }) => (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => closeModal()}
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-6 w-full max-w-md m-4"
            >
                {children}
            </motion.div>
        </div>
    );


    const ProductForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">
                {currentProduct ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Nom</label>
                <input
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Nom du produit"
                    required
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                    name="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Description du produit"
                    required
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Prix</label>
                    <input
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        type="number"
                        min="0"
                        step="0.01"
                        name="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="Prix"
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium">Stock</label>
                    <input
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        type="number"
                        min="0"
                        name="stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="Quantité en stock"
                        required
                    />
                </div>
            </div>
    
            <div className="space-y-2">
                <label className="text-sm font-medium">Catégorie</label>
                <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    name="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Tablettes">Tablettes</option>
                    <option value="Accessoires">Accessoires</option>
                    <option value="Autres">Autres</option>
                </select>
            </div>
    
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {currentProduct ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    );
    
    // Display section
    const ProductDisplay = () => (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <h1 className="text-3xl font-bold">Gestion des Produits</h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                    </div>
                    <button
                        onClick={() => {
                            setCurrentProduct(null);
                            setShowModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Ajouter un produit
                    </button>
                </div>
            </motion.div>
    
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {filteredProducts.map((product) => (
                    <motion.div key={product._id} variants={item}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold truncate">{product.name}</h2>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm whitespace-nowrap">
                                        {product.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold">{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                                    <p className="text-sm text-gray-500">
                                        Stock: <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>{product.stock}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="inline-flex items-center px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="inline-flex items-center px-3 py-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <ProductDisplay />
            
            <AnimatePresence>
                {showModal && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-lg p-6 w-full max-w-md"
                        >
                            <ProductForm />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Products;