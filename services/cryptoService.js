import axios from "axios";

const API_URL = "https://api.coinstats.app/public/v1";

export const getPricesService = async () => {
  const response = await axios.get(`${API_URL}/coins?limit=5`);
  const coins = response.data?.coins || [];
  return coins.map((coin) => ({
    coin: coin.id,
    price: coin.price,
    marketCap: coin.marketCap,
  }));
};

export const getPriceByCoinService = async (coinId) => {
  const response = await axios.get(`${API_URL}/coins/${coinId}`);
  const coin = response.data?.coin;
  if (!coin) throw new Error("Coin not found");
  return {
    coin: coin.id,
    price: coin.price,
    marketCap: coin.marketCap,
  };
};

export const getTopCoinsService = async () => {
  const response = await axios.get(`${API_URL}/coins?limit=10`);
  const coins = response.data?.coins || [];
  return coins.map((coin) => ({
    coin: coin.id,
    marketCap: coin.marketCap,
  }));
};
