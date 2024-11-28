import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  // Fonction pour vérifier l'authentification et rediriger
  const handleAuthenticatedLink = (e, path) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="space-y-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Bienvenue sur ePhone Commerce
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez et gérez vos produits electronics avec notre plateforme moderne
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="group relative overflow-hidden border-2 hover:border-blue-600 transition-colors duration-300 rounded-lg bg-white shadow-lg cursor-pointer"
               onClick={(e) => handleAuthenticatedLink(e, '/boutique')}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Interface Utilisateur</h2>
                  <p className="text-base text-gray-600">Parcourez et achetez nos meilleurs produits</p>
                </div>
              </div>
              <div className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors">
                Voir les Produits
                <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="group relative overflow-hidden border-2 hover:border-blue-600 transition-colors duration-300 rounded-lg bg-white shadow-lg cursor-pointer"
               onClick={(e) => handleAuthenticatedLink(e, '/admin')}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Espace Admin</h2>
                  <p className="text-base text-gray-600">Connectez-vous pour accéder à votre compte</p>
                </div>
              </div>
              <div className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors">
                Se connecter
                <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-x-4"
      >
        <span className="text-gray-600">Pas encore de compte ?</span>
        <Link 
          to="/register" 
          className="text-blue-600 hover:text-blue-500 transition-colors font-semibold"
        >
          Inscrivez-vous
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;