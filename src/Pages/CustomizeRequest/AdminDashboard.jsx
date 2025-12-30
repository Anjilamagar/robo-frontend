import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    ArrowLeft,
    Eye,
    Trash2,
    RefreshCw,
    CheckCircle,
    Clock,
    XCircle
} from "lucide-react"
import "./AdminDashboard.css"

const AdminDashboard = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [statusFilter, setStatusFilter] = useState("all")

    useEffect(() => {
        fetchRequests()
    }, [])

    const fetchRequests = async () => {
        try {
            setLoading(true)
            const res = await fetch("http://localhost:5000/api/admin/requests")
            const data = await res.json()
            setRequests(data.requests || [])
        } catch (err) {
            console.error("Failed to fetch requests", err)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id, status) => {
        if (!window.confirm(`Change status to "${status}"?`)) return

        try {
            await fetch(`http://localhost:5000/api/admin/requests/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            fetchRequests()

            if (selectedRequest?._id === id) {
                setSelectedRequest({ ...selectedRequest, status })
            }
        } catch (err) {
            console.error("Failed to update status", err)
        }
    }

    const deleteRequest = async (id) => {
        if (!window.confirm("Delete this request permanently?")) return

        try {
            await fetch(`http://localhost:5000/api/admin/requests/${id}`, {
                method: "DELETE",
            })

            fetchRequests()
            setSelectedRequest(null)
        } catch (err) {
            console.error("Failed to delete request", err)
        }
    }

    const filteredRequests =
        statusFilter === "all"
            ? requests
            : requests.filter((r) => r.status === statusFilter)

    const statusIcon = (status) => {
        if (status === "approved") return <CheckCircle className="approved" />
        if (status === "rejected") return <XCircle className="rejected" />
        return <Clock className="pending" />
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <Link to="/" className="back-link">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <h1>Admin Dashboard</h1>

                <button onClick={fetchRequests} className="refresh-btn">
                    <RefreshCw size={16} /> Refresh
                </button>
            </header>

            <div className="admin-layout">
                {/* SIDEBAR */}
                <aside className="admin-sidebar">
                    <div className="stat-card">
                        <h4>Total</h4>
                        <p>{requests.length}</p>
                    </div>

                    <div className="stat-card pending">
                        <h4>Pending</h4>
                        <p>{requests.filter(r => r.status === "pending").length}</p>
                    </div>

                    <div className="stat-card approved">
                        <h4>Approved</h4>
                        <p>{requests.filter(r => r.status === "approved").length}</p>
                    </div>

                    <div className="filter-box">
                        <label>Status Filter</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="admin-main">
                    {loading ? (
                        <p className="loading">Loading requests…</p>
                    ) : filteredRequests.length === 0 ? (
                        <p className="empty">No requests found.</p>
                    ) : (
                        <div className="request-grid">
                            {filteredRequests.map((req) => (
                                <div key={req._id} className="request-card">
                                    <div className="card-header">
                                        <span className="status">
                                            {statusIcon(req.status)}
                                            {req.status}
                                        </span>
                                    </div>

                                    <p className="project">
                                        {req.projectType || "No project type"}
                                    </p>

                                    <p className="message">
                                        {req.message.length > 120
                                            ? req.message.slice(0, 120) + "…"
                                            : req.message}
                                    </p>

                                    <p><strong>Scope:</strong> {req.scope}</p>

                                    {req.quantity && (
                                        <p><strong>Quantity:</strong> {req.quantity}</p>
                                    )}

                                    {req.inspirationImages?.length > 0 && (
                                        <p><strong>Images:</strong> {req.inspirationImages.length}</p>
                                    )}

                                    <div className="card-footer">
                                        <small>
                                            {new Date(req.createdAt).toLocaleString()}
                                        </small>

                                        <div className="actions">
                                            <button onClick={() => setSelectedRequest(req)}>
                                                <Eye size={16} />
                                            </button>
                                            <button onClick={() => deleteRequest(req._id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* MODAL */}
            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Request Details</h2>

                        <p><strong>Project Type:</strong> {selectedRequest.projectType}</p>
                        <p><strong>Message:</strong> {selectedRequest.message}</p>
                        <p><strong>Scope:</strong> {selectedRequest.scope}</p>
                        <p><strong>Quantity:</strong> {selectedRequest.quantity || "—"}</p>

                        {selectedRequest.inspirationImages?.length > 0 && (
                            <div className="modal-images">
                                {selectedRequest.inspirationImages.map((img, i) => (
                                    <img key={i} src={img} alt="inspiration" />
                                ))}
                            </div>
                        )}

                        <div className="status-actions">
                            <button onClick={() => updateStatus(selectedRequest._id, "pending")}>
                                Pending
                            </button>
                            <button onClick={() => updateStatus(selectedRequest._id, "approved")}>
                                Approved
                            </button>
                            <button onClick={() => updateStatus(selectedRequest._id, "rejected")}>
                                Rejected
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard
