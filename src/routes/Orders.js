import "../styles/style.css";
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../connectors/UserContext';

class Orders extends Component{
  static contextType = UserContext;
      render(){
        const { user } = this.context;
        let str=user+"orders";
        let orders= JSON.parse(localStorage.getItem(str) || '[]');

      if(orders.length===0)
            return(
              <>
               <div ><Link  className="BackButton" to="/products"><i className="fa fa-angle-double-left"></i></Link></div>
                <div style={{margin:"1rem",fontSize:"2rem"}}>
                  YOU HAVE NOT PLACED ANY ORDERS YET!
                </div>
                </>
            );
      return (
       <div>
          <div >
            <Link  className="BackButton" to="/products"><i className="fa fa-angle-double-left"></i></Link></div>
             <h2 style={{margin:"2rem"}}>YOUR ORDERS</h2>
            <div style={{display:"flex",margin:"auto",gap:"1rem",width:"70%",height:"60vh",flexWrap:"wrap",overflowY:"scroll"}}>  
              {orders.map(order => ( 
                 <div className="orders" key={order.id}>
                   <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <img style={{padding:"20px"}} src={order.images[0]} alt="productImage"width='120' height='120'/> 
                    </div>
                   <div style={{display:"flex",justifyContent:"center",flexDirection:"column",padding:"10px",width:"75%"}}>
                      <div className="rowOrder"><p><b>Product: </b><span>{order.title}</span></p></div>
                      <div className="rowOrder"><p><b>Price : </b><span>{order.price}</span></p></div>
                      <div className="rowOrder"><p><b>Ouantity : </b><span> {order.count}</span></p></div>
                      <div className="rowOrder"><p><b>Ordered On :</b><span> {order.ordered}</span></p></div>
                      <div className="rowOrder"><p><b>Deliver On: </b><span> {order.delivery}</span> </p></div>
                 </div>
                   </div>
                 ))} 
          </div> 
          </div>
      );
              }
    }
export default Orders;