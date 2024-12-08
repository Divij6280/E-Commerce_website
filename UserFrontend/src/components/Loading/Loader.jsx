import React from 'react';
import './Loader.css';  // Import the CSS file

const Loader = ({ height = '30px', width = '30px', color = '#3498db' }) => {
  return (
    <div className="loader-container">
      <div 
        className="loader" 
        style={{
          width: width,
          height: height,
          borderTopColor: color,
        }}
      ></div>
    </div>
  );
};

export default Loader;
