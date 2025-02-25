import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import Home from './pages/Home';
import Summary from './pages/Summary';
import Quiz from './pages/Quiz';
import Roadmap from './pages/Roadmap';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjAyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-40"></div>
        <div className="relative">
          <Navbar />
          <div className="fixed top-24 right-4 z-50">
            <Timer />
          </div>
          <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-8rem)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'bg-gray-800 text-white border border-gray-700',
            style: {
              background: 'rgba(31, 41, 55, 0.9)',
              color: 'white',
              backdropFilter: 'blur(8px)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;