import axios from "axios";

const API_URL = "https://api.coinstats.app/public/v1";

// Get top 5 prices
export const getPricesService = async () => {
  const response = await axios.get(`${API_URL}/coins?limit=5`);
  
  return response.data.coins.map((coin) => ({
    coin: coin.id,
    price: coin.price,
    marketCap: coin.marketCap,
  }));
};

// Get price by coin ID
export const getPriceByCoinService = async (coinId) => {
  const response = await axios.get(`${API_URL}/coins/${coinId}`);

  if (!response.data.coin) {
    throw new Error("Coin not found");
  }

  return {
    coin: response.data.coin.id,
    price: response.data.coin.price,
    marketCap: response.data.coin.marketCap,
  };
};

// Get top 10 coins by market cap
export const getTopCoinsService = async () => {
  const response = await axios.get(`${API_URL}/coins?limit=10`);

  return response.data.coins.map((coin) => ({
    coin: coin.id,
    marketCap: coin.marketCap,
  }));
};
