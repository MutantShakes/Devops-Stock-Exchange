import React, { useState, useEffect } from "react";
import api from "../services/api";

const MarketTrends = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch stock data on component mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await api.fetchAllStocks(); // Fetch stocks from API
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Filter stocks based on the search term
  const filteredStocks = stocks.filter((stock) =>
    stock.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Market Trends</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search stocks by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">Loading stocks...</div>
      ) : filteredStocks.length > 0 ? (
        // Table to display stock data
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Company Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr key={stock.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {stock.company_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {stock.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {stock.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No stocks found.</div>
      )}
    </div>
  );
};

export default MarketTrends;
