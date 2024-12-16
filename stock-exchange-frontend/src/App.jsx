import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MarketTrends from "./components/MarketTrends";
import StockAnalysis from "./components/StockAnalysis";
import StockRegister from "./components/StockRegister";
import TransactionHistory from "./components/TransactionHistory";
import UserRegister from "./components/UserRegister";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<MarketTrends />} />
          <Route path="/analysis" element={<StockAnalysis />} />
          <Route path="/register-stock" element={<StockRegister />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/register-user" element={<UserRegister />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
