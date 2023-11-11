import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import http from "../http/http";
import ClipLoader from "react-spinners/ClipLoader";


const SingleProduct = ({ handleClick, cart, cartMsg, setCartMsg }) => {
  const [images2, setImages] = useState([]);
  const [product, setProduct] = useState({
    // ...other product properties,
    selectedSize: "", // Initialize selectedSize as an empty string
  });
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
 
  

  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const response = await http.get("/product/" + id);

      if (response.status == 200) {
        setProduct(response.data);
        setImages(response.data.data.images);
        setLoading(false);
      }

      // Initialize img with the first image URL
      if (response.data.data.images.length > 0) {
        setImg(
          `http://127.0.0.1:8000/${response.data.data.images[0].image_path}`
        );
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    setLoading(true);
  }, [id]);

  useEffect(() => {
    // Load data and set selectedSize as needed
    // For example, if you want to set it to the first available size:
    if (product.data && product.data.details && product.data.details.length > 0) {
      const firstSize = product.data.details[0].size;
      setProduct((prevProduct) => ({
        ...prevProduct,
        selectedSize: firstSize,
      }));

      const isSizeInCart = cart && cart.some((item) => {
        return (
          item.data.id === product.data.id && item.selectedSize === firstSize
        );
      });

      if (isSizeInCart) {
        setCartMsg('IN CART');
      } else {
        setCartMsg('ADD TO CART');
      }
  
    }   
    
  }, [product.data]);

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
  
    // Update the selectedSize in the product state
    setProduct((prevProduct) => ({
      ...prevProduct,
      selectedSize: newSize,
    }));
  
    // Check if the selected size is in the cart
    const isSizeInCart = cart.some((item) => {
      return (
        item.data.id === product.data.id && item.selectedSize === newSize
      );
    });
  
    // Update the cartMsg based on whether the size is in the cart
    if (isSizeInCart) {
      setCartMsg('IN CART');
    } else {
      setCartMsg('ADD TO CART');
    }
  };
  
  
 // console.log(product);
  const images = images2?.map((name) => {
    return `http://127.0.0.1:8000/${name.image_path}`;
  });

  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (var j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };

  const refs = useRef([]);
  refs.current = [];

  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          {loading ? (
            <div className="loader">
              <ClipLoader />
            </div>
          ) : (
            <>
              <ReactImageMagnify
                smallImage={{
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: img,
                }}
                largeImage={{
                  src: img,
                  width: 1500,
                  height: 1500,
                }}
                enlargedImageContainerDimensions={{
                  width: "50%",
                  height: "50%",
                }}
              />

              <div className="below">
                {images?.map((image, i) => (
                  <div
                    className={i == 0 ? "img_wrap active" : "img_wrap"}
                    key={i}
                    onMouseOver={() => hoverHandler(image, i)}
                    ref={addRefs}
                  >
                    <img src={image} alt="" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-md-4">
          <h1 className="product-title-single">{product.data?.product_name}</h1>
          <h5 className="product-price-single">£ {product.data?.price}</h5>

          <div className="mb-3 technical-details">
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
              TECHNICAL DETAILS
            </a>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2
                      className="modal-title fs-5"
                      id="exampleModalLabel"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {product.data?.product_name}
                    </h2>
                  </div>
                  {product.data ? (
                    <div
                      className="modal-body"
                      dangerouslySetInnerHTML={{
                        __html: product.data.description,
                      }}
                    ></div>
                  ) : (
                    // Render a loading state or an alternative content when product.data is not available
                    <div className="modal-body">Loading....</div>
                  )}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <select className="size-select mb-3" onChange={handleSizeChange}>
            {product.data && product.data.details
              ? product.data.details.map((name) => (
                  <option key={name.size} value={name.size}>
                    {name.size}
                  </option>
                ))
              : "Loading..."}
          </select>

          <button
            type="submit"
            className="btn-select-size"
            onClick={() => handleClick(product)}
          >
            {cartMsg}
          </button>

          <div className="info mt-4">
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal1">
              SHIPPING INFO
            </a>{" "}
            <br />
            <div
              className="modal fade"
              id="exampleModal1"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4
                      className="modal-title fs-5"
                      id="exampleModalLabel"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      SHIPPING INFO
                    </h4>
                   
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* tracking info */}
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal2">
              TRACKING INFORMATION
            </a>{" "}
            <br />
            <div
              className="modal fade"
              id="exampleModal2"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4
                      className="modal-title fs-5"
                      id="exampleModalLabel"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      TRACKING INFORMATION
                    </h4>
                   
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* size chart */}
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal3">
              SIZE CHART
            </a>
            <div
              className="modal fade"
              id="exampleModal3"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4
                      className="modal-title fs-5"
                      id="exampleModalLabel"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      size chart
                    </h4>
                   
                  </div>
                  <div className="modal-body">size chart</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
