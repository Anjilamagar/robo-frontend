import React, { useEffect, useState } from 'react';
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";

const HeaderUser = ({ toggleSearch }) => {
    const [currentNotification, setCurrentNotification] = useState(0);

    const notifications = [
        "🎉 Special Offer: Get 20% off on all robotics kits! Use code: ROBOT20",
        "🚀 New Arrival: Advanced AI Robot Kit now available!",
        "⚡ Flash Sale: 50% off on selected hardware - Limited time only!",
        "🎁 Free Shipping on orders over $100!",
        "🤖 Join our Robotics Workshop this weekend - Register now!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNotification((prev) => (prev + 1) % notifications.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="robotics-header">
            {/* Notification Banner */}
            <div className="notification-banner">
                <div className="notification-content">
                    <p className="notification-text" key={currentNotification}>
                        {notifications[currentNotification]}
                    </p>
                </div>
            </div>

            {/* Main Header */}
            <div className="header-main">
                {/* Left Section - Logo */}
                <div className="header-left">
                    <div className="logo-container">
                        <div className="logo-image">
                            <img
                                src="/logo_high_png[1].png"
                                alt="Robotics Logo"
                            />
                        </div>
                        <h1 className="logo-text">ROBOTICS</h1>
                    </div>
                </div>

                {/* Middle Section - Navigation */}
                <nav className="header-middle">
                    <div className="category-dropdown">
                        <button className="category-trigger">
                            <span>Categories</span>
                            <ChevronDown className="icon-sm" />
                        </button>
                        <div className="category-menu">
                            <a href="#starter" className="category-item">Starter Kits</a>
                            <a href="#hardware" className="category-item">Hardware &amp; Parts</a>
                            <a href="#sensors" className="category-item">Sensors &amp; Vision</a>
                            <a href="#learning" className="category-item">Learning Tools</a>
                        </div>
                    </div>
                    <a href="#about" className="nav-link">About Us</a>
                    <a href="#contact" className="nav-link">Contact Us</a>
                    <a href="#support" className="nav-link">Support</a>
                </nav>

                {/* Right Section - Actions */}
                <div className="header-right">
                    <button
                        onClick={toggleSearch}
                        className="icon-button"
                        aria-label="Search">
                        <Search className="icon-md" />
                    </button>

                    <button className="icon-button" aria-label="Cart">
                        <ShoppingCart className="icon-md" />
                        <span className="button-text">Cart</span>
                    </button>

                    <button className="get-started-btn">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderUser;