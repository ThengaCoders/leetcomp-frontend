import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./PayoutDashboard.css";

export default function PayoutDashboard() {
  const [filter, setFilter] = useState("Pending");      // Pending | Paid
  const [rows, setRows] = useState([]);                 // fetched payout rows
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);     // single payout
  const [detailsRow, setDetailsRow] = useState(null);   // receipt modal
  const [utrValue, setUtrValue] = useState("");
  const [utrError, setUtrError] = useState("");

  // Fetch payouts when tab changes
  useEffect(() => {
    fetchPayouts();
  }, [filter]);

  const fetchPayouts = async () => {
    try {
      const res = await api.get(`/api/payouts?status=${filter}`);
      setRows(Array.isArray(res.data) ? res.data : []);   // always set array
    } catch (err) {
      console.error("Error fetching payouts:", err);
      setRows([]);
    }
  };

  // Open modal + fetch single payout info
  const handlePayClick = async (row) => {
    try {
      const res = await api.get(`/api/payouts/${row.id}`);
      setActiveRow(res.data);
      setIsModalOpen(true);
      setUtrValue("");
      setUtrError("");
    } catch (err) {
      console.error("Error loading payout:", err);
    }
  };

  const handleOverlayClose = () => {
    setIsModalOpen(false);
    setActiveRow(null);
    setUtrValue("");
    setUtrError("");
  };

  const handleDetailsClose = () => {
    setDetailsRow(null);
  };

  // UTR input validation (numeric only)
  const handleUtrChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 12);
    setUtrValue(digitsOnly);

    if (digitsOnly.length === 12) {
      setUtrError("");
    } else if (digitsOnly.length > 0) {
      setUtrError("Reference ID must be exactly 12 digits.");
    }
  };

  // Mark payout as paid
  const handleMarkAsPaid = async () => {
    if (!activeRow || utrValue.length !== 12) {
      setUtrError("Reference ID must be exactly 12 digits.");
      return;
    }

    try {
      await api.patch(`/api/payouts/${activeRow.id}/mark-paid`, {
        utr: utrValue,
      });

      handleOverlayClose();
      fetchPayouts(); // refresh list
    } catch (err) {
      console.error("Error marking as paid:", err);
      setUtrError("Failed to update payout. Try again.");
    }
  };

  // Show receipt modal
  const handleDetailsClick = async (row) => {
    try {
      const res = await api.get(`/api/payouts/${row.id}`);
      setDetailsRow(res.data);
    } catch (err) {
      console.error("Error fetching payout details:", err);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Payout Dashboard</h1>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {["Pending", "Paid"].map((tab) => (
          <div
            key={tab}
            className={`filter-tab ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="payout-table">
        <div className="payout-header grid-layout">
          <div>Username</div>
          <div>Room Name</div>
          <div>Room ID</div>
          <div>Prize</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {rows.map((row) => (
          <div className="payout-row grid-layout" key={row.id}>
            <div className="payout-col">{row.userName}</div>
            <div className="payout-col">{row.roomName}</div>
            <div className="payout-col">{row.roomId}</div>
            <div className="payout-col">₹{row.amount}</div>

            <div className={`payout-status ${row.status.toLowerCase()}`}>
              {row.status}
            </div>

            {row.status === "Pending" && (
              <button className="pay-btn" onClick={() => handlePayClick(row)}>
                Pay
              </button>
            )}

            {row.status === "Paid" && (
              <button className="details-btn" onClick={() => handleDetailsClick(row)}>
                Check Details
              </button>
            )}
          </div>
        ))}

        {rows.length === 0 && (
          <div className="no-data">No {filter.toLowerCase()} payouts.</div>
        )}
      </div>

      {/* PAY MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClose}>
          <div className="payout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleOverlayClose}>
              ×
            </button>

            <h2 className="modal-title">Complete Payout</h2>

            <div className="qr-box">
              <div className="qr-code-placeholder"></div>
              <p className="qr-label">Scan &amp; Pay Winner</p>
            </div>

            <div className="modal-input-group">
              <label>Enter UPI Transaction Reference ID</label>
              <input
                type="text"
                className="utr-input"
                placeholder="Enter 12-digit UTR"
                value={utrValue}
                onChange={handleUtrChange}
                maxLength={12}
              />
              {utrError && <span className="utr-error">{utrError}</span>}
            </div>

            <button
              className="confirm-btn"
              onClick={handleMarkAsPaid}
              disabled={utrValue.length !== 12}
            >
              Mark as Paid
            </button>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {detailsRow && (
        <div className="modal-overlay" onClick={handleDetailsClose}>
          <div className="payout-modal details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleDetailsClose}>
              ×
            </button>

            <h2 className="modal-title">Payout Receipt</h2>
            <p className="details-subtitle">Payment has been captured successfully.</p>

            <div className="details-card">
              <div>
                <span className="details-label">Winner</span>
                <p className="details-value">{detailsRow.userName}</p>
              </div>
              <div>
                <span className="details-label">Room</span>
                <p className="details-value">{detailsRow.roomName}</p>
              </div>
              <div>
                <span className="details-label">Room ID</span>
                <p className="details-value">{detailsRow.roomId}</p>
              </div>
              <div>
                <span className="details-label">Prize Pool</span>
                <p className="details-value">₹{detailsRow.amount}</p>
              </div>
              <div>
                <span className="details-label">Reference ID</span>
                <p className="details-value details-utr">{detailsRow.utr}</p>
              </div>
              <div>
                <span className="details-label">Status</span>
                <p className="details-value status-paid">Paid</p>
              </div>
            </div>

            <button className="confirm-btn" onClick={handleDetailsClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
