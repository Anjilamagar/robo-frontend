import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ContactFetch.css'

const ContactFetch = () => {
  const [contacts, setContacts] = useState([])
  const navigate = useNavigate()

  // Fetch all contacts
  const fetchContact = async () => {
    try {
      const result = await axios.get(
        'http://localhost:5000/contact/getAllContacts'
      )
      setContacts(result.data.result)
    } catch (error) {
      console.error(error)
    }
  }

  // Delete contact by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this message?'
    )

    if (!confirmDelete) return

    try {
      await axios.delete(
        `http://localhost:5000/contact/delete/${id}`
      )

      alert('Message deleted successfully')

      // Refresh list after delete
      fetchContact()
    } catch (error) {
      console.error(error)
      alert('Failed to delete message')
    }
  }

  useEffect(() => {
    fetchContact()
  }, [])

  return (
    <div className="contact-fetch-container">
      <div className="contact-fetch-card">
        <h2 className="contact-fetch-title text-center">Contact Messages</h2>

        <div className="contact-fetch-table-container">
          <table className="contact-fetch-table">
            <thead>
              <tr>
                <th scope="col">
                  Email
                </th>
                <th scope="col">
                  Message
                </th>
                <th scope="col">
                  Status
                </th>
                <th scope="col">
                  View 
                </th>
                <th scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id}>
                    <th scope="row">
                      {contact.email}
                    </th>
                    <td>
                      {contact.message}
                    </td>
                    <td>
                      <span className={contact.read ? 'contact-fetch-status-read' : 'contact-fetch-status-unread'}>
                        {contact.status ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin/contact/contactDetails/${contact._id}`}
                        className="contact-fetch-link"
                      >
                        View
                      </Link>
                      </td>
                      <td>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="contact-fetch-button"
                      >
                        Delete
                      </button>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="contact-fetch-no-data"
                  >
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ContactFetch
