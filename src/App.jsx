import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./pages/All";
import CategoryDetails from "./pages/CategoryDetails";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import "./styles/subscribe.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Subscribe from "./pages/Subscribe";
import Footer from "./components/Footer";
import { ProductProvider } from './context/ProductContext'; 


function App() {
  const [cartShow, setCartShow] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartMsg, setCartMsg] = useState("");

  const handleClick = (item) => {
    // Check if the item is already in the cart. allow another size item
    let isPresent = false;
    cart.forEach((product) => {
      if (
        item.data.id === product.data.id &&
        item.selectedSize === product.selectedSize
      ) {        
        isPresent = true;
        return;
      }
    });

    // If the item is not already in the cart, add it
    if (!isPresent) {
      setCart([...cart, item]);
      setCartShow(true);
      setCartMsg("IN CART");
    }    
  };

  return (
    <ProductProvider>
      <BrowserRouter>
        <Header size={cart.length} cartShow={cartShow} />
        <div
          className="container-fluid p-3"
          style={{
            backgroundColor: "rgba(245, 246, 250, 0.5)",
            minHeight: "100vh",
          }}
        >
          <div className="row">
            <div className="col-md-2 nav-for-large">
              <Navbar />
            </div>
            <div className="col-md-10">
              <Routes>
                <Route path="/" element={<All />} />
                <Route path="/category/:id" element={<CategoryDetails />} />
                <Route
                  path="/product-details/:id"
                  element={
                    <SingleProduct
                      handleClick={handleClick}
                      cart={cart}
                      setCartMsg={setCartMsg}
                      cartMsg={cartMsg}
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={<Cart cart={cart} setCart={setCart} />}
                />
               
                   <Route path="/subscribe" element={<Subscribe/>} />

              </Routes>
           
             
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
      </ProductProvider>
   
  );
}

export default App;
