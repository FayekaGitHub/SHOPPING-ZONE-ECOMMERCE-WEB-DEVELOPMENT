
import '../styles/style.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  ProductDialog from "./ProductDialog";


const EachCategory=()=>{
    const { category } = useParams();
    const [categorydata, setCategorydata] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [flag,setFlag] =useState(0);
    useEffect(() => {
      Displaydata();     
    });
    const Displaydata = async()=>{
    let url= `https://dummyjson.com/products/category/${category}`;
      try {
         const response = await fetch(url);
         const data = await response.json();
         setCategorydata(data);
       } 
      catch (error) {
        displayerror();
        console.log(error);
      }
    }
    const displayerror=()=>{
      setFlag(1);
    }

   const  handleProductClick = (data) => {
      setSelectedProduct(data);
    }

  const handleDialogClose = () => {
    setSelectedProduct(null);
  }

    return(
        <div>
        <div>
          <Link  className="BackButton" to="/categories">
            <i className="fa fa-angle-double-left"></i>
            </Link></div>
            { flag===0 && !categorydata 
           &&
           (<h2 style={{textAlign:"center",margin:"1rem 20rem 1rem 20rem"}}>LOADING....</h2>)
        }
         {  flag===1 && !categorydata 
           &&
           (<h2 style={{textAlign:"center",margin:"1rem 20rem 1rem 20rem"}}>NO RESULTS FOUND</h2>)
        }
        {  flag===0 && categorydata 
           &&
           (<h2 style={{textAlign:"center",margin:"1rem 20rem 1rem 20rem"}}>PRODUCTS</h2>)
        }
        <div className="productsdesign"> 
        {categorydata && categorydata.products.length > 0 && categorydata.products.map((data) => {
      return (
            <div className="product" key={data.id}>
                   <h3>{data.title}</h3>
                   
                   <div style={{display:"flex",justifyContent:"center"}}>
                   <img src={data.images[0]} alt="productImage"width='100' height='100'/>
                    </div>
                    
                 <p className="price">${data.price}</p> 
                 <button className="viewbutton" onClick={() => handleProductClick(data)}>View Product</button>
            </div> 
          ); 
        })}
         {selectedProduct && (
        
        <ProductDialog data={selectedProduct} onClose={handleDialogClose} />
      )}
        </div> 
        </div>
    );
}


export default EachCategory;
