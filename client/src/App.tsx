import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import NavBar from './components/layout/NavBar';
import NotFound from './pages/NotFound';
import About from './pages/About';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
