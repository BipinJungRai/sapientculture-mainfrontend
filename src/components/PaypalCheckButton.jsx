import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaypalCheckButton = ({ gTotal, cart, setCart, orderID2 }) => {
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          const orderAmount = parseInt(gTotal).toFixed(2);

          return actions.order.create({
            purchase_units: [
              {
                description: "Sapient Culture Checkout",
                amount: {
                  value: orderAmount, // Format the amount to two decimal places
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Order captured: ", order);
          if (order.status === "COMPLETED") {
            try {
              // Make an HTTP POST request to update the payment status
              const response = await axios.post(
                "http://127.0.0.1:8000/api/update-payment-status",
                {
                  orderID2: orderID2,
                  status: "COMPLETED",
                  paypalOrderID: order.id,
                  cart: cart,
                }
              );
              // Check the response status and handle it as needed
              if (response.status === 200) {
                // console.log("Payment status updated successfully.");                
                setCart([]);
                navigate("/");                
                Swal.fire({
                  icon: "success", // Correct the icon value
                  title: "Success",
                  text: "Thank you for purchasing from Sapient Culture.",
                  confirmButtonColor: "#000000"
                })
              } else {
                // Handle other response statuses or errors
                console.error("Failed to update payment status.");
              }
            } catch (error) {
              // Handle errors, such as network issues or server errors
              console.error(error);
            }
          }
        },
        onError: (err) => {
          setError(err);
          console.error("PayPal Checkout onError", err);
        },
      })
      .render(paypalRef.current);
  }, [gTotal]);

  if (error) {
    alert(error.message);
  }

  return (
    <div>
      {/* <div className="">DELIVERY FEE = {deliveryfee}</div> */}
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PaypalCheckButton;
