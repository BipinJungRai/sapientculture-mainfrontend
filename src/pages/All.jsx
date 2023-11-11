import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useProduct } from '../context/ProductContext'; 


const All = () => {  
  const navigate = useNavigate();
  const { product } = useProduct(); 
  

  return (
    <>
      <div className="product-collection">
        {!product || product.length === 0  ? (
          // Display loading indicator (e.g., a spinner)

          <div className="loader">
            <ClipLoader />
            {/* loading */}
          </div>
        ) : (
          // Render content with data
          <>
            {product.data?.map((name) => (
              <div className="product-list" key={name.id}>              
                 
                    <img
                      src={`http://127.0.0.1:8000/${name?.thumbnail}`} 
                      className="product-image" onClick={()=>navigate(`/product-details/${name.id}`)} 
                    style={{'cursor' : 'pointer'}} />
               
               
                <div className="product-info">
                  
                    <h3 className="product-title" onClick={()=>navigate(`/product-details/${name.id}`)}>{name?.product_name}</h3>
                  
                  <div className="product-price">£ {name?.price}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};


export default All;
