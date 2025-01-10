import { useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png'
import { useEffect } from 'react';
import { apiRequest } from '../../utils/utils.config';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);


 
    // You can add your fetch request here for adding the product
    // console.log(productDetails);
    // let responseData;
    // let formData = new FormData();
    // formData.append('product', image);

    const fetchInfo = async () => {
      try {
        const data = await apiRequest('/product/upload', 'GET');
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching product info:", error);
      }
    };

    useEffect(()=>{
      fetchInfo()
    },[])
  
      

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Prices</p>
        <p>New Prices</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <div key={index} className="listproduct-format-main">
            <img src={product.image} className="listproduct-product-icon"  />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img className='listproduct-remove-icon' src={cross_icon} alt="cross icon" />
          </div>


        })}
      </div>
    </div>
  );
}

export default ListProduct;