import React from 'react'
import "../styles/style.css";
const ProductDialog = ({ data ,onClose})=> {
    return (
      <div className="dialog-overlay">
          <div className="dialog">
      <div className="ViewProduct">
        <button className="CloseButton" onClick={onClose}><i class="fa fa-close"></i></button>
          <div stye={{display:"flex"}}>
        <p>Product : {data.title}</p>
        <img src={data.images[0]} alt="productImage" width='200' height='200'/>
        <p><span style={{fontWeight:"bold"}}>Description :</span> {data.description}</p>
        <p><span style={{fontWeight:"bold"}}>Stock : </span>{data.stock}</p>
        <p><span style={{fontWeight:"bold"}}>Rating : </span>{data.rating}</p>
        <p><span style={{fontWeight:"bold"}}>Price : </span>${data.price}</p>
        <p><span style={{fontWeight:"bold"}}>Discount : </span>.{data.discountPercentage}%</p> 
        </div>
      </div>
      </div>
      </div>
    );
  }
  export default ProductDialog;