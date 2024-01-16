import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/NavBar/Navbar.jsx";
import { ShopCategory } from "./Pages/ShopCategory.jsx";
import { LoginSignup } from "./Pages/LoginSignup.jsx";
import { Product } from "./Pages/Product.jsx";
import { Cart } from "./Pages/Cart.jsx";
import { Shop } from "./Pages/Shop.jsx";
import { OrderHistory } from "./Pages/OrderHistory.jsx";
import Favorites from "./Pages/Favorites.jsx";
import { Footer } from "./Components/Footer/Footer.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/electronics"
            element={<ShopCategory category="electronics" />}
          />
          <Route
            path="/jewelery"
            element={<ShopCategory category="jewelery" />}
          />
          <Route
            path="/mens"
            element={<ShopCategory category="men's clothing" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory category="women's clothing" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
