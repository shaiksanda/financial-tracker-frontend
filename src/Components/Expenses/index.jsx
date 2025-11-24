import Skeleton from "@mui/material/Skeleton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";


import MainHeader from "../MainHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import { useEffect, useState } from "react"
import { useAddExpenseMutation, useGetExpensesQuery } from "../../services/api"
import PacmanLoader from "react-spinners/PacmanLoader";
import "./index.css"


const skeletons = [];

for (let i = 0; i < 2; i++) {
  skeletons.push(
    <div key={i}>
      <Skeleton variant="rectangular" width="100%" height={100} />
    </div>
  );
}


const Expenses = () => {
  

  
  const { data, isLoading: expenseLoading, isFetching } = useGetExpensesQuery({ limit: 5, sortByDate: 'date', dateOrder: "desc" });
  const { expenses } = data || []

  useEffect(() => {

  }, [])

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main expense-layout">
        <div className="transactions-container">
          <h2 className="welcome-heading">Welcome {user?.username.toUpperCase()}</h2>
          <h2 className="recent-transactions">Recent Transactions</h2>
          {isFetching && <h2 className="wait-msg">Please wait… loading your data.</h2>}
          <div className="grid-expense-container">
            {(expenseLoading || isFetching) ? (
              skeletons

            ) : (
              expenses?.map((each) => (
                <div key={each._id} className="each-expense-item">
                  <h2>Title : <span className="highlight">{each.title}</span></h2>
                  <h2>Amount : <span className="highlight">{each.amount}</span></h2>
                  <h2>Category : <span className="highlight">{each.category}</span></h2>
                  <h2>Type : <span className="highlight">{each.type}</span></h2>
                  <h2>Date : <span className="highlight">{new Date(each.date).toDateString()}</span></h2>
                </div>
              )))}

          </div>
        </div>
        <div className="summary-container">

          <h2 className="expense-heading">Summary</h2>
            <h2>This section is still under development and will be available soon.</h2>
          {/* <h2>Quick Cards</h2>
          <h3>Today's Income, Expenses</h3>
          <h3>Delivery Summary</h3> */}
        </div>
      </main>
     
      <Footer />
    </div>
  )
}

export default Expenses
