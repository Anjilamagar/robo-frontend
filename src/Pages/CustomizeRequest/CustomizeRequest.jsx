import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Check, X, Upload, Trash2, Image as ImageIcon } from 'lucide-react'
import './CustomizeRequest.css'

const CustomizeRequest = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        projectType: '',
        message: '',
        quantity: '',
        scope: 'Educational',
        inspirationImages: []
    })

    const [guidelines, setGuidelines] = useState({
        canDo: [],
        cannotDo: []
    })

    const [status, setStatus] = useState({ loading: false, error: null })
    const [submitted, setSubmitted] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [uploadingImages, setUploadingImages] = useState(false)
    const [previewImages, setPreviewImages] = useState([])

    // Fetch guidelines from backend on component mount
    useEffect(() => {
        fetchGuidelines()
    }, [])

    const fetchGuidelines = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/guidelines')
            const data = await response.json()
            if (response.ok) {
                setGuidelines(data)
            }
        } catch (err) {
            console.error('Error fetching guidelines:', err)
            // Set default guidelines if backend fails
            setGuidelines({
                canDo: [
                    { id: 1, text: 'Robotics Kits', color: 'purple' },
                    { id: 2, text: 'Hardware & Software', color: 'blue' },
                    { id: 3, text: 'Tools & Components', color: 'pink' }
                ],
                cannotDo: [
                    { id: 1, text: 'Clothing' },
                    { id: 2, text: 'Perishables' },
                    { id: 3, text: 'Custom Jewelry' }
                ]
            })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files)
        if (files.length === 0) return

        setUploadingImages(true)
        const formData = new FormData()

        files.forEach(file => {
            formData.append('images', file)
        })

        try {
            const response = await fetch('http://localhost:5000/api/upload-images', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                // Add uploaded image URLs to form
                setForm(prev => ({
                    ...prev,
                    inspirationImages: [...prev.inspirationImages, ...data.imageUrls]
                }))

                // Create preview URLs
                const newPreviews = files.map(file => URL.createObjectURL(file))
                setPreviewImages(prev => [...prev, ...newPreviews])
            }
        } catch (err) {
            console.error('Error uploading images:', err)
            setStatus({ loading: false, error: 'Failed to upload images' })
        } finally {
            setUploadingImages(false)
        }
    }

    const removeImage = (index) => {
        setForm(prev => ({
            ...prev,
            inspirationImages: prev.inspirationImages.filter((_, i) => i !== index)
        }))
        setPreviewImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!confirmed) {
            setStatus({ loading: false, error: 'Please confirm your request is within scope' })
            return
        }

        setStatus({ loading: true, error: null })

        try {
            const response = await fetch('http://localhost:5000/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    submittedAt: new Date().toISOString()
                }),
            })

            const data = await response.json()

            if (response.status === 401) {
                navigate('/login')
                return
            }

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            setSubmitted(true)
            setForm({
                projectType: '',
                message: '',
                quantity: '',
                scope: 'Educational',
                inspirationImages: []
            })
            setPreviewImages([])
            setConfirmed(false)

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                setSubmitted(false)
            }, 5000)
        } catch (err) {
            setStatus({ loading: false, error: err.message })
        } finally {
            setStatus((prev) => ({ ...prev, loading: false }))
        }
    }

    return (
        <div className="customize-page-new">
            <header className="header-new">
                <Link to="/" className="back-link">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Landing Page</span>
                </Link>
            </header>

            <div className="main-container">
                {/* Left Panel */}
                <div className="left-panel">
                    <div className="help-badge">Need Help?</div>
                    <div className="help-card">
                        <h1 className="help-title">
                            Can't Find What You Need?
                        </h1>
                        <p className="help-subtitle">
                            Submit a request and our team will assist you promptly.
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    {/* Guidelines Section */}
                    <div className="guidelines-section">
                        <h3 className="section-title">Guidelines</h3>
                        <div className="guidelines-cards">
                            <div className="guideline-card can-do">
                                <div className="card-header">
                                    <Check className="icon" />
                                    <span>We specialise in...</span>
                                </div>
                                <ul className="card-list">
                                    {guidelines.canDo.map((item) => (
                                        <li key={item.id}>
                                            <span className={`dot ${item.color || 'purple'}`}></span>
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="guideline-card cannot-do">
                                <div className="card-header">
                                    <X className="icon" />
                                    <span>We can't source...</span>
                                </div>
                                <ul className="card-list">
                                    {guidelines.cannotDo.map((item) => (
                                        <li key={item.id}>{item.text}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Creative Brief Section */}
                    <div className="creative-brief-section">
                        <h3 className="section-title">Creative Brief</h3>

                        <div className="brief-card">
                            <div className="vision-header">
                                <span>Your Vision</span>
                            </div>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="vision-textarea"
                                placeholder="Describe your robotics project in detail. What are you building? What's the purpose? Any specific requirements or constraints?"
                                rows={5}
                                required
                            />
                        </div>

                        {/* Contact Information Removed - Using Logged In User Details */}

                        {/* Project Type */}
                        <div className="input-group">
                            <label htmlFor="projectType" className="input-label">Project Type</label>
                            <input
                                id="projectType"
                                name="projectType"
                                type="text"
                                value={form.projectType}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g. Line-following bot, AI robot, Educational kit"
                            />
                        </div>

                        {/* Inspiration Upload */}
                        <div className="inspiration-section">
                            <h3 className="section-title-small">Inspiration</h3>
                            <div className="upload-area">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
                                <label htmlFor="image-upload" className="upload-card">
                                    {uploadingImages ? (
                                        <>
                                            <div className="spinner"></div>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="upload-icon" />
                                            <span>Upload Images</span>
                                        </>
                                    )}
                                </label>
                            </div>

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                                <div className="image-previews">
                                    {previewImages.map((preview, index) => (
                                        <div key={index} className="image-preview">
                                            <img src={preview} alt={`Preview ${index + 1}`} />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="remove-image-btn"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quantity Input */}
                        <div className="quantity-section">
                            <label htmlFor="quantity" className="input-label">
                                Quantity Needed <span className="optional">(Optional)</span>
                            </label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="1"
                                value={form.quantity}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="How many units do you need?"
                            />
                        </div>

                        {/* Scope Dropdown */}
                        <div className="scope-section">
                            <label htmlFor="scope" className="input-label">Project Scope</label>
                            <select
                                id="scope"
                                name="scope"
                                value={form.scope}
                                onChange={handleChange}
                                className="scope-select"
                            >
                                <option value="Educational">#Educational</option>
                                <option value="Research">#Research</option>
                                <option value="Commercial">#Commercial</option>
                                <option value="Hobby">#Hobby</option>
                                <option value="Industrial">#Industrial</option>
                            </select>
                        </div>

                        {/* Confirmation Toggle */}
                        <div className="confirmation-section">
                            <span className="confirmation-text">
                                I confirm that my product request is valid and within platform guidelines.
                            </span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={confirmed}
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        {/* Error Message */}
                        {status.error && (
                            <div className="error-message">
                                {status.error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            className="submit-button"
                            disabled={status.loading || !confirmed}
                        >
                            <Send className="w-5 h-5" />
                            {status.loading ? 'Submitting...' : 'Submit Request'}
                        </button>

                        {/* Success Message */}
                        {submitted && (
                            <div className="success-message">
                                <Check className="success-icon" />
                                <div>
                                    <strong>Request Submitted Successfully!</strong>
                                    <p>We'll get back to you via email shortly.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomizeRequest