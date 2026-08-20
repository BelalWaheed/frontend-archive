import { motion } from 'framer-motion';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Ambient Background */}
      <div className="ambient-bg" />
      
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <motion.main 
        className="flex-1 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
