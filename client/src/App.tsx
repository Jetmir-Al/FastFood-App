import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import NavBar from './components/layout/NavBar';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Menu from './pages/Menu';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
