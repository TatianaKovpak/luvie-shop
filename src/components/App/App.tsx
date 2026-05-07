import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MainPage from '../MainPage/MainPage' // Укажи правильный путь к файлу
import Catalog from '../Catalog/Catalog'
import ProductPage from '../ProductPage/ProductPage'
import Cart from '../Cart/Cart'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog/:gender/:category?/:group?/:item?" element={<Catalog />} />
        <Route path="/product/:id/:color" element={<ProductPage />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App

