import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Hobbies from './components/Hobbies';
import StartupIdeas from './components/StartupIdeas';
import SloganSpectrum from './components/SloganSpectrum';
import Contact from './components/Contact';


function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/projects" element={<StartupIdeas />} />
          <Route path="/slogan-spectrum" element={<SloganSpectrum />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
