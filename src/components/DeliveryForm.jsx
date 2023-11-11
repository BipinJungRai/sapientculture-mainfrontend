import React, { useState, useEffect } from "react";
import axios from "axios";
import PaypalCheckButton from "../components/PaypalCheckButton";
import Swal from "sweetalert2";

const DeliveryForm = ({ cart, setCart }) => {
  // Define state variables for form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryfee, setDeliveryfee] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderID2, setOrderID2] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [delivery, setDelivery] = useState([]);
  // const [filteredDelivery, setFilteredDelivery] = useState(delivery);
  

  const [gTotal, setgTotal] = useState("");

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding state variable
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const collectFormData = () => {
    return {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      cart,
    };
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    
    const formData = collectFormData();

   

   
    try {
      // Make an HTTP POST request to your API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/order",
        formData
      );
      console.log(response);
      if (response.status === 200) {
        response.data.error
          ? 
          Swal.fire({
            icon: "error", // Correct the icon value
            title: "Error",
            text: response.data.error,
            confirmButtonColor: "#000000",
            
          })
          :
          Swal.fire({
            icon: "error", // Correct the icon value
            title: "Error",
            text: response.data.msg,
            confirmButtonColor: "#000000",
           
          });
      }

      // Check the response status and handle it as needed
      if (response.status === 201) {
        setgTotal(response.data.grand_total);
        setOrderID2(response.data.order_id);
        setDeliveryfee(response.data.delivery_fee);
        setDeliveryAddress(response.data.deliveryAddress);
        setFormSubmitted(true);
        // Show the PayPal button after successful submission
      } else {
        // Handle other response statuses or errors
      }
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error(error);
    }
  };

  // Check if the cart is empty
  if (cart.length === 0) {
    return (
      <div className="empty-cart-msg">
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  const getDelivery = async () => {
    try {
      // Make an HTTP POST request to your API
      const response = await axios.get("http://127.0.0.1:8000/api/deliveryfee");

      // Check the response status and handle it as needed
      if (response.status === 200) {
        setDelivery(response.data.delivery);
      } else {
        // Handle other response statuses or errors
      }
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error(error);
    }
  };

  useEffect(() => {
    getDelivery();
  }, []);

  const handleSearch = (e) => {
    setAddress(e.target.value);
  };

  
  const onSearch = (searchTerm) => {    
    setAddress(searchTerm);
  };

  return (
    <>
      <div className="card checkout-card mb-3">
        {formSubmitted ? (
          <>
            <div className="cart-header">
              <h4 className="text-center delivery-form-heading">
                Confirm order details
              </h4>

              <div className="table-responsive-sm">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Fullname:</td>
                      <td>
                        {firstName} {lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Delivery Address:</td>
                      <td>
                        <em>{deliveryAddress}</em>
                      </td>
                    </tr>
                    <tr>
                      <td>Delivery Fee:</td>
                      <td>£{deliveryfee}</td>
                    </tr>
                    <tr>
                      <td>Grand Total:</td>
                      <td>£{gTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h4 className="text-center delivery-form-heading">
                Checkout
            </h4>
            <div className="cart-paypal">
              <PaypalCheckButton
                gTotal={gTotal}
                setCart={setCart}
                orderID2={orderID2}
                cart={cart}
              />
            </div>
          </>
        ) : (
          <>
            <div className="cart-header">
              <h4 className="text-center delivery-form-heading">
                Fill Delivery details
              </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="fullname mb-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  placeholder="Search for a delivery address"
                  onChange={handleSearch}
                  className="form-control mb-3"
                  value={address}
                />

                <label htmlFor="searchAddress">
                  Search for a delivery address
                </label>
                <div className="">
                  {delivery
                    .filter((item) => {
                      const searchTerm = address.toLowerCase();
                      const address2 = item.delivery_address.toLowerCase();

                      return (
                        searchTerm &&
                        (address2.startsWith(searchTerm) || address2.includes(searchTerm)) &&
                        address2 !== searchTerm
                      );
                    }).slice(0, 5)
                    .map((item) => (
                      <div
                        // className="form-control"
                        key={item.id}
                        onClick={() => onSearch(item.delivery_address)}
                        style={{'cursor' : 'pointer'}}
                      >
                        <em>{item.delivery_address}</em>
                      </div>
                    ))}
                </div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="phoneNumber">Phone number</label>
              </div>

              <button type="submit" className="checkout-button">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default DeliveryForm;
