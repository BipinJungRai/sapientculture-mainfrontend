import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../components/DeliveryForm";

const Cart = ({ cart, setCart }) => {
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const handlePrice = () => {
    let subtotal2 = 0;
    cart.forEach((item) => {
      // Use parseFloat to convert the price to a number
      subtotal2 += parseFloat(item.data.price);
    });
    setSubtotal(subtotal2);
  };

  // console.log(price);
  useEffect(() => handlePrice());
  const handleRemove = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.data.id === id && item.selectedSize === size)
    );
    setCart(updatedCart);
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          {/* Map over the items in the cart */}
          {cart.map((item, index) => (
            <div key={item.data.id} className="cart-details">
              <div className="thumbnail-cart">
                <img
                  src={`http://127.0.0.1:8000/${item.data.thumbnail}`}
                  alt={item.data.product_name} onClick={()=>navigate(`/product-details/${item.data.id}`)} 
                  style={{'cursor' : 'pointer'}}
                />
              </div>
              <div className="product-details-cart">
                <p className="name-cart">{item.data.product_name}</p>
                <p className="size-cart">Size: {item.selectedSize}</p>
                <p className="price-cart">£{item.data.price}</p>
              </div>
              <div className="action">
                <button
                  className="cart-remove-button"
                  onClick={() => handleRemove(item.data.id, item.selectedSize)}
                >
                  Remove
                </button>
              </div>
           
            </div>
          ))}

       

          <div className="">
            <h5 className="text-center subtotal my-5">SUBTOTAL = £{subtotal}</h5>       
            
          </div>
          <div className="delivery-form">
              <DeliveryForm cart={cart} setCart={setCart} subtotal={subtotal}/>
            </div>
        </div>
      ) : (
        <p className="empty-cart-msg">Your cart is currently empty.</p>
      )}
    </div>
  );
};

export default Cart;
