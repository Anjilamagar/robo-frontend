import React from 'react';
import { Mail, MapPin, Phone, Twitter, Linkedin, Facebook, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="robotics-footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-grid">
                    {/* Branding Section */}
                    <div className="footer-brand">
                        <div className="footer-logo-container">
                            <div className="footer-logo-image">
                                <img
                                    src=" /logo_high_png[1].png"
                                    alt="Robotics Logo"
                                />
                            </div>
                            <span className="footer-logo-text">ROBOTICS</span>
                        </div>
                        <p className="footer-description">
                            Elevating digital experiences with intuitive design and powerful robotics technology.
                        </p>
                        <button className="newsletter-button">
                            Join Our Newsletter
                        </button>
                    </div>

                    {/* Company Links */}
                    <div className="footer-links-column">
                        <h3 className="footer-column-title">Company</h3>
                        <ul className="footer-links-list">
                            <li><a href="#about" className="footer-link">About Us</a></li>
                            <li><a href="#careers" className="footer-link">Careers</a></li>
                            <li><a href="#team" className="footer-link">Our Team</a></li>
                            <li><a href="#press" className="footer-link">Press & Media</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="footer-links-column">
                        <h3 className="footer-column-title">Resources</h3>
                        <ul className="footer-links-list">
                            <li><a href="#docs" className="footer-link">Developer Docs</a></li>
                            <li><a href="#support" className="footer-link">Customer Support</a></li>
                            <li><a href="#faq" className="footer-link">FAQ</a></li>
                            <li><a href="#blog" className="footer-link">Product Blog</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-contact">
                        <h3 className="footer-column-title">Get In Touch</h3>
                        <div className="contact-list">
                            <div className="contact-item">
                                <Mail className="contact-icon" />
                                <a href="mailto:contact@robotics.com" className="contact-link">
                                    contact@robotics.com
                                </a>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span className="contact-text">
                                    123 Tech Drive, Suite 400, Silicon Valley, CA 94000
                                </span>
                            </div>
                            <div className="contact-item">
                                <Phone className="contact-icon" />
                                <a href="tel:+15551234567" className="contact-link">
                                    (555) 123-4567
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <span>&copy; 2025 Robotics, Inc. All rights reserved.</span>
                        <span className="separator">|</span>
                        <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
                        <span className="separator">|</span>
                        <a href="#terms" className="footer-legal-link">Terms of Service</a>
                    </div>

                    <div className="footer-social">
                        <a href="#twitter" className="social-icon" aria-label="Twitter">
                            <Twitter className="icon-social" />
                        </a>
                        <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                            <Linkedin className="icon-social" />
                        </a>
                        <a href="#facebook" className="social-icon" aria-label="Facebook">
                            <Facebook className="icon-social" />
                        </a>
                        <a href="#github" className="social-icon" aria-label="GitHub">
                            <Github className="icon-social" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;