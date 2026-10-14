
import { useState, useEffect } from "react";
import "./Expenses.css";

function Expenses() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("Food");
  const [members, setMembers] = useState("4");

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("tripmateExpenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Save expenses in browser
  useEffect(() => {
    localStorage.setItem("tripmateExpenses", JSON.stringify(expenses));
  }, [expenses]);

  // Calculate total expense
  let totalExpense = 0;

  expenses.forEach((expense) => {
    totalExpense = totalExpense + Number(expense.amount);
  });

  // Calculate equal share per member
  const perPerson = Number(members) > 0
    ? totalExpense / Number(members)
    : 0;

  // Add expense
  function handleSubmit(e) {
    e.preventDefault();

    if (!expenseName.trim() || !amount || !paidBy.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    if (Number(amount) <= 0 || Number(members) <= 0) {
      alert("Amount and members must be greater than zero.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: Number(amount),
      paidBy: paidBy,
      category: category,
      date: new Date().toLocaleDateString("en-IN")
    };

    setExpenses([...expenses, newExpense]);

    setExpenseName("");
    setAmount("");
    setPaidBy("");
    setCategory("Food");
  }

  // Delete expense
  function deleteExpense(id) {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
  }

  return (
    <div className="expenses-page">

      <div className="expenses-header">
        <h1>Expense Tracker</h1>
        <p>Track your trip expenses and split the cost with friends.</p>
      </div>

      {/* Expense Summary */}

      <div className="expense-summary">

        <div className="summary-card">
          <p>Total Expenses</p>
          <h2>₹{totalExpense.toLocaleString("en-IN")}</h2>
        </div>

        <div className="summary-card">
          <p>Number of Expenses</p>
          <h2>{expenses.length}</h2>
        </div>

        <div className="summary-card">
          <p>Share Per Person</p>
          <h2>₹{perPerson.toLocaleString("en-IN", {
            maximumFractionDigits: 2
          })}</h2>
        </div>

      </div>

      {/* Add Expense Form */}

      <div className="expense-form-card">
        <h2>Add New Expense</h2>

        <form onSubmit={handleSubmit}>

          <label>Expense Name</label>
          <input
            type="text"
            placeholder="Example: Lunch"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />

          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Paid By</label>
          <input
            type="text"
            placeholder="Enter member name"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Hotel">Hotel</option>
            <option value="Shopping">Shopping</option>
            <option value="Activities">Activities</option>
            <option value="Other">Other</option>
          </select>

          <label>Number of Trip Members</label>
          <input
            type="number"
            min="1"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            required
          />

          <button type="submit" className="add-expense-btn">
            + Add Expense
          </button>

        </form>
      </div>

      {/* Expense List */}

      <div className="expense-list-card">
        <h2>Recent Expenses</h2>

        {expenses.length === 0 ? (
          <p className="empty-message">
            No expenses yet. Add your first trip expense!
          </p>
        ) : (

          <div className="expense-table-wrapper">
            <table className="expense-table">

              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Category</th>
                  <th>Paid By</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>{expense.category}</td>
                    <td>{expense.paidBy}</td>
                    <td>₹{Number(expense.amount).toLocaleString("en-IN")}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button
                        className="delete-expense-btn"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default Expenses;
