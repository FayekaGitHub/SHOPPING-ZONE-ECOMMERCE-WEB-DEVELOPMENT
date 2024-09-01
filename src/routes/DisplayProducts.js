import "../styles/style.css";
import { useEffect, useState } from "react"
import  ProductDialog from "./ProductDialog";
import React from 'react'
import { useContext ,useCallback} from 'react';
import { CartContext } from '../connectors/CartContext';
import { UserContext } from '../connectors/UserContext';
import { useDebounce } from 'use-lodash-debounce'

const DisplayProducts=()=> {
  let url = "https://dummyjson.com/products";
  const [proddata, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortval, setSort] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { updateCartCount } = useContext(CartContext);
  const { user } = useContext(UserContext);
  let str=user+"cart";
  let cart = JSON.parse(localStorage.getItem(str) || '[]');

  const SpecificButton = (data,buttonFor) => {
    let element = document.getElementById(data.id);
    let cart = JSON.parse(localStorage.getItem(str)|| '[]');
    if(buttonFor ==="add"){
      alert("PRODUCT ADDED TO CART SUCCESSFULLY!");
    element.classList.remove("addbutton");
    element.classList.add("deletebutton");
    addToCart();
    data.count=1;
    //console.log(data);
    cart.push(data);
    localStorage.setItem(str, JSON.stringify(cart));
    }
    else{
      alert("PRODUCT DELETED FROM CART SUCCESSFULLY!");
      element.classList.remove("deletebutton");
      element.classList.add("addbutton");
      delFromCart();
      let id=data.id;
      data.count=0;
      let updatedCart = cart.filter(item => item.id !== id);
      localStorage.setItem(str, JSON.stringify(updatedCart));
      }
     };

  const addToCart = () => {
    updateCartCount((prevCount) => prevCount + 1);
  };
  const delFromCart = () => {
    updateCartCount((prevCount) => prevCount - 1);
  };


  
  const  handleProductClick = useCallback((data) => {
      setSelectedProduct(data);
    },[]);

  const handleDialogClose = useCallback((data) => {
    setSelectedProduct(null);
  },[]);

  const handleonChange =useCallback((event) => {
    setSort(event.target.value);
  },[]);


  const searchVal = useDebounce(searchQuery, 500);



  const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data.products);
         
        } catch (error) {
          console.log(error);
        }
      };


  useEffect(() => {
        fetchData();
      }, [])

  useEffect(() => {
         displaySort();
          }, [sortval])

const displaySort = async () => {
    try {
      url="https://dummyjson.com/products";
      const response = await fetch(url);
      const alldata = await response.json();
      let data=alldata.products;
      if(data.length!==0 && sortval!=="all"){
        if(sortval==="lth"){
        data = data.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
          });
       }
     else if(sortval==="htl"){
       data = data.sort((a, b) => {
       if (a.price > b.price) {
         return -1;
       }
     });
    }
     else if(sortval==="rate"){
       data = data.sort((a, b) => {
       if (a.rating > b.rating) {
         return -1;
       }
     });
    }
     else if(sortval==="stock"){
       data = data.sort((a, b) => {
       if (a.stock > b.stock) {
         return -1;
       }
     });
     }
     else if(sortval==="discount"){
     data = data.sort((a, b) => {
       if (a.discountPercentage > b.discountPercentage) {
         return -1;
       }
     });
     }
     setData(data);
    } 
  } 
     catch (error) {
      console.log(error);
     }
   };

  const fetchSearchData = async () => {
        try {
          url="https://dummyjson.com/products/search?q="+searchQuery;
          const response = await fetch(url);
          const data = await response.json();
          setData(data.products);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchSearchData();
      }, [searchVal])
  
  return(
      <div className="App">
       <div style={{display:"flex",flexDirection:"row",justifyContent:"center",height:"8vh"}}>
        <input type="text" className="searchBox" placeholder="SEARCH" onChange={e => setSearchQuery(e.target.value)} />  
              <select className="my-select" onChange={handleonChange}>    
              <option  value="rate">Rating</option>
              <option value="stock">Stock</option>
              <option value="discount">Discount</option>
              <option value="lth">Price: Low to High</option>
              <option value="htl">Price: High to Low</option>
            </select>
          </div>
         <div style={{fontSize:"1rem"}}> <marquee><b>FLAT 50% OFF ON SMARTPHONES</b></marquee></div>
          <div className="productsdesign">  
            {proddata && proddata.length > 0 && proddata.map((data) => { 
            return (
              <div className="product" id="cartbutton" key={data.id}>
             
                   <p style={{margin:"0"}}>{data.title}</p>
                   <div style={{display:"flex",justifyContent:"center"}}>
                   <img src={data.images[0]} alt="productImage"width='100' height='100'/>
                    </div>
                  <p className="price">${data.price}</p> 
                  <button  className="viewbutton" onClick={() => handleProductClick(data)}>View Product</button>   
                  {
                    cart.some(prod => prod.id === data.id) 
                    ?   
                    <button onClick={()=>SpecificButton(data,"del")} className="deletebutton" id={data.id}>Delete from Cart</button> 
                    :
                    <button  onClick={()=>SpecificButton(data,"add")} className="addbutton" id={data.id}>+ Add to Cart</button>
                  }
                  </div> 
              ); 
             })} 
              {
                  selectedProduct && (
                  <ProductDialog data={selectedProduct} onClose={handleDialogClose} />
              )}
           </div>
          </div>
      ); 
    };

export default DisplayProducts;
