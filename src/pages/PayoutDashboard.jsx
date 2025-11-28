import React, { useState } from "react";
import "./PayoutDashboard.css";

const sampleData = [
  {
    id: 1,
    username: "Akshay",
    roomId: "RM2345",
    roomName: "Mega Spin",
    prize: 500,
    status: "Pending",
    utr: null,
  },
  {
    id: 2,
    username: "Manu",
    roomId: "RM9876",
    roomName: "Daily Quiz",
    prize: 250,
    status: "Paid",
    utr: "924613579204",
  },
  {
    id: 3,
    username: "Dev",
    roomId: "RM4567",
    roomName: "Treasure Hunt",
    prize: 800,
    status: "Pending",
    utr: null,
  },
  {
    id: 4,
    username: "Pranav",
    roomId: "RM676",
    roomName: "Mandi Kada",
    prize: 400,
    status: "Paid",
    utr: "135792468013",
  },
];

export default function PayoutDashboard() {
  const [filter, setFilter] = useState("Pending");
  const [rows, setRows] = useState(sampleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [detailsRow, setDetailsRow] = useState(null);
  const [utrValue, setUtrValue] = useState("");
  const [utrError, setUtrError] = useState("");

  const filteredRows = rows.filter((row) => row.status === filter);

  const handlePayClick = (row) => {
    setActiveRow(row);
    setIsModalOpen(true);
    setUtrValue("");
    setUtrError("");
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

  const handleUtrChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 12);
    setUtrValue(digitsOnly);

    if (digitsOnly.length === 12) {
      setUtrError("");
    } else if (digitsOnly.length > 0) {
      setUtrError("Reference ID must be exactly 12 digits.");
    } else {
      setUtrError("");
    }
  };

  const handleMarkAsPaid = () => {
    if (!activeRow || utrValue.length !== 12) {
      setUtrError("Reference ID must be exactly 12 digits.");
      return;
    }

    setRows((prev) =>
      prev.map((row) =>
        row.id === activeRow.id ? { ...row, status: "Paid", utr: utrValue } : row
      )
    );

    handleOverlayClose();
  };

  const handleDetailsClick = (row) => {
    setDetailsRow(row);
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
        {/* Header */}
        <div className="payout-header grid-layout">
          <div>Username</div>
          <div>Room Name</div>
          <div>Room ID</div>
          <div>Prize</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        {filteredRows.map((row) => (
          <div className="payout-row grid-layout" key={row.id}>
            <div className="payout-col">{row.username}</div>
            <div className="payout-col">{row.roomName}</div>
            <div className="payout-col">{row.roomId}</div>
            <div className="payout-col">₹{row.prize}</div>

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

        {/* Empty State */}
        {filteredRows.length === 0 && (
          <div className="no-data">No {filter.toLowerCase()} payouts.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClose}>
          <div className="payout-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={handleOverlayClose}>
              ×
            </button>

            <h2 className="modal-title">Complete Payout</h2>

            <div className="qr-box">
              <div className="qr-code-placeholder" />
              <p className="qr-label">Scan &amp; Pay Winner</p>
            </div>

            <div className="modal-input-group">
              <label htmlFor="utr-input">Enter UPI Transaction Reference ID</label>
              <input
                id="utr-input"
                className="utr-input"
                type="text"
                placeholder="Enter 12-digit UTR"
                value={utrValue}
                onChange={handleUtrChange}
                inputMode="numeric"
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

      {detailsRow && (
        <div className="modal-overlay" onClick={handleDetailsClose}>
          <div className="payout-modal details-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={handleDetailsClose}>
              ×
            </button>
            <h2 className="modal-title">Payout Receipt</h2>
            <p className="details-subtitle">Payment has been captured successfully.</p>

            <div className="details-card">
              <div>
                <span className="details-label">Winner</span>
                <p className="details-value">{detailsRow.username}</p>
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
                <p className="details-value">₹{detailsRow.prize}</p>
              </div>
              <div>
                <span className="details-label">Reference ID</span>
                <p className="details-value details-utr">{detailsRow.utr || "Not Available"}</p>
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
