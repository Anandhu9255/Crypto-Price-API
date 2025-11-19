## API Endpoints

### Base URL
```
http://localhost:3000/api
```
### 1. GET /api/prices
**Description:** Returns current prices for the top 5 cryptocurrencies (Bitcoin, Ethereum, Dogecoin, Solana, BNB).

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/api/prices`

**Expected Response (200 OK):**
```json
{
  "bitcoin": {
    "usd": 101853
  },
  "ethereum": {
    "usd": 3397.42
  },
  "dogecoin": {
    "usd": 0.173483
  },
  "solana": {
    "usd": 157.61
  },
  "bnb": {
    "usd": 987.01
  }
}
```

**Testing Steps:**
1. Create a new GET request
2. Enter the URL
3. Click "Send"
4. Verify the response contains all 5 cryptocurrencies with USD prices

---

### 2. GET /api/prices/:coin
**Description:** Returns the current price for a specific cryptocurrency by its CoinGecko ID.

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/api/prices/{coin_id}`

**Path Parameters:**
- `coin_id`: The CoinGecko ID of the cryptocurrency (e.g., "bitcoin", "ethereum")

**Example Request:**
- URL: `http://localhost:3000/api/prices/bitcoin`

**Expected Response (200 OK):**
```json
{
  "bitcoin": {
    "usd": 101853
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Coin not found"
}
```

**Testing Steps:**
1. Test with valid coin IDs: "bitcoin", "ethereum", "dogecoin", "solana", "bnb"
2. Test with invalid coin ID: "invalidcoin" (should return 404)
3. Verify the response structure matches the example

---

### 3. GET /api/top
**Description:** Returns the top 10 cryptocurrencies by market capitalization.

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/api/top`

**Expected Response (200 OK):**
```json
[
  {
    "name": "Bitcoin",
    "symbol": "btc",
    "price_usd": 101853
  },
  {
    "name": "Ethereum",
    "symbol": "eth",
    "price_usd": 3397.42
  },
  {
    "name": "Tether",
    "symbol": "usdt",
    "price_usd": 0.999824
  },
  // ... and 7 more entries
]
