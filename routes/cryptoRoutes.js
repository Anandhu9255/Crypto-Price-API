import axios from "axios";

const API_URL = "https://api.coinstats.app/public/v1";

// Axios instance with required headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "User-Agent": "Mozilla/5.0 (Render Fix)",
    "Accept": "application/json"
  },
});

// Get top 5 prices
export const getPricesService = async () => {
  try {
    const response = await api.get("/coins?limit=5");

    return response.data.coins.map((coin) => ({
      coin: coin.id,
      price: coin.price,
      marketCap: coin.marketCap,
    }));
  } catch (error) {
    console.error("Error fetching prices:", error.message);
    throw new Error("Failed to fetch prices");
  }
};

// Get price by coin ID (e.g., bitcoin)
export const getPriceByCoinService = async (coinId) => {
  try {
    const response = await api.get(`/coins/${coinId}`);

    if (!response.data.coin) {
      throw new Error("Coin not found");
    }

    return {
      coin: response.data.coin.id,
      price: response.data.coin.price,
      marketCap: response.data.coin.marketCap,
    };
  } catch (error) {
    console.error("Error fetching price by coin:", error.message);
    throw new Error("Coin not found");
  }
};

// Get top 10 coins by market cap
export const getTopCoinsService = async () => {
  try {
    const response = await api.get("/coins?limit=10");

    return response.data.coins.map((coin) => ({
      coin: coin.id,
      marketCap: coin.marketCap,
    }));
  } catch (error) {
    console.error("Error fetching top coins:", error.message);
    throw new Error("Failed to fetch top coins");
  }
};
