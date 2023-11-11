import React from "react";
import { Link } from "react-router-dom";
import http from "../http/http";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import "../styles/styles.css";

const Navbar = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllCategories = async () => {
    const response = await http.get("/category");
    if(response.status == 200) {
      setCategory(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    setLoading(true);

  }, []);

  

  return (
    <div>
      <nav className="nav flex-column">
        <Link to="/">
          <p className="text-end nav-link menu-link ">All</p>
        </Link>
        {loading ? (
          // Display loading indicator (e.g., a spinner)
          <p className="text-end nav-link menu-link "><ClipLoader size="15"/></p>
       
        ) : (
          // Render content with data
          <>
            {category["data"]?.map((name) => (
              <Link to={`/category/${name.id}`} key={name.id}>
                <p className="text-end nav-link menu-link">
                  {name.category_name}
                </p>
              </Link>
            ))}
          </>
        )}        

        <Link to="/cart">
          <p className="text-end nav-link menu-link">Cart</p>
        </Link>
        <Link to="/subscribe">
          <p className="text-end nav-link menu-link">Subscribe</p>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
