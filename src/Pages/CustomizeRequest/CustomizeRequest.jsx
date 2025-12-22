import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import './CustomizeRequest.css'

const CustomizeRequest = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        projectType: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Placeholder – hook this up to your backend later
        setSubmitted(true)
    }

    return (
        <div className="customize-page min-h-screen flex flex-col">
            <header className="customize-header glass-effect header-blend">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-purple-100 hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to landing page
                    </Link>
                    <span className="text-xs text-purple-100/80">
                        Tell us what you want to build – we&apos;ll take it from here.
                    </span>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="customize-form-card w-full max-w-3xl">
                    <h1 className="customize-form-title">
                        Request a Custom Robotics Build
                    </h1>
                    <p className="customize-form-subtitle">
                        Share your idea, budget, and timeline – our team will review and get back to you with
                        options and a quote.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="customize-label">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="customize-input"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="customize-label">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="customize-input"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="projectType" className="customize-label">
                                Project Type
                            </label>
                            <input
                                id="projectType"
                                name="projectType"
                                type="text"
                                value={form.projectType}
                                onChange={handleChange}
                                className="customize-input"
                                placeholder="e.g. Line-following bot for competition, lab prototype, etc."
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="customize-label">
                                What do you need?
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                className="customize-input resize-none"
                                placeholder="Describe your idea, required parts, quantities, budget range, or any constraints…"
                                required
                            />
                        </div>

                        <button type="submit" className="customize-submit-btn">
                            <Send className="w-4 h-4" />
                            Send Request
                        </button>

                        {submitted && (
                            <p className="customize-success-msg">
                                Thanks! Your request has been recorded. We&apos;ll get back to you via email.
                            </p>
                        )}
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CustomizeRequest



