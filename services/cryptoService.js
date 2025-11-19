import axios from 'axios';

// CoinGecko API base URL
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Service to get prices for top 5 cryptocurrencies
export const getPricesService = async () => {
  try {
    const coins = ['bitcoin', 'ethereum', 'dogecoin', 'solana', 'bnb'];
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch prices from CoinGecko');
  }
};

// Service to get price for a specific coin
export const getPriceByCoinService = async (coinId) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: 'usd'
      }
    });
    if (!response.data[coinId]) {
      throw new Error('Coin not found');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Service to get top 10 coins by market cap
export const getTopCoinsService = async () => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
      }
    });

    // Format the response to match the example
    return response.data.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      price_usd: coin.current_price
    }));
  } catch (error) {
    console.error('Error fetching top coins:', error);
    throw new Error('Failed to fetch top coins from CoinGecko');
  }
};
