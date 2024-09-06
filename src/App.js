import React, { useState, useEffect } from "react";
import StockList from "./components/StockList";
import MyStockList from "./components/MyStockList";
import StockForm from "./components/StockForm";
import CashBalance from "./components/CashBalance";
import fetchStockData from "./services/stockApiService";
import "./App.css";

function App() {
  // localStorage.clear();        // Clear all local storage if required for testing

  const [cashBalance, setCashBalance] = useState(() => {
    const savedCashBalance = localStorage.getItem("cashBalance");
    return savedCashBalance ? JSON.parse(savedCashBalance) : 0;
  });

  const [stocks, setStocks] = useState(() => {
    const savedStocks = localStorage.getItem("stocks");
    return savedStocks ? JSON.parse(savedStocks) : [];
  });

  const [myStocks, setMyStocks] = useState(() => {
    const savedMyStocks = localStorage.getItem("myStocks");
    return savedMyStocks ? JSON.parse(savedMyStocks) : [];
  });

  const fetchInitialStockData = async () => {
    try {
      console.log("Data fetched from API..."); // Limiting request due to only 100 requests/month in free tier - Test in console if data is feteched from API 
      const fetchedStocks = await fetchStockData();
      setStocks(fetchedStocks);
      localStorage.setItem("stocks", JSON.stringify(fetchedStocks));  // Save the fetched stocks to localStorage

    } catch (error) {
      console.error("Error fetching initial stock data:", error);
    }
  };

  useEffect(() => {
    if (stocks.length === 0) {
      fetchInitialStockData(); // Fetch initial stock data only if not available in local storage
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever stocks change
    if (stocks.length > 0) {
      localStorage.setItem("stocks", JSON.stringify(stocks));
    }
  }, [stocks]);

  useEffect(() => {
    // Update localStorage when cashBalance changes
    localStorage.setItem("cashBalance", JSON.stringify(cashBalance));
  }, [cashBalance]);

  const refreshStockData = async () => {
    fetchInitialStockData();
  };

  const buyStock = async (symbol, quantity) => {
    try {
      // Find the stock in the `stocks` array
      const buyingStock = stocks.find((stock) => stock.symbol === symbol);

      if (buyingStock) {
        if (quantity === "") {
          alert("Please enter valid quantity.");
        } else {
          const price = buyingStock.price; // Use price directly from stocks

          if (price && cashBalance >= price * quantity) {
            // Check for existing stock in myStocks
            const existingStock = myStocks.find(
              (stock) => stock.symbol === symbol
            );

            const updatedMyStocks = existingStock
              ? myStocks.map((stock) =>
                  stock.symbol === symbol
                    ? { ...stock, quantity: stock.quantity + quantity }
                    : stock
                )
              : [...myStocks, { symbol, price, quantity }]; // Add new stock if not found

            setMyStocks(updatedMyStocks);
            setCashBalance(cashBalance - price * quantity);

            // Update local storage
            localStorage.setItem("myStocks", JSON.stringify(updatedMyStocks));
            localStorage.setItem("cashBalance", JSON.stringify(cashBalance));
            alert(
              `You've successfully purchased ${quantity} shares of ${symbol} for $${(
                price * quantity
              ).toFixed(2)}.`
            );
          } else {
            alert("Insufficient funds or invalid stock symbol.");
          }
        }
      } else {
        alert("Stock not found."); // Inform user if the stock isn't available
      }
    } catch (error) {
      console.error("Error buying stock:", error);
    }
  };

  const sellStock = (symbol, quantity) => {
    try {
      // Find the existing stock in myStocks
      const existingStock = myStocks.find((stock) => stock.symbol === symbol);

      if (existingStock && existingStock.quantity >= quantity) {
        if (quantity === "") {
          alert("Please enter valid quantity.");
        } else {
          // Ensure `stocks` are refreshed to check the updated price if changed, which will be updated in local storage to reduce API's requests.
          const soldPrice = stocks.find(
            (stock) => stock.symbol === symbol
          ).price;

          let remainingQuantity = existingStock.quantity - quantity; // Calculate remaining quantity

          const newMyStocks =
            remainingQuantity > 0
              ? myStocks.map((stock) =>
                  stock.symbol === symbol
                    ? { ...stock, quantity: remainingQuantity }
                    : stock
                )
              : myStocks.filter((stock) => stock.symbol !== symbol); // Remove completely sold stock

          setMyStocks(newMyStocks);
          setCashBalance(cashBalance + soldPrice * quantity);

          // Update local storage
          localStorage.setItem("myStocks", JSON.stringify(newMyStocks));
          localStorage.setItem("cashBalance", JSON.stringify(cashBalance));
          alert(
            `You've successfully sold ${quantity} shares of ${symbol} for $${(
              soldPrice * quantity
            ).toFixed(2)}.`
          );
        }
      } else {
        alert("Invalid quantity or stock not owned.");
      }
    } catch (error) {
      console.error("Error selling stock:", error);
    }
  };

  const updateCashBalance = async (amount) => {
    setCashBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <h1 className="text-center m-4 font-weight-bold custom-header-color">
          Stock Trading App
        </h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <CashBalance
            balance={cashBalance}
            updateBalance={updateCashBalance}
          />
        </div>
        <div className="col-md-6">
          <StockForm buyStock={buyStock} sellStock={sellStock} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <StockList stocks={stocks} refreshStockData={refreshStockData} />
        </div>
        <div className="col-md-6">
          <MyStockList stocks={myStocks} />
        </div>
      </div>
    </div>
  );
}

export default App;
