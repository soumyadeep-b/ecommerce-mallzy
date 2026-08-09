import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #f0d5da',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ color: '#d72554', marginBottom: '10px' }}>Mallzy.</h3>
          <p style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>Built with 🧡 by Soumyadeep Biswas.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/about" style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>About</Link>
          <Link to="/return" style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>Return Policy</Link>
        </div>
        
        <div style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Mallzy. All rights reserved.
        </div>
      </div>

    </footer>
  );
};

export default Footer;