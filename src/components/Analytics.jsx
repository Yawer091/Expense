import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Sorry, something went wrong.</h2>;
    }
    return this.props.children;
  }
}

const Analytics = () => {
  const user = useSelector((state) => state.user.user);
  const [incomeData, setIncomeData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6382", "#36A2EB", "#FFCE56", "#E7E9ED"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED"],
      },
    ],
  });
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  });

  useEffect(() => {
    if (user && user.id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://backendtracker-1.onrender.com/transactions"
          );
          const transactions = response.data;

          const incomeTotals = calculateTotals(
            transactions.filter((t) => t.type === "Income")
          );
          const expenseTotals = calculateTotals(
            transactions.filter((t) => t.type === "Expense")
          );

          setIncomeData({
            labels: Object.keys(incomeTotals),
            datasets: [
              {
                data: Object.values(incomeTotals),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED"],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#E7E9ED",
                ],
              },
            ],
          });

          setExpenseData({
            labels: Object.keys(expenseTotals),
            datasets: [
              {
                data: Object.values(expenseTotals),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#E7E9ED",
                  "#4BC0C0",
                  "#9966FF",
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#E7E9ED",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching transactions data:", error);
        }
      };
      fetchData();
    }
  }, [user]);

  const calculateTotals = (transactions) => {
    return transactions.reduce((totals, transaction) => {
      totals[transaction.category] =
        (totals[transaction.category] || 0) + transaction.amount;
      return totals;
    }, {});
  };

  return (
    <div className=" flex mt-[10px] justify-center">
      <div className="  flex justify-between">
        <div>
          <h2 className="text-[32px] text-center font-semibold text-blue-500">
            INCOME
          </h2>
          <ErrorBoundary>
            <Doughnut data={incomeData} />
          </ErrorBoundary>
        </div>
        <div>
          <h2 className="text-[32px] text-center font-semibold text-blue-500">
            EXPENSE
          </h2>
          <ErrorBoundary className="w-[50%] m-auto">
            <Doughnut data={expenseData} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
