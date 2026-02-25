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
import ProtectedRoutes from './routes/ProtectedRoutes';
import Delivery from './components/delivery/Delivery';
import ActiveDelivery from './components/delivery/ActiveDelivery';

function App() {
  const { user } = useAuthHook();
  return (
    <Router>
      <NavBar />
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


      </Routes>
    </Router>
  )
}

export default App
