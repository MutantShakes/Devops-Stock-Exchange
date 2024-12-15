import React, { useState, useEffect } from "react";
import { fetchAllStocks } from "../services/api";

const MarketTrends = () => {
  // Dummy data to show initially
  const dummyStocks = [
    { id: 1, name: "ABC Corp", price: 120, quantity: 50 },
    { id: 2, name: "XYZ Ltd", price: 80, quantity: 100 },
    { id: 3, name: "LMN Inc", price: 150, quantity: 75 },
  ];

  const [stocks, setStocks] = useState(dummyStocks);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await fetchAllStocks();
        if (data && data.length > 0) {
          setStocks(data); // Replace dummy data with API data
        }
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      }
    };

    loadStocks();
  }, []);

  // Filter stocks based on the search query
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Market Trends</h1>
      <input
        type="text"
        placeholder="Search stocks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Stock ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price ($)</th>
            <th className="border px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{stock.id}</td>
              <td className="border px-4 py-2">{stock.name}</td>
              <td className="border px-4 py-2">{stock.price}</td>
              <td className="border px-4 py-2">{stock.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTrends;
