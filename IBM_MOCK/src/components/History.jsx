import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function History() {
  const user = useSelector((state) => state.user.user);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://backendtracker-1.onrender.com/transactions?userId=${user.id}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://backendtracker-1.onrender.com/transactions/${id}`
      );
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditCategory(transaction.category);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `https://backendtracker-1.onrender.com/transactions/${editingId}`,
        {
          category: editCategory,
        }
      );
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id === editingId) {
          return { ...transaction, category: editCategory };
        }
        return transaction;
      });
      setTransactions(updatedTransactions);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const filteredTransactions = transactions
    .filter((transaction) => filter === "All" || transaction.type === filter)
    .sort((a, b) =>
      sortOrder === "Ascending"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div>
      <h1 className=" text-center text-[30px] font-semibold font-mono  ">
        History
      </h1>

      <div className="flex justify-center gap-[40px]">
        <select
          value={filter}
          className="p-[10px]"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-[10px]"
        >
          <option value="Ascending" className="p-[10px]">
            Ascending
          </option>
          <option value="Descending" className="p-[10px]">
            Descending
          </option>
        </select>
      </div>
      {filteredTransactions.map((transaction) => (
        <div className="p-[20px]" key={transaction.id}>
          {editingId === transaction.id ? (
            <div className="flex justify-between ">
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="p-[20px]"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div className="flex justify-between font-semibold text-[18px] ">
              <div className="p-[10px]">{transaction.category}</div>
              <div className="card-date p-[10px]">
                {new Date(transaction.date).toDateString()}
              </div>
              <div
                className={`card-amount ${
                  transaction.type === "Income" ? "income" : "expense"
                } p-[10px]`}
              >
                {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
              </div>
              <div className="card-actions">
                <button
                  className="p-[10px] font-semibold text-[18px]"
                  onClick={() => handleEditClick(transaction)}
                >
                  📝
                </button>
                <button
                  className="p-[10px] font-semibold text-[18px]"
                  onClick={() => handleDelete(transaction.id)}
                >
                  🚮
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
