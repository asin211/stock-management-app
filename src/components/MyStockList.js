import React, { useState, useEffect } from "react";

function MyStockList({ stocks }) {
  const [netTotalValue, setNetTotalValue] = useState(0);

  useEffect(() => {
    // Calculate net total value on component mount or stock data change
    if (stocks.length > 0) {
      const totalValue = stocks.reduce((acc, stock) => {
        return acc + stock.price * stock.quantity;
      }, 0);
      setNetTotalValue(totalValue.toFixed(2));
    } else {
      setNetTotalValue(0);
    }
  }, [stocks]);

  return (
    <>
      <div className="card shadow mt-4 mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center custom-heading-color">
            <h2>My Stocks</h2>
            <div>Net Total Value: ${netTotalValue}</div>
          </div>
          {stocks.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Symbol</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.symbol}>
                    <td>{stock.symbol}</td>
                    <td>${stock.price.toFixed(2)}</td>
                    <td>{stock.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-secondary text-center" role="alert">
              No Stocks to display
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyStockList;
