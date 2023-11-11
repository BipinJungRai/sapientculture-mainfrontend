import React from "react";

const footer = () => {
  return (
    <footer>
    <div className="container-fluid p-3 text-center" style={{'backgroundColor' : 'black' , 'color' : 'white'}}>
      <div className="row">
        {/* <div className="col-md-6"> */}
        <p onClick={()=>navigate('#')} className="TnC">Terms & Conditions</p>
        <p className="text">Contact: contact@yourcompany.com</p>
          <p>&copy; {new Date().getFullYear()} Sapient Culture</p>
        {/* </div> */}
        {/* <div className="col-md-6"> */}
         
        {/* </div> */}
      </div>
    </div>
  </footer>
  );
};

export default footer;
