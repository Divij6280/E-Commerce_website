import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/footer/footer';
import men_banner from './components/assets/banner_mens.png';
import women_banner from './components/assets/banner_women.png';
import kid_banner from './components/assets/banner_kids.png';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrder from './pages/PlaceOrder';  // Import PlaceOrder component
import ThankYouPage from './pages/ThankYouPage'; // Import ThankYouPage component

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product'>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/placeorder' element={<PlaceOrder />} /> {/* Add this line for PlaceOrder route */}
          <Route path='/thankyou' element={<ThankYouPage />} /> {/* Add this line for Thank You page route */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
