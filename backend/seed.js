const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('pass123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@ecom',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    const products = [
      {
        name: 'ASUS Vivobook 15',
        description: 'A versatile 15.6 inch laptop featuring an Intel core i5 processor, 16 GB RAM and 512 GB SSD. Ideal for students, office work, programming, entertainment, and everyday multitasking.',
        price: 54400,
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ratings: 4.8,
        numReviews: 71
      },
      {
        name: 'High Back Single Seater Sofa (Yellow)',
        description: 'A stylish and comfortable addition to any contemporary living room. Wing Chair  to relax and read (Wood, Polyester)',
        price: 13200,
        category: 'Furniture',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ratings: 4.7,
        numReviews: 109
      },
      {
        name: 'Elegant Handbag',
        description: 'Stylish and spacious handbag designed for everyday use. Features premium finish, durable construction, comfortable handles and multiple compartments for carrying essentials.',
        price: 1499,
        category: 'Fashion',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=763&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ratings: 4.2,
        numReviews: 50
      },
      {
        name: 'Classic White Sneakers',
        description: 'Unisex Canvas Comfortable & Lightweight Sneaker (Red). Step into a world of effortless style and everyday comfort.',
        price: 850,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ratings: 4.5,
        numReviews: 88
      }
    ];

    await Product.insertMany(products);
    
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();