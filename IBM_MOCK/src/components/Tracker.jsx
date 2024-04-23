import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Tracker = () => {
  const user = useSelector((state) => state.user.user);
  const [transaction, setTransaction] = useState({
    type: "Income",
    category: "Salary",
    amount: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction((pre) => ({
      ...pre,
      [name]: value,
    }));

    if (name === "type") {
      if (value === "Income") {
        setTransaction((pre) => ({ ...pre, category: "Salary" }));
      } else {
        setTransaction((pre) => ({
          ...pre,
          category: "Food & Drinks",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to record a transaction.");
      return;
    }
    try {
      await axios.post("https://backendtracker-1.onrender.com/transactions", {
        ...transaction,
        userId: user.id,
      });
      alert("Transaction added successfully!");
      setTransaction({
        type: "Income",
        category: "Salary",
        amount: "",
        date: "",
      });
    } catch (error) {
      console.error("Failed to add transaction:", error);
      alert("Failed to add transaction.");
    }
  };

  const categories = {
    Income: ["Salary", "Gifts", "Refunds", "Other"],
    Expense: [
      "Housing",
      "Bills",
      "Shopping",
      "Food & Drinks",
      "Vehicle & Transport",
      "Lifestyle",
    ],
  };

  return (
    <div>
      <h2 className=" text-center text-[30px] font-semibold font-mono  ">
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} className="p-[20px] ">
        <div>
          <label className="p-[10px]">Type</label>
          <select
            className="px-[50px] py-[10px]"
            name="type"
            value={transaction.type}
            onChange={handleInputChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="">
          <label className="p-[10px]">Category</label>
          <select
            className="px-[50px] py-[10px]"
            name="category"
            value={transaction.category}
            onChange={handleInputChange}
          >
            {categories[transaction.type].map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount in Rupees </label>
          <input
            className="p-[10px]"
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            className="p-[10px]"
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="w-[40%] mx-auto flex justify-center my-[10px]">
          <button
            className=" bg-blue-600 text-gray-100  m-auto px-[20px] py-[10px] rounded-md font-semibold hover:bg-blue-500 hover:text-gray-400"
            type="submit"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tracker;
