import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import NavBar from './components/layout/NavBar';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Menu from './pages/Menu';
import Home from './pages/Home';
import { LogIn } from './components/forms/Login';
import { SignUp } from './components/forms/SignUp';
import { useAuthHook } from './hooks/useAuthHook';
import Profile from './pages/Profile';
import Order from './components/forms/Order';

function App() {
  const { authenticated, user } = useAuthHook();
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/about' element={<About />} />
        <Route path='/menu' element={<Menu />} />

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/order' element={<Order />} />
      </Routes>
    </Router>
  )
}

export default App
