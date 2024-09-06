import React, { useEffect } from "react";

function StockList({ stocks, refreshStockData }) {
  useEffect(() => {
    // No need for additional logic here, re-render triggers when refreshStockData changes
  }, [refreshStockData]);

  return (
    <div className="card shadow mt-4 mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="custom-heading-color">Popular Stocks</h2>
          <button
            type="button"
            className="btn btn-success ms-3"
            onClick={refreshStockData}
          >
            Refresh Stock Prices
          </button>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{stock.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
