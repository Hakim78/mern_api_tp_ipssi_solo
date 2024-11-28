import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion } from "framer-motion";

const EditCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });

    // Charger les utilisateurs
    const loadCustomers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            const response = await axios.get('http://localhost:8080/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Convertir en tableau si c'est un objet unique
            const customersData = Array.isArray(response.data) 
                ? response.data 
                : response.data ? [response.data] : [];
    
            console.log("Processed data:", customersData);
            setCustomers(customersData);
            setError(null);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setError('Erreur lors du chargement des utilisateurs');
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    // Gérer la création/modification d'utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            if (editingUser) {
                // Mettre à jour l'utilisateur
                await axios.put(
                    `http://localhost:8080/api/update/${editingUser._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert('Utilisateur modifié avec succès');
            } else {
                // Créer un nouvel utilisateur
                await axios.post(
                    'http://localhost:8080/api/register',
                    formData
                );
                alert('Utilisateur créé avec succès');
            }
            setShowModal(false);
            setEditingUser(null);
            resetForm();
            loadCustomers();
        } catch (error) {
            alert(error.response?.data?.error || 'Une erreur est survenue');
        }
    };

    // Supprimer un utilisateur
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/api/delete/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Utilisateur supprimé avec succès');
                loadCustomers();
            } catch (error) {
                alert('Erreur lors de la suppression de l\'utilisateur');
            }
        }
    };

    // Ouvrir le modal pour modifier
    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: '', // Vide car on ne modifie pas forcément le mot de passe
            role: user.role
        });
        setShowModal(true);
    };

    // Réinitialiser le formulaire
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            role: 'user'
        });
        setEditingUser(null);
    };

    // Modal Component
    const Modal = ({ children }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-6 w-full max-w-md"
            >
                {children}
            </motion.div>
        </div>
    );

    const filteredCustomers = customers.filter(customer => 
        customer?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Gestion des Clients</h1>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher un client..."
                        className="w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Ajouter un utilisateur
                    </button>
                </div>
            </div>

            {/* Table des utilisateurs */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
    <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
        {filteredCustomers.length === 0 ? (
            <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Aucun utilisateur trouvé
                </td>
            </tr>
        ) : (
            filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.role === 'admin' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                        }`}>
                            {customer.role}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button 
                            className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Voir"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => handleEdit(customer)}
                            className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-green-600 transition-colors"
                            title="Éditer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => handleDeleteUser(customer._id)}
                            className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Supprimer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            ))
        )}
    </tbody>
</table>
            </div>

            {/* Modal de création/modification */}
            {showModal && (
                <Modal>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">
                            {editingUser ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
                        </h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nom d'utilisateur</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {editingUser ? 'Nouveau mot de passe (facultatif)' : 'Mot de passe'}
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg"
                                required={!editingUser}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Rôle</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="user">Utilisateur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                {editingUser ? 'Modifier' : 'Créer'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default EditCustomers;