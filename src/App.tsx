import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;