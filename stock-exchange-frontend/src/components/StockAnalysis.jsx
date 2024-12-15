import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import api from "../services/api";

const StockAnalysis = () => {
  const [data, setData] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState("price"); // Default graph: Price Trend

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        { date: "2024-06-01", price: 120, buys: 30, sells: 20 },
        { date: "2024-06-02", price: 125, buys: 40, sells: 25 },
        { date: "2024-06-03", price: 130, buys: 45, sells: 30 },
        { date: "2024-06-04", price: 128, buys: 35, sells: 40 },
        { date: "2024-06-05", price: 135, buys: 50, sells: 45 },
      ];

      try {
        // Fetch the analysis data
        const analysisData = await api.fetchStockAnalysis();
        setData(analysisData);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        setData(dummyData); // Fallback to dummy data if API fails
      }
    };

    fetchData();
  }, []);


  // Graph data preparation
  const dates = data.map((item) => item.date);
  const prices = data.map((item) => item.price);
  const buys = data.map((item) => item.buys);
  const sells = data.map((item) => item.sells);

  const priceTrendData = {
    labels: dates,
    datasets: [
      {
        label: "Stock Price ($)",
        data: prices,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const buySellBarData = {
    labels: dates,
    datasets: [
      {
        label: "Buys",
        data: buys,
        backgroundColor: "green",
      },
      {
        label: "Sells",
        data: sells,
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stock Analysis</h1>

      {/* Buttons to toggle between graphs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedGraph("price")}
          className={`px-4 py-2 border ${
            selectedGraph === "price" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          View Price Trends
        </button>
        <button
          onClick={() => setSelectedGraph("buySell")}
          className={`px-4 py-2 border ${
            selectedGraph === "buySell" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          View Buys/Sells
        </button>
      </div>

      {/* Render Graph Based on Selected Option */}
      <div>
        {selectedGraph === "price" ? (
          <Line data={priceTrendData} options={{ responsive: true }} />
        ) : selectedGraph === "buySell" ? (
          <Bar data={buySellBarData} options={{ responsive: true }} />
        ) : (
          <p>No data to display</p>
        )}
      </div>
    </div>
  );
};

export default StockAnalysis;
