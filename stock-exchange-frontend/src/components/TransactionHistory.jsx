import React, { useState, useEffect } from "react";
import api from "../services/api";

const TransactionHistory = () => {
  const dummyTransactions = [
    {
      id: 1,
      stockName: "ABC Corp",
      type: "BUY",
      quantity: 10,
      price: 120,
      date: "2024-06-01",
    },
    {
      id: 2,
      stockName: "XYZ Ltd",
      type: "SELL",
      quantity: 5,
      price: 80,
      date: "2024-06-02",
    },
    {
      id: 3,
      stockName: "LMN Inc",
      type: "BUY",
      quantity: 20,
      price: 150,
      date: "2024-06-03",
    },
  ];

  const [transactions, setTransactions] = useState(dummyTransactions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const data = await api.fetchTransactions();
        if (data && data.length > 0) {
          setTransactions(data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {loading && <p>Loading transactions...</p>}

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Transaction ID</th>
            <th className="border px-4 py-2">Stock Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price ($)</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{transaction.id}</td>
              <td className="border px-4 py-2">{transaction.stockName}</td>
              <td
                className={`border px-4 py-2 font-semibold ${
                  transaction.type === "BUY"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type}
              </td>
              <td className="border px-4 py-2">{transaction.quantity}</td>
              <td className="border px-4 py-2">{transaction.price}</td>
              <td className="border px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
