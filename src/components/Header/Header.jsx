import React, { useEffect, useState } from 'react';
import { ChevronDown, Search, ShoppingCart, User, LogOut, Settings, Package, Heart } from "lucide-react";

const Header = ({ toggleSearch, isLoggedIn = false, userProfile = null }) => {
    const [currentNotification, setCurrentNotification] = useState(0);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuOpen && !event.target.closest('.profile-dropdown')) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileMenuOpen]);

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
        setProfileMenuOpen(false);
    };

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

                    {/* Conditional Rendering: Get Started vs Profile */}
                    {!isLoggedIn ? (
                        // For New Users - Get Started Button
                        <button className="get-started-btn">
                            Get Started
                        </button>
                    ) : (
                        // For Logged-In Users - Profile Dropdown
                        <div className="profile-dropdown">
                            <button
                                className="profile-trigger"
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                aria-label="Profile menu">
                                <div className="profile-avatar">
                                    {userProfile?.avatar ? (
                                        <img src={userProfile.avatar} alt="Profile" />
                                    ) : (
                                        <User className="icon-md" />
                                    )}
                                </div>
                                <span className="profile-name">{userProfile?.name || 'Account'}</span>
                                <ChevronDown className={`icon-sm profile-chevron ${profileMenuOpen ? 'open' : ''}`} />
                            </button>

                            {/* Profile Dropdown Menu */}
                            <div className={`profile-menu ${profileMenuOpen ? 'open' : ''}`}>
                                <div className="profile-menu-header">
                                    <div className="profile-menu-avatar">
                                        {userProfile?.avatar ? (
                                            <img src={userProfile.avatar} alt="Profile" />
                                        ) : (
                                            <User className="icon-lg" />
                                        )}
                                    </div>
                                    <div className="profile-menu-info">
                                        <p className="profile-menu-name">{userProfile?.name || 'User Name'}</p>
                                        <p className="profile-menu-email">{userProfile?.email || 'user@email.com'}</p>
                                    </div>
                                </div>

                                <div className="profile-menu-divider"></div>

                                <a href="#profile" className="profile-menu-item">
                                    <User className="icon-sm" />
                                    <span>My Profile</span>
                                </a>

                                <a href="#orders" className="profile-menu-item">
                                    <Package className="icon-sm" />
                                    <span>My Orders</span>
                                </a>

                                <a href="#wishlist" className="profile-menu-item">
                                    <Heart className="icon-sm" />
                                    <span>Wishlist</span>
                                </a>

                                <a href="#settings" className="profile-menu-item">
                                    <Settings className="icon-sm" />
                                    <span>Settings</span>
                                </a>

                                <div className="profile-menu-divider"></div>

                                <button onClick={handleLogout} className="profile-menu-item logout">
                                    <LogOut className="icon-sm" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;