import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import HowItWorksPage from '../pages/HowItWorksPage';
import ForSchoolsPage from '../pages/ForSchoolsPage';
import ForParentsPage from '../pages/ForParentsPage';
import DemoPage from '../pages/DemoPage';
import AnimatedPage from '../components/AnimatedPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
        <Route path="/how-it-works" element={<AnimatedPage><HowItWorksPage /></AnimatedPage>} />
        <Route path="/for-schools" element={<AnimatedPage><ForSchoolsPage /></AnimatedPage>} />
        <Route path="/for-parents" element={<AnimatedPage><ForParentsPage /></AnimatedPage>} />
        <Route path="/demo" element={<AnimatedPage><DemoPage /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;