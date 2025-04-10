import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import JobSearch from './components/JobSearch';
import Applications from './components/Applications';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;