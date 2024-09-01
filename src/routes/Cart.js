import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/style.css';
import { useContext } from 'react';
import { CartContext } from '../connectors/CartContext';
import { UserContext } from '../connectors/UserContext';


const Cart=()=> {
        const [cartItems, setCartItems] = useState([]); 
        const [updatedcartItems, updatedsetCartItems] = useState(null); 
        const [addData,setCurrentDataplus]=useState([]);
        const [subData,setCurrentDataminus]=useState([]);
        const { updateCartCount } = useContext(CartContext);
        const { user } = useContext(UserContext);
        let [subTotal, setSubTotal] = useState(0); 
        const [Total, setTotal] = useState(0); 
        let str=user+"cart";
        let strOrder=user+"orders";

        useEffect(() => {
            let cart = JSON.parse(localStorage.getItem(str) || '[]'); 
            setCartItems(cart);
            let sub=0;
            for (let one in cart)
            {
              sub=sub+(cart[one].count)*(cart[one].price);
            }
            setup(sub);
          },[]);
          
          const setup=(sub)=>{
            setSubTotal(sub);
            setTotal(sub+28);
        };

        useEffect(() => {
          if(addData.length!==0){
          let sub=0;
          let cart = JSON.parse(localStorage.getItem(str) || '[]');
          for (let one in cart)
          {
            sub=sub+(cart[one].count)*(cart[one].price);
          }
          setCartItems(cart);
          setup(sub);
          setCurrentDataplus('');
        }
        }, [addData]); 

        useEffect(() => {
          if(subData.length!==0){
          let sub=0;
          let cart = JSON.parse(localStorage.getItem(str) || '[]');
          for (let one in cart)
          {
            sub=sub+(cart[one].count)*(cart[one].price);
          }
          setCartItems(cart);
          setup(sub);
          setCurrentDataminus('');
        }
        }, [subData]);

        useEffect(() => {
          if(updatedcartItems){
            setCartItems(updatedcartItems);
           }
        }, [updatedcartItems]);

          const ship=18;
          const tax=10;
          const today = new Date();
          const deliveryDate = new Date(today);
          deliveryDate.setDate(today.getDate() + 6);
          const formattedToday = today.toLocaleDateString('en-GB');
          const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-GB');

          const message=() =>{
            alert("ORDER PLACED SUCCESSFULLY");
            let cart = JSON.parse(localStorage.getItem(str) || '[]');
            const newcart = cart.map(item => ({
              ...item,
              ordered:formattedToday,
              delivery: formattedDeliveryDate
            }));        
            localStorage.setItem(strOrder, JSON.stringify(newcart));
            localStorage.removeItem(str);
            updateCartCount(0);
            setCartItems(cart);
          };

          const reflectplusChange=(data) => {
            const cart = JSON.parse(localStorage.getItem(str) || '[]');
            const dupcart = Array.from(cart);
            const index = dupcart.findIndex((item) => item.id === data.id);
            if(index>=0){
              dupcart[index].count++;
              localStorage.setItem(str, JSON.stringify(dupcart));
            }
            setCurrentDataplus(data);
          };
         

          const reflectminusChange=(data) =>{
            let val= document.getElementById(data.id).innerHTML;
            val=parseInt(val)-1;
            if(val===0)
            {
              deletefromcart(data);
            }
            else{
                const cart = JSON.parse(localStorage.getItem(str) || '[]');
                const dupcart = Array.from(cart);
                const index = dupcart.findIndex((item) => item.id === data.id);
                if(index>=0){
                   dupcart[index].count--;
                  localStorage.setItem(str, JSON.stringify(dupcart));
                }
                  setCurrentDataminus(data);
            }
          };
          

          const deletefromcart=(data)=>{
                let cart = JSON.parse(localStorage.getItem(str) || '[]');
                let updatedCart = cart.filter(item => item.id !== data.id);
                localStorage.setItem(str, JSON.stringify(updatedCart));
                updateCartCount(updatedCart.length);
                cart = JSON.parse(localStorage.getItem(str) || '[]');
                updatedsetCartItems(cart);
          };

          if(cartItems && cartItems.length===0)
          return(
            <>
            <div ><Link  className="BackButton" to="/products"><i className="fa fa-angle-double-left"></i></Link></div>
              <div style={{margin:"6rem",fontSize:"5rem"}}>
                  CART IS EMPTY!
              </div>
              </>
          );
    return(
        <>
        <div >
          <Link  className="BackButton" to="/products"><i className="fa fa-angle-double-left"></i></Link></div>
        <div style={{display:"flex",justifyContent:"space-evenly"}}> 
        <div className="cartproducts">  
        {  cartItems.map((data)=> {
                        return(  
                <div key={data.id}>
              <div className="cproduct">
                   <h4>{data.title}</h4>
                   <div >
                   <img src={data.images[0]} alt="productImage" width='150' height='130'/>
                    </div>
                  <p className="price">${data.price}</p>
                 <div className="productCount">
                  <button className="countButton" onClick={()=>reflectminusChange(data)}>-</button>
                  <div className="countDisplay" id={data.id}>{data.count}</div>
                  <button className="countButton" onClick={()=>reflectplusChange(data)}>+</button>
                </div>
              </div> 
              </div>
              );} 
             )} 
           </div>
           <div className="main">
                <div className="billstyle">
                   <h2 style={{marginBottom:"10px"}}>BILLING</h2>
                    <div className="charge">
                        <h4>SUB TOTAL</h4>
                        <h4>$<span id="subtotal">{subTotal.toFixed(2)}</span></h4>
                    </div>
                    <div className="charge">
                            <h4>SHIPPING</h4>
                            <h4>$<span>{ship}</span></h4>
                        </div>
                    <div className="charge">
                            <h4>SALES TAX</h4>
                            <h4>$<span>{tax}</span></h4>
                    </div>
                    <div className="charge">
                        <h4>TOTAL</h4>
                           <h4>$<span id="total">{Total.toFixed(2)}</span></h4>
                    </div>
                    <div style={{display: "flex", justifyContent: 'center'}}>
                    <Link to='/orders'><button className="buttonstyle" onClick={()=>message()}>PLACE ORDER</button></Link> 
                    </div>
                </div>
          </div>
        </div>
        </>
    );
}

export default Cart;


