import React, { useState } from "react";

function StockForm({ buyStock, sellStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleBuyStock = async (e) => {
    e.preventDefault();
    try {
      await buyStock(symbol, quantity);
      setSymbol("");
      setQuantity("");
    } catch (error) {
      alert(error.message); // Handle errors from fetchStockData
    }
  };

  const handleSellStock = async (e) => {
    e.preventDefault();
    sellStock(symbol, quantity);
    setSymbol("");
    setQuantity("");
  };

  return (
    <form className="container-fluid bg-light border p-3 rounded shadow mt-4 mb-4">
      <div className="card-body">
        <h2 className="card-title text-center mb-4 custom-heading-color">Stock Transactions</h2>
        <div className="form-group mb-3 d-flex justify-content-between">
          <div className="col-md-6 px-3">
            <input
              placeholder="Enter Symbol"
              type="text"
              className="form-control"
              id="symbol"
              value={symbol.toUpperCase()}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col-md-6 px-3">
            <input
              placeholder="Enter Quantity"
              type="number"
              min={1}
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value <= 0 ? "" : e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around mt-3">
          <button onClick={handleBuyStock} className="btn btn-primary">
            Buy Stock
          </button>
          <button onClick={handleSellStock} className="btn btn-danger">
            Sell Stock
          </button>
        </div>
      </div>
    </form>
  );
}

export default StockForm;
