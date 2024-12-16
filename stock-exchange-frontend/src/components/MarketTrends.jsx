import React, { useState, useEffect } from "react";
import api from "../services/api";

const MarketTrends = () => {
  const dummyStocks = [
    { id: 1, companyName: "ABC Corp", price: 120, quantity: "123" },
    { id: 2, companyName: "XYZ Ltd", price: 80, quantity: "45" },
    { id: 3, companyName: "LMN Inc", price: 150, quantity: "56" },
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
    stock.companyName.toLowerCase().includes(search.toLowerCase())
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
            <th className="border px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{stock.id}</td>
              <td className="border px-4 py-2">{stock.companyName}</td>
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
