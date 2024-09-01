// import "../App.css";
import "../styles/Navbarstyle.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { CartContext } from '../connectors/CartContext';
import { UserContext } from '../connectors/UserContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {userlogout} from '../actions/userlogout';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar=()=> {
  const dispatch= useDispatch();
  const { user,removeUser} = useContext(UserContext);
  //console.log({user},{removeUser});
  const { cartCount, updateCartCount} = useContext(CartContext);
  //console.log({cartCount},{updateCartCount});
 
    return (
      <nav className="NavbarItems">
        <h3 className="NavbarLogo">SHOPPING ZONE</h3>
        <ul className="NavMenu">
            {
              MenuItems.map((item, index) => {
                // console.log(item.url);
                       if (item.title === 'Cart') {
                    return (
                      <Link className={item.cName} to={item.url}>
                         <li key={index}>
                           <p> <i className={item.icon}></i>{item.title}
                           <span className="count" id="cartCount">{cartCount}</span>
                           </p>
                         </li>
                      </Link>
                   
                  );
                } 
                  if(item.title === 'Log In/Sign Up' ) {
                    return (
                  
                     <>
                         {user.length!==0 && <Link className={item.cName} to='/'onClick={()=>{dispatch(userlogout());removeUser();updateCartCount(0);}} >
                         <li key={index}> 
                         <p><span><i className={item.icon}></i></span>
                          <span>Log Out</span>
                           </p>
                           </li>
                      </Link>} 
                       {user.length===0 && <Link className={item.cName} to={ item.url}  >
                           <li>
                           <p><span><i className={item.icon}></i></span>
                           <span>{item.title}</span>
                           </p>
                           </li>
                          </Link>}
                          </>
                      
                    );
                  }
                 else {
                  return (
                  
                      <Link className={item.cName} to={item.url}>
                          <li key={index}>
                        <p><span><i className={item.icon}></i></span>{item.title}</p>
                        </li>
                      </Link>
                    
                  );
                  }
                })
              }
        </ul>
      </nav>
    );
  }

export default Navbar;

