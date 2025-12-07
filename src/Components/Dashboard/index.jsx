import MainHeader from "../MainHeader"
import Sidebar from "../Sidebar"
import { useGetDashboardQuery } from "../../services/expenseApi";
import Chart from "react-apexcharts";
import {  RingLoader } from "react-spinners";
import { ArrowDownCircle, ArrowUpCircle, PiggyBank } from "lucide-react";
import "./index.css"
import { useState } from "react";
import Footer from "../Footer";

const Dashboard = () => {
  const [n, setN] = useState("7")
  const { data, isLoading, isFetching, isError, error } = useGetDashboardQuery(Number(n), { refetchOnMountOrArgChange: true });

  const categoryData = data?.categoryData || [];
  const typeData = data?.typeData || [];
  const totals = data?.totals || {};
  const dashboardData = data?.dashboardData || []
  // --- Pie Chart (Categories) ---
  const pieSeries = categoryData?.map((c) => c.total);

  const pieOptions = {
    labels: categoryData?.map((c) => c.category),
    legend: { position: "bottom" },
    title: {
      text: "Category-wise Expenses",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: 600,
      },
    },
    colors: ["#1E90FF", "#FF6347", "#32CD32", "#FFA500", "#800080"]

  };

  // typeData example: [{ type: "income", total: 5000 }, { type: "expense", total: 2000 }, { type: "savings", total: 1000 }]
  const donutSeries = typeData?.map(t => t.total) || [];
  const donutOptions = {
    labels: typeData?.map(t => t.type) || [],
    legend: { position: "bottom" },
    title: {
      text: "Type-wise Breakdown",
      align: "center",
      style: { fontSize: "18px", fontWeight: 600 }
    },
    colors: ["#32CD32", "#FF6347", "#1E90FF"], // green-income, red-expense, blue-savings
    chart: { type: "donut" }
  };

  // map dates for x-axis
  const areaCategories = dashboardData?.map(d => new Date(d.date).toLocaleDateString()) || [];

  // map income for y-axis
  const areaSeries = [{
    name: "Income",
    data: dashboardData?.map(d => d.totalIncome) || []
  }];

  const areaOptions = {
    chart: { type: "area", toolbar: { show: false } },
    xaxis: { categories: areaCategories },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: {
      text: "Income Over Last N Days",
      align: "center",
      style: { fontSize: "18px", fontWeight: 600 }
    },
    colors: ["#32CD32"], // green for income
    grid: { borderColor: "#f1f1f1" },
    markers: { size: 5 }
  };

  // x-axis: dates
  const expenseCategories = dashboardData?.map(d => new Date(d.date).toLocaleDateString()) || [];

  // y-axis: expenses
  const expenseSeries = [
    {
      name: "Expenses",
      data: dashboardData?.map(d => d.totalExpenses) || []
    }
  ];

  const expenseOptions = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories: expenseCategories },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: {
      text: "Expenses Over Last N Days",
      align: "center",
      style: { fontSize: "18px", fontWeight: 600 }
    },
    colors: ["#FF6347"], // red for expenses
    grid: { borderColor: "#f1f1f1" },
    markers: { size: 5 }
  };


  // x-axis: dates
  const savingsCategories = dashboardData?.map(d => new Date(d.date).toLocaleDateString()) || [];

  // y-axis: savings
  const savingsSeries = [
    {
      name: "Savings",
      data: dashboardData?.map(d => d.totalSavings) || []
    }
  ];

  const savingsOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: savingsCategories },
    dataLabels: { enabled: true },
    title: {
      text: "Savings Over Last N Days",
      align: "center",
      style: { fontSize: "18px", fontWeight: 600 }
    },
    colors: ["#1E90FF"], // blue for savings
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: "90%" }
    },
    grid: { borderColor: "#f1f1f1" }
  };

  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main">
        <h2 className="expense-heading">Dashboard</h2>
        <select className="input-element dropdown" value={n} onChange={(e) => setN(e.target.value)}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="180">Last 180 Days</option>
          <option value="365">Last 365 Days</option>
        </select>
        {isError ? (<h2 className="wait-message">{error?.data?.message}</h2>) : ((isLoading || isFetching) ? (<div className="dashboard-container"><h2 className="wait-msg">Please wait… loading your data.</h2><RingLoader color="red" /></div>) : (
          <>
            <div className="grid-expense-container">
              <div className="flex-container card">
                <ArrowUpCircle />
                <h2>Expenses: {totals?.totalExpenses}</h2>
              </div>
              <div className="flex-container card">
                <ArrowDownCircle />
                <h2>Income: {totals?.totalIncome}</h2>
              </div>
              <div className="flex-container card">
                <PiggyBank />
                <h2>Savings: {totals?.totalSavings}</h2>
              </div>
            </div>
            <div className="chart-card">
              <Chart
                type="pie"
                height={320}
                series={pieSeries}
                options={pieOptions}
              />
            </div>

            <div className="chart-card">
              <Chart
                type="donut"
                height={320}
                series={donutSeries}
                options={donutOptions}
              />
            </div>

            <div className="chart-card">
              <Chart
                type="area"
                height={320}
                series={areaSeries}
                options={areaOptions}
              />
            </div>

            <div className="chart-card">
              <Chart
                type="line"
                height={320}
                series={expenseSeries}
                options={expenseOptions}
              />
            </div>

            <div className="chart-card">
              <Chart
                type="bar"
                height={320}
                series={savingsSeries}
                options={savingsOptions}
              />
            </div></>
        )
        )}



      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
