import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import Home from './pages/Home';
import Summary from './pages/Summary';
import Quiz from './pages/Quiz';
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar />
        <div className="fixed top-24 right-4 z-50">
          <Timer />
        </div>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;