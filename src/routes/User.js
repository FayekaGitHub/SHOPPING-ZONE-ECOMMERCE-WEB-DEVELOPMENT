import '../styles/style.css';
import { Link } from 'react-router-dom';
import React, { useState,useContext} from 'react';
import UserLogin from './UserLogin';
import { UserContext } from '../connectors/UserContext';
import { CartContext } from '../connectors/CartContext';
import { useDispatch } from 'react-redux';
import {userlogin} from '../actions/userlogin';


const User=()=>{
  const dispatch= useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flag, setFlag] = useState(null);
  const { fixUser } = useContext(UserContext);
  const { updateCartCount } = useContext(CartContext);
  let users={'Name':'fayeka',
    'Password' : '123',
    'Phone' : 12345,
    'Email' : '123@gmail.com'};
 let newusers= JSON.parse(localStorage.getItem('allusers') || '[]');
  newusers.push(users);
  const uniqueusers = newusers.reduce((acc, cur) => {
    if (!acc.find(item => item.id === cur.id)) {
      acc.push(cur);
    }
    return acc;
  }, [])
  localStorage.setItem('allusers', JSON.stringify(uniqueusers));
  //console.log(uniqueusers);

  const fixCartCount= () => {
  let str=username+"cart";
  let cart = JSON.parse(localStorage.getItem(str) || '[]');
  updateCartCount(cart.length);
};
  const register = () => {
    const details = {
        'Name' : username,
        'Password' : password,
        'Phone' : phone,
        'Email' : email
    }
   
    if(username && password && phone && email){
      alert("USER REGISTERED SUCCESSFULLY!");
     alert("LOGGED IN AS "+details.Name);  
     fixUser(username);
     fixCartCount(username);
     let userdetails= JSON.parse(localStorage.getItem('allusers'));
     userdetails.push(details);
     localStorage.setItem('allusers', JSON.stringify(userdetails));
  }
  else{
    alert("FILL ALL THE DETAILS!");
  }
}
const clearvalues = () => {
  document.getElementById("name").value="";
  document.getElementById("pw").value="";
  document.getElementById("ph").value="";
  document.getElementById("mail").value="";
}
const handleDialogClose = () => {
  setFlag(null);
}
    return(
        <>
        <div ><Link  className="BackButton" to="/"><i className="fa fa-angle-double-left"></i></Link></div>
        <div style={{display:"flex",justifyContent:"center"}}>
    <div style={{ width:"500px"}} >
  <h2  style={{margin:"3rem"}} >Sign Up</h2>
  <div className="input-container">
    <i className="fa fa-user icon"></i>
    <input className="input-field" type="text" id="name" onChange={e => setUsername(e.target.value)}placeholder="Username" name="usrnm"/>
  </div>

  <div className="input-container">
    <i className="fa fa-envelope icon"></i>
    <input className="input-field" type="text" id="mail" onChange={e => setEmail(e.target.value)}  placeholder="Email" name="email"/>
  </div>

  <div className="input-container">
    <i className="fa fa-phone icon"></i>
    <input className="input-field" type="text" id="ph" onChange={e => setPhone(e.target.value)}  placeholder="Phone" name="phone"/>
  </div>
  
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="password" id="pw" onChange={e => setPassword(e.target.value)} placeholder="Password" name="psw"/>
  </div>

  <Link to='/products'><button className="btn" onClick={()=>{ register(); dispatch(userlogin(username, email)); clearvalues();}}>Register</button></Link>

  <p className="login" onClick={()=>setFlag(1)}>Click Here to Log In!</p>
  {flag && (<UserLogin onClose={handleDialogClose}/>)}
    </div>
        </div>
        </>
    )
}

export default User;
