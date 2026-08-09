import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = { maxWidth: '1000px', margin: '40px auto', padding: '30px', background: '#ffffff', borderRadius: '12px', border: '1px solid #f0d5da', boxShadow: '0 4px 20px rgba(215, 37, 84, 0.08)', color: '#1a1a1a' };
  const badgeStyle = { background: 'rgba(215,37,84,0.1)', color: '#d72554', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-block' };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f5e0e4', paddingBottom: '30px', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#1a1a1a', fontSize: '2.2rem', marginBottom: '10px' }}>My Profile</h2>
          <p style={{ color: '#6b6b6b', fontSize: '1.2rem', marginBottom: '5px' }}><strong>Name:</strong> {user.name}</p>
          <p style={{ color: '#6b6b6b', fontSize: '1.2rem', marginBottom: '15px' }}><strong>Email:</strong> {user.email}</p>
          <span style={badgeStyle}>Account Type: {user.role.toUpperCase()}</span>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: '#d72554', boxShadow: 'none', color: '#fff', border: 'none' }}>Logout</button>
      </div>

      <h3 style={{ color: '#d72554', marginBottom: '20px', fontSize: '1.5rem' }}>Order History</h3>
      {loading ? (
        <p style={{ color: '#6b6b6b' }}>Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: '#fdf1f3', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f0d5da' }}>
          <p style={{ color: '#6b6b6b', marginBottom: '15px' }}>You haven't placed any orders yet.</p>
          <Link
            to="/shop"
            className="btn"
            style={{ background: 'linear-gradient(90deg, #ef931b, #d72554)', color: '#fff', border: 'none', display: 'inline-block' }}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={{ background: '#fdf1f3', padding: '20px', borderRadius: '12px', border: '1px solid #f0d5da', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <p style={{ color: '#6b6b6b', fontSize: '0.9rem', marginBottom: '5px' }}>Order ID: <span style={{ color: '#1a1a1a' }}>{order._id}</span></p>
                <p style={{ color: '#6b6b6b', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#1a1a1a' }}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <p style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>Total: <strong style={{ color: '#10b981' }}>₹{order.totalAmount.toFixed(2)}</strong></p>
              </div>
              <div>
                <span style={{ 
                  background: order.status === 'Delivered' ? 'rgba(16,185,129,0.1)' : order.status === 'Shipped' ? 'rgba(59,130,246,0.1)' : 'rgba(239,147,27,0.12)', 
                  color: order.status === 'Delivered' ? '#10b981' : order.status === 'Shipped' ? '#3b82f6' : '#c17610',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
                }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;