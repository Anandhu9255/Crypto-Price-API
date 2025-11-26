import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const getPricesService = async () => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 5,
      page: 1,
      sparkline: false,
    },
  });

  return response.data.map((coin) => ({
    coin: coin.id,
    price: coin.current_price,
    marketCap: coin.market_cap,
  }));
};

export const getPriceByCoinService = async (coinId) => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      ids: coinId,
    },
  });

  if (!response.data.length) throw new Error("Coin not found");

  const c = response.data[0];

  return {
    coin: c.id,
    price: c.current_price,
    marketCap: c.market_cap,
  };
};

export const getTopCoinsService = async () => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });

  return response.data.map((coin) => ({
    coin: coin.id,
    marketCap: coin.market_cap,
  }));
};
