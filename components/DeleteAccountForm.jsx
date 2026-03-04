"use client";

import { useState } from "react";

export default function DeleteAccountForm() {
    const [contact, setContact] = useState("");
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/delete-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ contact, reason })
            });

            const data = await res.json();
            setMessage(data.message);
            setContact("");
            setReason("");

        } catch (error) {
            setMessage("Something went wrong");
            console.error("Error submitting delete request:", error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={submitForm} className="space-y-5 mt-6">

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email / Contact Number
                </label>

                <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your email or phone number"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Reason (optional)
                </label>

                <textarea
                    rows="4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Tell us why you're leaving"
                />
            </div>

            <button
                disabled={loading}
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 transition text-white font-medium px-6 py-2.5 rounded-lg"
            >
                {loading ? "Processing..." : "Request Account Deletion"}
            </button>

            {message && (
                <p className="text-green-400 text-sm mt-3">{message}</p>
            )}

        </form>
    );
}