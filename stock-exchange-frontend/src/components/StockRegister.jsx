import React, { useState } from "react";
import api from "../services/api";

const StockRegister = () => {
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [message, setMessage] = useState(null); // For success/error messages
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false); // For showing the loading bar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(null); // Reset messages
    setMessageType("");

    const stockData = {
      company_name: stockName,
      price: stockPrice,
      quantity: stockQuantity,
    };

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 5000) // Timeout after 5 seconds
    );

    try {
      const response = await Promise.race([
        api.registerStock(stockData),
        timeout,
      ]);

      if (response) {
        setMessage("Stock registered successfully!");
        setMessageType("success");

        // Clear form fields
        setStockName("");
        setStockPrice("");
        setStockQuantity("");
      }
    } catch (error) {
      setMessage(
        error.message || "An error occurred!"
      );
      setMessageType("error");
    } finally {
      setLoading(false); // Stop loading
    }

    // Clear the message after 5 seconds
    const timer = setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, 5000);

    // Clean up timer on component unmount
    return () => clearTimeout(timer);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Register a Stock</h1>

      {/* Display success or error message */}
      {message && (
        <div
          className={`flex items-center mb-4 p-4 rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span className="mr-2">
            {messageType === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
          <span>{message}</span>
        </div>
      )}

      {/* Show loading bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock Name
          </label>
          <input
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            placeholder="Enter stock name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock Price
          </label>
          <input
            type="number"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
            placeholder="Enter stock price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="Enter stock quantity"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default StockRegister;
