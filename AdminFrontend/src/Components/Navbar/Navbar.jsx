
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/user.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt='' className='nav-logo' />
      <img src={navProfile} alt='' className='nav-profile' />
    </div>
  );
}

export default Navbar;
