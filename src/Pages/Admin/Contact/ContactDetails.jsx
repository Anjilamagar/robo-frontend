// import React from 'react'

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import "./ContactDetails.css"
import "./ContactDetails.css";



const ContactDetails = () => {
    const params=useParams()
    const {id}=params
   const[contacts,setContacts]=useState({})
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

const fetchContact=async()=>{
  try {
    setLoading(true)
    const result=await axios.get(`http://localhost:5000/contact/getById/${id}`)
    setContacts(result.data.result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
useEffect(()=>{
  fetchContact()
},[])

if (loading) return <div className="contact-details-container"><p>Loading...</p></div>
if (error) return <div className="contact-details-container"><p>Error: {error}</p></div>

  return (
    <div className="contact-details-container">
      <div className="contact-details-card">
          <h2 className="contact-details-title">Message Details</h2>

          <div className="contact-details-fields">
              <div className="contact-details-field">
                  <h3 className="contact-details-label">From</h3>
                  <p className="contact-details-value">{(contacts.firstName || '') + ' ' + (contacts.lastName || '')}</p>
              </div>

              <div className="contact-details-field">
                  <h3 className="contact-details-label">Email</h3>
                  <p className="contact-details-value">{contacts.email || 'N/A'}</p>
              </div>

              <div className="contact-details-field">
                  <h3 className="contact-details-label">Message</h3>
                  <p className="contact-details-value contact-details-message">
                      {contacts.message || 'No message'}
                  </p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ContactDetails