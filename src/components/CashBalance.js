import React, { useState } from "react";

function CashBalance({ balance, updateBalance }) {
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    const enteredAmount = parseInt(amount.replace(/^0+/, ""));
    if (!isNaN(enteredAmount) && enteredAmount > 0) {
      updateBalance(enteredAmount);
      setAmount("");
      alert(`Deposited $${enteredAmount} successfully.`);
    } else {
      alert("Please enter a valid positive amount.");
      setAmount("");
    }
  };

  const handleWithdraw = () => {
    const enteredAmount = parseInt(amount.replace(/^0+/, ""));
    if (
      !isNaN(enteredAmount) &&
      enteredAmount > 0 &&
      enteredAmount <= balance
    ) {
      updateBalance(-enteredAmount);
      setAmount("");
      alert(`Withdrew $${enteredAmount} successfully.`);
    } else {
      if (enteredAmount > balance) {
        alert("Insufficient funds.");
        setAmount("");
      } else {
        alert("Please enter a valid positive amount.");
        setAmount("");
      }
    }
  };

  return (
    <div className="container-fluid bg-light border p-3 rounded shadow mt-4 mb-4">
      <h2 className="text-center mb-4 custom-heading-color">Balance: ${balance.toFixed(2)}</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
        placeholder="Enter Amount"
          type="number"
          min={1}
          maxLength={6}
          value={amount}
          id="amount"
          className="form-control"
          onChange={(e) =>
            setAmount(e.target.value.replace(/^0+/, "").slice(0, 6))
          }
        />
      </div>
      <div className="d-flex justify-content-around">
        <button onClick={handleDeposit} className="btn btn-primary">
          Deposit
        </button>
        <button onClick={handleWithdraw} className="btn btn-danger">
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default CashBalance;
