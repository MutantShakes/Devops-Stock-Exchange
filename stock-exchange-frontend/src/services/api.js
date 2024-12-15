
const API_BASE_URL = "http://backend-service:8080/api"; // Update this URL if the backend endpoint changes.


// Helper for timeout
const timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timed out")), ms);
    promise
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

const api = {
  // Fetch market trends
  // fetchMarketTrends: async () => {
  //   try {
  //     const response = await timeout(5000, fetch(`${API_BASE_URL}/market-trends`));
  //     if (!response.ok) throw new Error("Failed to fetch market trends.");
  //     return await response.json();
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },

  // // Fetch stock analysis data
  // fetchStockAnalysis: async () => {
  //   try {
  //     const response = await timeout(5000, fetch(`${API_BASE_URL}/stock-analysis`));
  //     if (!response.ok) throw new Error("Failed to fetch stock analysis.");
  //     return await response.json();
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },

  // Register a stock
  registerStock: async (stockData) => {
    try {
      const response = await timeout(
        5000,
        fetch(`${API_BASE_URL}/stocks/register`, { //change
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stockData),
        })
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

   // Fetch all stocks
   fetchAllStocks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stocks`);
      if (!response.ok) throw new Error("Failed to fetch stocks.");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error to handle in component
    }
  },

  // // Fetch transaction history
  // fetchTransactions: async () => {
  //   try {
  //     const response = await timeout(5000, fetch(`${API_BASE_URL}/transactions`));
  //     if (!response.ok) throw new Error("Failed to fetch transactions.");
  //     return await response.json();
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },

  // // Register a user
  // registerUser: async (userData) => {
  //   try {
  //     const response = await timeout(
  //       5000,
  //       fetch(`${API_BASE_URL}/users/register`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(userData),
  //       })
  //     );
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to register user.");
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },
};

export default api;
