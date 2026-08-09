import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  const cardStyle = {
    padding: '25px',
    background: '#ffffff',
    border: '1px solid #f0d5da',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(215, 37, 84, 0.08)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px'
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #ef931b, #d72554)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '40px', width: '40px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 0px 10px rgba(215, 37, 84, 0.25))' }} />
        <h2 style={{ margin: 0, color: '#1a1a1a' }}>Admin Dashboard</h2>
      </div>
      <p style={{ color: '#6b6b6b', marginBottom: '30px', fontSize: '1.1rem' }}>Welcome back, <span style={{color: '#1a1a1a', fontWeight: 600}}>{user?.name}</span>.</p>
      
      {stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h4 style={{ color: '#6b6b6b', fontSize: '1rem' }}>Total Orders</h4>
            <div style={numberStyle}>{stats.totalOrders}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#6b6b6b', fontSize: '1rem' }}>Total Products</h4>
            <div style={numberStyle}>{stats.totalProducts}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#6b6b6b', fontSize: '1rem' }}>Total Users</h4>
            <div style={numberStyle}>{stats.totalUsers}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#6b6b6b', fontSize: '1rem' }}>Total Revenue</h4>
            <div style={numberStyle}>₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', margin: '50px 0', color: '#d72554' }}>Loading metrics...</div>
      )}

      <div style={{ marginTop: '40px', padding: '30px', background: '#ffffff', borderRadius: '12px', border: '1px solid #f0d5da', boxShadow: '0 4px 20px rgba(215, 37, 84, 0.08)' }}>
        <h3 style={{ marginBottom: '25px', color: '#d72554' }}>Controls:</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button
            className="btn"
            onClick={() => navigate('/admin/add-product')}
            style={{ background: 'linear-gradient(90deg, #ef931b, #d72554)', color: '#fff', border: 'none' }}
          >
            + Add Product
          </button>
          <button
            className="btn"
            onClick={() => navigate('/admin/products')}
            style={{ background: '#fdf1f3', color: '#d72554', border: '1px solid #f0d5da' }}
          >
            Manage Products
          </button>
          <button
            className="btn"
            onClick={() => navigate('/admin/orders')}
            style={{ background: '#fdf1f3', color: '#d72554', border: '1px solid #f0d5da' }}
          >
            Manage Orders
          </button>
          <button
            className="btn"
            onClick={() => navigate('/admin/users')}
            style={{ background: '#fdf1f3', color: '#d72554', border: '1px solid #f0d5da' }}
          >
          Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;