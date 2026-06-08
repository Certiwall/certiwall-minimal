"use client";

import { useState } from "react";

export default function ValidatePage() {
  const [certificateId, setCertificateId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!certificateId.trim()) return;

    window.location.href = `/verify/${encodeURIComponent(
      certificateId.trim()
    )}`;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h1>Certificate Verification</h1>

        <p>Verify the authenticity of certificates.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              marginBottom: "16px",
            }}
            required
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              cursor: "pointer",
            }}
          >
            Verify Certificate
          </button>
        </form>
      </div>
    </main>
  );
}
