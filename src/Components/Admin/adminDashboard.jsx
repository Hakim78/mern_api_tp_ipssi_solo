// Components/Admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard Administrateur
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Gérez vos produits et clients depuis cette interface
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            className="group relative overflow-hidden border-2 hover:border-blue-600 transition-colors duration-300 rounded-lg bg-white shadow-lg cursor-pointer"
            onClick={() => navigate('/products')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zm-1 11H5v-2h14v2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Gestion Produits</h2>
                  <p className="text-base text-gray-600">Gérez votre catalogue de produits</p>
                </div>
              </div>
              <div className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors">
                Accéder
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
          <div 
            className="group relative overflow-hidden border-2 hover:border-blue-600 transition-colors duration-300 rounded-lg bg-white shadow-lg cursor-pointer"
            onClick={() => navigate('/admin/customers')}
          >
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
                  <h2 className="text-2xl font-bold mb-1">Gestion Clients</h2>
                  <p className="text-base text-gray-600">Gérez vos utilisateurs</p>
                </div>
              </div>
              <div className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors">
                Accéder
                <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;