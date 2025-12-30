import React, { useState } from 'react';
import './Contact.css'
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import axios from 'axios';

const Contact=()=> {
  
  const[firstName,setfirstName]=useState('')
    const nameChange=(event)=>{
        setfirstName(event.target.value)
        console.log(firstName)
    }
    const[lastName,setlastName]=useState('')
    const lastnameChange=(event)=>{
        setlastName(event.target.value)
        console.log(lastName)
    }
    const[email,setEmail]=useState('')
    const emailChange=(event)=>{
        setEmail(event.target.value)
        console.log(email)
    }
    const[phone,setPhone]=useState('')
    const phoneChange=(event)=>{
        setPhone(event.target.value)
        console.log(phone)
    }
    const[message,setMessage]=useState('')
    const messageChange=(event)=>{
        setMessage(event.target.value)
        console.log(message)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
const response= await axios.post('http://localhost:5000/contact/',{
  firstName,
  lastName,
  email,
  phone,
  message

})

    
      
    
    if(response.status===200){
      setlastName('')
      setfirstName('')
      setPhone('')
      setEmail('')
      setMessage('')
      toast.success(" Message Successfully Sent")
    }
  }catch(error){
    toast.error(
      error.response?.data?.message
    )
  }
}

  

  return (
    <div className="contact-page">
      <Toaster/>
      {/* Navigation */}
      <nav className="contact-nav">
        <div className="contact-nav-container">
          <div className="contact-nav-content">
            <div className="contact-nav-logo">
              <span className="contact-brand-name">ROBOTICS</span>
            </div>
            
            <button className="contact-nav-button">
              Back to Home
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">
              Get In Touch
            </h1>
            <p className="contact-hero-description">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="contact-cards-section">
        <div className="contact-container">
          <div className="contact-cards-grid">
            {/* Phone Card */}
            <div className="contact-card">
              <div className="contact-card-icon-wrapper">
                <Phone className="contact-card-icon" />
              </div>
              <h3 className="contact-card-title">Phone & WhatsApp</h3>
              <p className="contact-card-subtitle">Give us a call or message</p>
              <div className="contact-card-info">
                <div className="contact-card-info-item">
                  <Phone className="contact-info-icon" />
                  <p className="contact-info-text">9800000000</p>
                </div>
                <div className="contact-card-info-item">
                  <svg className="contact-whatsapp-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <p className="contact-info-text">9811111111</p>
                </div>
              </div>
            </div>
            
            {/* Email Card */}
            <div className="contact-card">
              <div className="contact-card-icon-wrapper">
                <Mail className="contact-card-icon" />
              </div>
              <h3 className="contact-card-title">Email</h3>
              <p className="contact-card-subtitle">Send us an email</p>
              <p className="contact-info-text">hello@robotics.tech</p>
            </div>
            
            {/* Location Card */}
            <div className="contact-card">
              <div className="contact-card-icon-wrapper">
                <MapPin className="contact-card-icon" />
              </div>
              <h3 className="contact-card-title">Office</h3>
              <p className="contact-card-subtitle">Visit our location</p>
              <p className="contact-info-text">Itahari, Sunsari District</p>
              <p className="contact-info-text">Koshi Province, Nepal</p>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="contact-main-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="contact-form-card">
                <h2 className="contact-form-title">Send Us a Message</h2>
                <p className="contact-form-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
                
                <div className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label className="contact-form-label" htmlFor="firstName">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        value={firstName}
                        onChange={nameChange}
                        className="contact-form-input"
                        placeholder="Enter you first name"
                        required
                      />
                    </div>
                    
                    <div className="contact-form-group">
                      <label className="contact-form-label" htmlFor="lastName">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        value={lastName}
                        onChange={lastnameChange}
                        className="contact-form-input"
                        placeholder="Enter your lastname"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={email}
                      onChange={emailChange}
                      className="contact-form-input"
                      placeholder="example12@gmail.com"
                      required
                    />
                  </div>
                  
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={phone}
                      onChange={phoneChange}
                      className="contact-form-input"
                      placeholder="9800000000"
                    />
                  </div>
                  
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      value={message}
                      onChange={messageChange}
                      className="contact-form-textarea"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>
                  
                  <button 
                    onClick={handleSubmit}
                    className="contact-form-button"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Additional Info & Map */}
            <div className="contact-sidebar">
              {/* About Section */}
              <div className="contact-about-card">
                <h3 className="contact-about-title">Why Choose Us?</h3>
                <p className="contact-about-description">
                  We offer carefully selected, top-quality products that meet customer standards
                </p>
                <ul className="contact-features-list">
                  <li className="contact-feature-item">
                    <CheckCircle2 className="contact-feature-icon" />
                    High-Quality Products
                  </li>
                  <li className="contact-feature-item">
                    <CheckCircle2 className="contact-feature-icon" />
                    Fast & Reliable Delivery
                  </li>
                  <li className="contact-feature-item">
                    <CheckCircle2 className="contact-feature-icon" />
                    Secure Payments
                  </li>
                  <li className="contact-feature-item">
                    <CheckCircle2 className="contact-feature-icon" />
                    Easy Returns & Refunds
                  </li>
                </ul>
              </div>
              
              {/* Map */}
              <div className="contact-map-card">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.5826682501865!2d87.27398179999999!3d26.66184139999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6dbeef951293%3A0x4e7f0710587ab77c!2sDigital%20Pathshala!5e0!3m2!1sen!2snp!4v1763819104542!5m2!1sen!2snp" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy"
                  title="Office Location"
                  className="contact-map-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contact