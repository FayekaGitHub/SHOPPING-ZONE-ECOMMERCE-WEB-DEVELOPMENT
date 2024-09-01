import React from 'react'
import '../styles/style.css';
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';


const Categories=()=> {
    const url = "https://dummyjson.com/products/categories";
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(0);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
       displayerror(error);
      }
    };
    
    const displayerror=()=>{
      setFlag(1);
    }
    useEffect(() => {
      fetchData();
    })

    if(data)
    return(
      <div>
        <div>
          { 
            flag===1 
            &&
            (<h1 style={{margin:"5rem 30rem 5rem 30rem"}}>RESULTS NOT FOUND</h1>)
           }
          { 
           flag===0 && !data 
            &&
            (<h1 style={{margin:"5rem 30rem 5rem 30rem"}}>LOADING...</h1>)
          }
          <div className="categoriesdesign">
          {data.map((category,index) => {
           return (
            <button key={index} className="category"><Link to={`/categories/${category.name}`} 
            className="CategoryLink">{String(category.name).toUpperCase()}</Link></button>
          );
        })} 
     </div>
    </div>
    </div>  
     );  
  }

export default Categories;
  