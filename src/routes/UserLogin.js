import React from 'react'
import "../styles/style.css";
import { useState,useContext} from 'react';
import { UserContext } from '../connectors/UserContext';
import { Link } from "react-router-dom";
import { CartContext } from '../connectors/CartContext';
import { useDispatch } from 'react-redux';
import {userlogin} from '../actions/userlogin';


 const UserLogin=({onClose})=>{
  const dispatch= useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fixUser } = useContext(UserContext);
  const { updateCartCount } = useContext(CartContext);

  
  let users = JSON.parse(localStorage.getItem('allusers') || '[]');
  const fixCartCount= () => {
    let str=username+"cart";
    let cart = JSON.parse(localStorage.getItem(str) || '[]');
    const uniqueCartItems = cart.reduce((acc, cur) => {
      if (!acc.find(item => item.id === cur.id)) {
        acc.push(cur);
      }
      return acc;
    }, []);
    updateCartCount(uniqueCartItems.length);
  };

  
  const login = () => {
    if(users.some((elem) => elem.Name === username && elem.Password === password)) {
      alert("LOGGED IN AS "+ username);
      fixUser(username);
      fixCartCount(username);
     } else {
      alert("YOUR USERNAME OR PASSWORD IS INCORRECT");
     }
};

    return (
      <div  className="dialog-overlay">
          <div className="dialog">
         <div>
        <button className="CloseButton" onClick={onClose}><i className="fa fa-close"></i></button>
        <div style={{ width:"600px",height:"400px"}} >
        <h2  style={{margin:"3rem"}} >Log In</h2>
    <div className="input-container">
    <i className="fa fa-user icon"></i>
    <input className="input-field" type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" />
  </div>
  <div className="input-container">
    <i className="fa fa-envelope icon"></i>
    <input className="input-field" type="text" onChange={e => setEmail(e.target.value)}  placeholder="Email" />
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="password" onChange={e => setPassword(e.target.value)}  placeholder="Password" />
  </div>
  <Link to={(users.some((elem) => elem.Name === username && elem.Password === password) ? '/products' : '/user' )}>
    <button className="btn" onClick={()=>{login();dispatch(userlogin(username, email));}}>Log In</button>
    </Link>
    </div>
      </div>
      </div>
      </div>
    );
  }
  export default UserLogin;
