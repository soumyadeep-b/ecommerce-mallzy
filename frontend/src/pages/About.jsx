import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #f0d5da',
    boxShadow: '0 10px 40px rgba(215, 37, 84, 0.08)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    background: '#fdf1f3',
    color: '#d72554',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid #f0d5da'
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt=""
        style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #ef931b', marginBottom: '20px', boxShadow: '0 4px 20px rgba(215, 37, 84, 0.3)' }}
      />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a1a' }}>About Me</h2>
      <h3 style={{ fontSize: '1.5rem', color: '#ef931b', marginBottom: '15px' }}>Soumyadeep Biswas</h3>

      <p style={{ color: '#6b6b6b', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}> Hi, I'm Soumyadeep Biswas — a second-year B.Tech CSE student, currently in my third semester. I'm currently focused on strengthening my skills across the full stack — designing responsive, intuitive interfaces on the front end, and building functional, database-driven systems on the back end.
        <br></br>
      Mallzy is a hands-on project born out of that learning journey — a full-stack MERN ecommerce platform built from scratch, covering everything from product catalogs and cart management to secure Razorpay payments, email-verified authentication, and an admin dashboard for managing the store.
      <br></br>
      I'm always looking to take on new challenges and steadily work toward becoming a well-rounded full-stack developer.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <a href="https://soumyadeep-b.github.io/personal-portfolio/" target="_blank" rel="noreferrer" style={socialBtnStyle}>Portfolio</a>
        
        <a href="https://www.instagram.com/soumyadeepbiswas_" target="_blank" rel="noreferrer" style={socialBtnStyle}> Instagram</a>
        <a href="https://www.linkedin.com/in/soumyadeep-biswas-264066418/" target="_blank" rel="noreferrer" style={socialBtnStyle}>LinkedIn</a>
        <a href="https://x.com/SoumyadeepHi" target="_blank" rel="noreferrer" style={socialBtnStyle}> X (Twitter)</a>
        
      </div>
    </div>
  );
};

export default About;