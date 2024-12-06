const API_BASE_URL = "http://localhost:8080/api"; // Update this URL to your backend endpoint.

const api = {
  // Fetch market trends
  fetchMarketTrends: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/market-trends`);
      if (!response.ok) throw new Error("Failed to fetch market trends.");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // Fetch stock analysis data
  fetchStockAnalysis: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stock-analysis`);
      if (!response.ok) throw new Error("Failed to fetch stock analysis.");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // Register a stock
  registerStock: async (stockData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stocks/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockData),
      });
      if (!response.ok) throw new Error("Failed to register stock.");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // Fetch transaction history
  fetchTransactions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) throw new Error("Failed to fetch transactions.");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // Register a user
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to register user.");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
};

export default api;
