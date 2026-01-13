import React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './hooks/useTheme';

// Sections
import Navigation from './components/sections/Navigation';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import MindFluxProduct from './components/sections/MindFluxProduct';
import NeuralSignatures from './components/sections/NeuralSignatures';
import Applications from './components/sections/Applications';
import TechnologyArchitecture from './components/sections/TechnologyArchitecture';
import DashboardPreview from './components/sections/DashboardPreview';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-[#030308] text-white">
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 20, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              backdropFilter: 'blur(10px)'
            }
          }}
        />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <Problem />
          <MindFluxProduct />
          <NeuralSignatures />
          <Applications />
          <TechnologyArchitecture />
          <DashboardPreview />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
