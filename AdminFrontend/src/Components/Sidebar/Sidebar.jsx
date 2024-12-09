import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import edit_product_icon from '../../assets/edit.png';
import delete_product_icon from '../../assets/delete.png'

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <div className='sidebar-item' onClick={() => navigate('/listproduct')} style={{ textDecoration: 'none' }}>
        <img src={list_product_icon} alt='Product List Icon' />
        <p>Product List</p>
      </div>
      <div className='sidebar-item' onClick={() => navigate('/addproduct')} style={{ textDecoration: 'none' }}>
        <img src={add_product_icon} alt='Add Product Icon' />
        <p>Add Product</p>
      </div>
      <div className='sidebar-item' onClick={() => navigate('/editproduct')} style={{ textDecoration: 'none' }}>
        <img className="Product-logo" src={edit_product_icon} alt='Edit Product Icon' />
        <p>Edit Product</p>
      </div>
      <div className='sidebar-item' onClick={() => navigate('/deleteproduct')} style={{ textDecoration: 'none' }}>
        <img className="Product-logo" src={delete_product_icon} alt='Delete Product Icon' />
        <p>Delete Product</p>
      </div>
    </div>
  );
}

export default Sidebar;
