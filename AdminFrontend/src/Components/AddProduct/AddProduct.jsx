
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });


  };

  const Add_Product = async (image) => {
    try {
      // Create FormData for the image upload
      const formData = new FormData();
      formData.append('product', image);
  
      // Upload the image
      const uploadResponse = await fetch(`https://e-commerce-website-1-unv3.onrender.com/product/upload`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image.");
      }
  
      const uploadData = await uploadResponse.json();
  
      if (uploadData.success) {
        const uploadedImage = uploadData.image;
  
        // Update product details with the uploaded image
        const updatedDetails = {
          ...productDetails,
          image: uploadedImage,
        };
        setProductDetails(updatedDetails);
  
        // Add the product
        const addProductResponse = await fetch(`https://e-commerce-website-1-unv3.onrender.com/product/addproduct`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDetails),
        });
  
        if (!addProductResponse.ok) {
          throw new Error("Failed to add product.");
        }
  
        const addProductData = await addProductResponse.json();
  
        if (addProductData.success) {
          // Show success toast
          toast.success("Product added successfully!", { autoClose: 500 });
        } else {
          // Show error toast if adding the product fails
          toast.error("Failed to add product. Please try again.");
        }
      } else {
        // Show error toast if image upload fails
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  
  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Type here'
        />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Old Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
          type='text'
            name='old_price'
            placeholder='Type here'
          />
        </div>
        <div className='addproduct-itemfield'>
          <p>New Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type='text'
            name='new_price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='add-product-selector'
        >
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt='Product Thumbnail' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
      <ToastContainer  position='top-center'/>
    </div>
  );
};

export default AddProduct;