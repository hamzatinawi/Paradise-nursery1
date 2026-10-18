import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    
    // حساب إجمالي عدد العناصر في السلة (لأيقونة السلة)
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // قائمة النباتات المطلوبة في التقييم (مقسمة لـ 3 فئات، كل فئة فيها نباتات)
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://images.unsplash.com/photo-1585233159957-c3311894d8d1?auto=format&fit=crop&w=800&q=80",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://images.unsplash.com/photo-1600860002871-3323080ff9ba?auto=format&fit=crop&w=800&q=80",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1596766185859-a2e635f7564d?auto=format&fit=crop&w=800&q=80",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Mint",
                    image: "https://images.unsplash.com/photo-1608688466632-15438865675d?auto=format&fit=crop&w=800&q=80",
                    description: "Refreshing aroma, used in cooking and tea.",
                    cost: "$10"
                },
            ]
        },
        {
            category: "Succulents",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d7fed5?auto=format&fit=crop&w=800&q=80",
                    description: "Soothing gel used for skin ailments.",
                    cost: "$14"
                },
                {
                    name: "Echeveria",
                    image: "https://images.unsplash.com/photo-1509424756314-ecce9dd19c01?auto=format&fit=crop&w=800&q=80",
                    description: "Drought-tolerant succulent with rosette shape.",
                    cost: "$18"
                },
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    // التحقق مما إذا كان النبات موجوداً في السلة لتعطيل الزر
    const isAddedToCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
    };

    return (
        <div>
            {/* شريط التنقل (Navbar) */}
            <div className="navbar">
                <div className="navbar-logo">
                    <a href="/" style={{textDecoration: 'none'}}>
                        <div className="logo-text">
                            <h3>Paradise Nursery</h3>
                            <i>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
                <div className="navbar-links">
                    <a href="#" onClick={handlePlantsClick} className="nav-link">Plants</a>
                    <a href="#" onClick={handleCartClick} className="nav-link cart-icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="40" width="40">
                            <rect width="256" height="256" fill="none"></rect>
                            <circle cx="80" cy="216" r="12" fill="white"></circle>
                            <circle cx="184" cy="216" r="12" fill="white"></circle>
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,15.9,0,0,180.1,176H73.9a15.9,15.9,15.9,0,0-15.2-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                        </svg>
                        {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                    </a>
                </div>
            </div>

            {/* عرض المنتجات أو السلة بناءً على حالة showCart */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <h3 className="product-title">{plant.name}</h3>
                                        <p className="product-description">{plant.description}</p>
                                        <p className="product-price">{plant.cost}</p>
                                        <button 
                                            className={`product-button ${isAddedToCart(plant.name) ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={isAddedToCart(plant.name)}
                                        >
                                            {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;