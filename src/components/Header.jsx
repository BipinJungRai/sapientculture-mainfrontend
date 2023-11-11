import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import http from "../http/http";
import ClipLoader from "react-spinners/ClipLoader";
import { useProduct } from "../context/ProductContext";

const Header = ({ size, cartShow }) => {
  const navigate = useNavigate();
  const [isMenuActive, setMenuActive] = useState(false);
  const [isMenuActive2, setMenuActive2] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { product } = useProduct();
  const [productSearchKeyword, setSearchProductKeyword] = useState("");
  

  const fetchAllCategories = async () => {
    const response = await http.get("/category");
    if (response.status == 200) {
      setCategory(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    setLoading(true);
  }, []);

  

  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };

  const toggleMenu2 = () => {
    setMenuActive2(!isMenuActive2);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  const menuClass = isMenuActive ? "is-active" : "";
  const menuClass2 = isMenuActive ? "is-active2" : "";

  const handleSearch = (e) => {
    setSearchProductKeyword(e.target.value);
  };

  const onSearch = (searchTerm) => {
    setSearchProductKeyword(searchTerm);
  };

  

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h1 className="text-center logo">Sapient Culture.</h1>
          </Link>
        </div>
      
        <div className={`burger-menu ${menuClass2}`} onClick={toggleMenu}>
          <div className="line"></div>
        </div>
        <div className={"nav-for-small " + menuClass}>
          <nav className="nav flex-column">
            <Link to="/" onClick={closeMenu}>
              <p className="text-end nav-link menu-link ">All</p>
            </Link>
            {loading ? (
              // Display loading indicator (e.g., a spinner)
              <p className="text-end nav-link menu-link ">
                <ClipLoader size="15" />
              </p>
            ) : (
              // Render content with data
              <>
                {category["data"]?.map((name) => (
                  <Link
                    to={`/category/${name.id}`}
                    key={name.id}
                    onClick={closeMenu}
                  >
                    <p className="text-end nav-link menu-link">
                      {name.category_name}
                    </p>
                  </Link>
                ))}
              </>
            )}

            <Link to="/cart">
              <p className="text-end nav-link menu-link" onClick={closeMenu}>
                Cart
              </p>
            </Link>
          </nav>
        </div>
       

        <div
          className="cart-for-large"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          {cartShow ? (
            <div className="cart-icon">
              <MdShoppingCart size={25} />
              <sup className="badge text-dark">
                {size} {size <= 1 ? "ITEM" : "ITEMS"}
              </sup>
            </div>
          ) : null}
        </div>
      </div>
      <div className="search-product my-3">
          <input
            type="text"
            className="search-product-bar"
            placeholder="Search..."
            value={productSearchKeyword}
            onChange={handleSearch}
          />
          <div className="">
            {product && product.data
              ? product.data
                  .filter((item) => {
                    const searchTerm = productSearchKeyword.toLowerCase();
                    const product2 = item.product_name.toLowerCase();

                    return (
                      searchTerm &&
                      (product2.startsWith(searchTerm) ||
                        product2.includes(searchTerm)) &&
                      product2 !== searchTerm
                    );
                  })
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      // className="form-control"
                      key={item.id}
                      onClick={() => onSearch(item.product_name)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="mapped_product_name" onClick={()=>navigate(`/product-details/${item.id}`)}>{item.product_name}</div>
                    </div>
                  ))
              : null}
          </div>
        </div>

      <div className="cart-for-mobile mt-3" onClick={() => navigate("/cart")}>
        {cartShow ? (
          <div className="cart-icon">
            <MdShoppingCart size={25} />
            <sup className="badge text-white">
              {size} {size <= 1 ? "ITEM" : "ITEMS"}
            </sup>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;
