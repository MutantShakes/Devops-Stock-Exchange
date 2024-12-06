import React, { useEffect, useState } from "react";
import api from "../services/api";

const MarketTrends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const data = await api.fetchMarketTrends();
      setTrends(data || []);
    };
    fetchTrends();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Market Trends</h1>
      {trends.length > 0 ? (
        <ul className="list-disc list-inside bg-white p-4 shadow rounded">
          {trends.map((trend, index) => (
            <li key={index} className="text-gray-700">
              {trend.name}: {trend.value}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No trends available.</p>
      )}
    </div>
  );
};

export default MarketTrends;
