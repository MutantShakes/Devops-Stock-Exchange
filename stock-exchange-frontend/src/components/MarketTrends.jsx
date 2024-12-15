import React, { useState, useEffect } from "react";
import api from "../services/api";

const MarketTrends = () => {
  const dummyStocks = [
    { id: 1, name: "ABC Corp", price: 120, change: "+1.2%" },
    { id: 2, name: "XYZ Ltd", price: 80, change: "-0.8%" },
    { id: 3, name: "LMN Inc", price: 150, change: "+2.0%" },
  ];

  const [stocks, setStocks] = useState(dummyStocks);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadMarketTrends = async () => {
      try {
        const data = await api.fetchAllStocks();
        if (data && data.length > 0) {
          setStocks(data);
        }
      } catch (error) {
        console.error("Error fetching market trends:", error);
      }
    };

    loadMarketTrends();
  }, []);

  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Market Trends</h1>

      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Stock ID</th>
            <th className="border px-4 py-2">Stock Name</th>
            <th className="border px-4 py-2">Price ($)</th>
            <th className="border px-4 py-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{stock.id}</td>
              <td className="border px-4 py-2">{stock.name}</td>
              <td className="border px-4 py-2">{stock.price}</td>
              <td className="border px-4 py-2">{stock.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTrends;
