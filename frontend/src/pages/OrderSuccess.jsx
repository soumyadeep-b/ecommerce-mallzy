import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '50px 30px',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #f0d5da',
    boxShadow: '0 10px 40px rgba(215, 37, 84, 0.08)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#10b981' }}>Payment Successful!</h2>
      <p style={{ color: '#6b6b6b', fontSize: '1.2rem', marginBottom: '40px' }}>
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>
      <Link
        to="/shop"
        className="btn"
        style={{ background: 'linear-gradient(90deg, #ef931b, #d72554)', color: '#fff', border: 'none', display: 'inline-block' }}
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;