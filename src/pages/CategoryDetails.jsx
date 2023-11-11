import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import http from "../http/http";
import { ClipLoader } from "react-spinners";

const CategoryDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await http.get("/category/" + id);
    // console.log();
    if (response.status == 200) {
      setProduct(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setLoading(true);
  }, [id]);

  return (
    <>
      <div className="product-collection">
        {loading ? (
          // Display loading indicator (e.g., a spinner)

          <div className="loader">
            <ClipLoader />
          </div>
        ) : (
          // Render content with data
          <>
            {product.data?.map((name) => (
              <div className="product-list" key={name.id}>
                <Link to={`/product-details/${name.id}`}>
                  <img
                    src={`http://127.0.0.1:8000/${name.thumbnail}`}
                    className="product-image"
                  />
                </Link>
                <div className="product-info">
                  <Link to={`/product-details/${name.id}`}>
                    <h3 className="product-title">{name.product_name}</h3>
                  </Link>
                  <div className="product-price">£ {name.price}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CategoryDetails;
