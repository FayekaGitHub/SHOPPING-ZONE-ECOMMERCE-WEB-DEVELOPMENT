import React from 'react'
import {useSelector} from 'react-redux'
import '../styles/style.css';

export default function  () { 
    const currentuser =  useSelector(details=> details.userinfo);
    if(!currentuser.name)
    return(
<div> 
    <h1 style={{margin:"3rem"}}>NO USER LOGGED IN!</h1>
</div>
    );
  return (
    <div>
      <h1 style={{margin:"2rem"}}>PROFILE INFORMATION</h1>
      <div className='profile'>
      <div style={{margin:"2rem",gap:"1.5rem",padding:"2rem",display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
          <h2>NAME : {currentuser.name} </h2>
          <h2>EMAIL : {currentuser.email}</h2>
      </div>
      </div>
    </div>
  )
}
