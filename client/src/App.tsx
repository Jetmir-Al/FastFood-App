import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
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
import ProtectedRoutes from './routes/ProtectedRoutes';
import Delivery from './components/delivery/Delivery';
import ActiveDelivery from './components/delivery/ActiveDelivery';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const { user } = useAuthHook();
  return (
    <Router>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <NavBar />
      <main id="main-content" className="app-main" tabIndex={-1}>
      <Routes>

        <Route path='*' element={<NotFound />} />
        <Route path='/about' element={<About />} />
        <Route path='/menu' element={<Menu />} />

        <Route path='/' element={<Home />} />
        <Route element={
          <ProtectedRoutes
            isAllowed={user === null} />
        }>

          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route element={
          <ProtectedRoutes
            isAllowed={!!user} />
        }>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={
          <ProtectedRoutes
            isAllowed={!!user && user?.role === "customer"} />
        }>
          <Route path='/order' element={<Order />} />
        </Route>

        <Route element={
          <ProtectedRoutes
            isAllowed={!!user && user?.role === "delivery"} />
        }>
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/active_Deliveries' element={<ActiveDelivery />} />
        </Route>
        <Route element={
          <ProtectedRoutes
            isAllowed={!!user && user?.role === "admin"} />
        }>
          <Route path='/dashboard_panel' element={<Dashboard />} />
        </Route>

      </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div><Link to="/" className="footer-brand">Fast<span>Food.</span></Link><p>Big flavour. Good moments.</p></div>
          <nav aria-label="Footer"><Link to="/menu">Menu</Link><Link to="/about">About</Link></nav>
          <p>Made for your next craving.</p>
        </div>
      </footer>
    </Router>
  )
}

export default App
