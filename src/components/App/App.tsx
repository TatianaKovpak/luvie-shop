import { Routes, Route } from 'react-router-dom'
// import './App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MainPage from '../MainPage/MainPage' // Укажи правильный путь к файлу
import Catalog from '../Catalog/Catalog'
import ProductPage from '../ProductPage/ProductPage'
import Cart from '../Cart/Cart'
import MiniCart from '../MiniCart/MiniCart'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Favorites from '../Favorites/Favorites'
import Profile from '../Profile/Profile'
import SizeTable from '../../SizeTable/SizeTable'

function App() {
  return (
    <>
      <Header />
      <MiniCart/> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/favorites" element={<Favorites/>}></Route>
        <Route path="/catalog/:gender/:category?/:group?/:item?" element={<Catalog />} />
        <Route path="/product/:id/:color" element={<ProductPage />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sizetable" element={<SizeTable />} />
        
      </Routes>

      <Footer/>
    </>
  );
}

export default App

