import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Link, Play } from 'lucide-react';
import './Landing.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Navigate, useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate();

    const [currentNotification, setCurrentNotification] = useState(0);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [dockOpen, setDockOpen] = useState(false);

    const popularScrollRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const notifications = [
        "🎉 Special Offer: Get 20% off on all robotics kits! Use code: ROBOT20",
        "🚀 New Arrival: Advanced AI Robot Kit now available!",
        "⚡ Flash Sale: 50% off on selected hardware - Limited time only!",
        "🎁 Free Shipping on orders over $100!",
        "🤖 Join our Robotics Workshop this weekend - Register now!"
    ];

    const categories = [
        { name: 'KITS', icon: 'fa-box', color: 'rgba(108, 64, 197, 0.2)' },
        { name: 'APPAREL', icon: 'fa-tshirt', color: 'rgba(168, 134, 247, 0.2)' },
        { name: 'IT & GEARS', icon: 'fa-laptop', color: 'rgba(108, 64, 197, 0.2)' }
    ];

    const popularProducts = [
        { name: 'AI Robot Kit Pro', price: 'NPR 7,499', icon: 'fa-robot' },
        { name: 'Vision Camera', price: 'NPR 16,249', icon: 'fa-camera' },
        { name: 'AI Robot Kit Pro', price: 'NPR 37,499', icon: 'fa-robot' },
        { name: 'Advanced Controller', price: 'NPR 18,749', icon: 'fa-microchip' },
        { name: 'Motor Set Premium', price: 'NPR 11,249', icon: 'fa-cog' },
        { name: 'Power Pack XL', price: 'NPR 9,999', icon: 'fa-battery-full' },
        { name: 'Wireless Module', price: 'NPR 7,499', icon: 'fa-wifi' },
        { name: 'Vision Camera', price: 'NPR 16,249', icon: 'fa-camera' }
    ];

    const recommendedProducts = [
        {
            name: 'AI Robot Kit Pro',
            price: '$299.99',
            icon: 'fa-robot',
            description: 'Advanced AI-powered robotics kit with machine learning capabilities',
            size: 'large'
        },
        {
            name: 'Advanced Controller',
            price: '$149.99',
            icon: 'fa-microchip',
            description: 'High-performance control system',
            size: 'medium'
        },
        {
            name: 'Motor Set Premium',
            price: '$89.99',
            icon: 'fa-cog',
            size: 'small'
        },
        {
            name: 'Sensor Array',
            price: '$199.99',
            icon: 'fa-sensor',
            size: 'small'
        },
        {
            name: 'Power Pack XL',
            price: '$79.99',
            icon: 'fa-battery-full',
            description: 'Extended battery life',
            size: 'medium'
        }
    ];

    // Notification rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNotification((prev) => (prev + 1) % notifications.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll for popular products
    useEffect(() => {
        const container = popularScrollRef.current;
        if (!container) return;

        const startScroll = () => {
            scrollIntervalRef.current = setInterval(() => {
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 1;
                }
            }, 20);
        };

        const timer = setTimeout(startScroll, 2000);
        return () => {
            clearTimeout(timer);
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }
    };

    const handleMouseLeave = () => {
        const container = popularScrollRef.current;
        if (!container) return;

        scrollIntervalRef.current = setInterval(() => {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += 1;
            }
        }, 20);
    };

    const handleImageSearch = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            console.log('Image selected for search:', file.name);
            // Implement image search logic here
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        navigate("/custom");

        // if (isLoggedIn) {


        // }
        // if(!isLoggedIn){
        //     navigate("/signup")
        // }


    };

    return (
        <div>
            <Header />
            <main>
                <section className="hero-section">
                    <div className="hero-container">
                        <div className="hero-grid">
                            {/* Left Side - Content */}
                            <div className="hero-content">
                                <div className="hero-badge">
                                    <span className="badge-dot"></span>
                                    <span className="badge-text">Next-Gen Robotics</span>
                                </div>

                                <h1 className="hero-title">
                                    Design the Future—
                                    <br />
                                    <span className="hero-title-accent">We Supply the Rest.</span>
                                </h1>

                                <p className="hero-description">
                                    Build smarter bots faster with curated components, AI-ready sensors,
                                    and fabrication support from creators who know the grind.
                                </p>

                                <div className="hero-cta">
                                    <button className="cta-primary">
                                        <span>Explore Products</span>
                                        <ArrowRight className="cta-icon" />
                                    </button>
                                    <button className="cta-secondary">
                                        <Play className="play-icon" />
                                        <span>Watch Demo</span>
                                    </button>
                                </div>

                                {/* Stats or Trust Indicators */}
                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">500+</span>
                                        <span className="stat-label">Components</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat-item">
                                        <span className="stat-number">10k+</span>
                                        <span className="stat-label">Builders</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat-item">
                                        <span className="stat-number">50+</span>
                                        <span className="stat-label">Countries</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Visual */}
                            <div className="hero-visual">
                                <div className="visual-decoration visual-decoration-1"></div>
                                <div className="visual-decoration visual-decoration-2"></div>

                                <div className="hero-image-wrapper">
                                    <div className="image-card">
                                        <img
                                            src="./banner1.jpg"
                                            alt="Advanced Robotics Components"
                                            className="hero-image"
                                        />
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="floating-badge floating-badge-1">
                                        <div className="badge-icon">🤖</div>
                                        <div className="badge-content">
                                            <span className="badge-title">AI-Ready</span>
                                            <span className="badge-subtitle">Smart Sensors</span>
                                        </div>
                                    </div>

                                    <div className="floating-badge floating-badge-2">
                                        <div className="badge-icon">⚡</div>
                                        <div className="badge-content">
                                            <span className="badge-title">Fast Ship</span>
                                            <span className="badge-subtitle">2-Day Delivery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background Decorations */}
                    <div className="hero-bg-decoration hero-bg-decoration-1"></div>
                    <div className="hero-bg-decoration hero-bg-decoration-2"></div>
                    <div className="hero-bg-decoration hero-bg-decoration-3"></div>
                </section>


                {/* Category Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
                        <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                            Shop by Category
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="relative rounded-2xl overflow-hidden border border-gray-700 h-64 group cursor-pointer transition-transform hover:scale-105"
                            >
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ backgroundColor: category.color }}
                                >
                                    <i className={`fas ${category.icon} text-9xl opacity-30 text-purple-400`}></i>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                                    <a href="#" className="text-purple-400 font-semibold hover:text-purple-300">
                                        SHOP NOW →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Products Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
                        <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                            Popular Products
                        </span>
                    </h2>
                    <div className="overflow-hidden">
                        <div
                            ref={popularScrollRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {[...popularProducts, ...popularProducts].map((product, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-64 rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all"
                                    style={{ backgroundColor: 'rgba(108, 64, 197, 0.05)' }}
                                >
                                    <div className="h-40 bg-gradient-to-br from-purple-600/20 to-purple-800/20 flex items-center justify-center">
                                        <i className={`fas ${product.icon} text-5xl text-purple-400`}></i>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg text-purple-300">{product.name}</h3>
                                        <p className="text-sm mt-2 text-gray-300">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recommended for You Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
                        <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                            Recommended for You
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendedProducts.map((product, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all ${product.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                    product.size === 'medium' ? 'md:col-span-1 md:row-span-1' : ''
                                    }`}
                                style={{ backgroundColor: 'rgba(108, 64, 197, 0.05)' }}
                            >
                                <div className={`${product.size === 'large' ? 'h-64' : product.size === 'medium' ? 'h-48' : 'h-40'} bg-gradient-to-br from-purple-600/20 to-purple-800/20 flex items-center justify-center`}>
                                    <i className={`fas ${product.icon} ${product.size === 'large' ? 'text-7xl' : product.size === 'medium' ? 'text-6xl' : 'text-5xl'} text-purple-400`}></i>
                                </div>
                                <div className={product.size === 'large' ? 'p-6' : product.size === 'medium' ? 'p-5' : 'p-4'}>
                                    <h3 className={`font-semibold ${product.size === 'large' ? 'text-2xl' : product.size === 'medium' ? 'text-xl' : 'text-lg'} text-purple-300 mb-2`}>
                                        {product.name}
                                    </h3>
                                    {product.description && (
                                        <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                                    )}
                                    <p className={`${product.size === 'large' ? 'text-xl' : 'text-lg'} font-bold text-purple-400`}>
                                        {product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Customization Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex justify-center">
                    <div className="relative group">
                        <div className="bg-white border-2 border-purple-300 rounded-3xl p-8 md:p-10 shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl cursor-pointer w-full max-w-sm">
                            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                                Need Help?
                            </span>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
                                Can't Find What You Need?
                            </h3>
                            <p className="text-lg md:text-xl text-gray-700 mb-6">
                                Submit a request and our team will assist you promptly.
                            </p>
                            <button onClick={handleSubmit} className="w-full py-3 md:py-4 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out ">
                                Request Here →

                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

        </div>
    )
}

export default LandingPage
