import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const fetchStockData = async (symbols) => {
  const options = {
    method: "GET",
    url: "https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/stock",
    params: {
      symbols: "AAPL, GOOGL, AMZN, META, MSFT, PLTR, PG, TSLA, NVDA, BABA"
    },
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "real-time-quotes1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow error for handling in components
  }
};

export default fetchStockData;
