import MainHeader from "../MainHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import { useState } from "react";
import { Funnel, ArrowUpDown, ListRestart } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import { useDeleteExpenseMutation, useGetExpensesQuery } from "../../services/api"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css"

const skeletons = [];

for (let i = 0; i < 3; i++) {
  skeletons.push(
    <div key={i}>
      <Skeleton variant="rectangular" width="100%" height={100} />
    </div>
  );
}

const History = () => {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [date, setDate] = useState("")
  const [days, setDays] = useState("")
  const [category, setCategory] = useState("")
  const [sortByDate, setSortByDate] = useState("")
  const [dateOrder, setDateOrder] = useState("")
  const [sortByAmount, setSortByAmount] = useState("")
  const [amountOrder, setAmountOrder] = useState("")
  const { data, isLoading: expenseLoading, isFetching, isError, error } = useGetExpensesQuery({ sortByDate, dateOrder, sortByAmount, amountOrder, type, category, date, days })
  const [deleteExpense] = useDeleteExpenseMutation()
  const { expenses } = data || []
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleFilterDate = (e) => {
    setDate(e.target.value)
  }
  const handleDate = (e) => {
    setSortByDate(e.target.value)
  }
  const handleDateOrder = (e) => {
    setDateOrder(e.target.value)
  }
  const handleAmount = (e) => {
    setSortByAmount(e.target.value)
  }
  const handleAmountOrder = (e, close) => {
    setAmountOrder(e.target.value)
    close()
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleType = (e) => {
    setType(e.target.value)
  }

  const handleDays = (e, close) => {
    setDays(e.target.value)
    close()
  }

  const handleReset = () => {
    setSortByDate("")
    setDateOrder("")
    setSortByAmount("")
    setAmountOrder("")
    setSearch("")
    setDate("")
    setType("")
    setCategory("")
    setDays("")
  }
  const handleDelete = async (id, close) => {
    try {
      await deleteExpense(id)
      toast.success("Record Deleted Successfully!")
      close()
    }
    catch (error) {
      console.log(error)
      toast.error(error?.data?.message)
    }
  }
  const filteredExpenses = expenses?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))


  const noFilteredData = !expenseLoading && !isFetching && (filteredExpenses?.length === 0);

  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main history-container">
        <h2 className="expense-heading">Expense History</h2>
        <div className="filters-container">
          <div className="input-wrapper">
            <input onChange={handleSearch} value={search} style={{ backgroundColor: "transparent", height: "50px" }} id="search" required type="search" className="input-element search-input" />
            <label htmlFor="search" className="label">Search</label>
          </div>
          <Popup
            contentStyle={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '400px',
            }} modal trigger={<div className="history-icon" title="sort">
              <ArrowUpDown size={24} color="orange" />
            </div>}>{(close) => (
              <div className="sort-container">
                <h2>Choose your filters.</h2>
                <div className="sort-section">
                  <h3>Sort By Date</h3>

                  <select onChange={handleDate} value={sortByDate} className="input-element">
                    <option value="" hidden>Pick a Sort Option</option>
                    <option value="date">Date</option>
                  </select>

                  {sortByDate && (<select onChange={handleDateOrder} value={dateOrder} className="input-element">
                    <option value="" hidden>Select Order</option>
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>)}
                </div>
                <div className="sort-section">
                  <h3>Sort By Amount</h3>

                  <select onChange={handleAmount} value={sortByAmount} className="input-element">
                    <option value="" hidden>Pick A Sort Option</option>
                    <option value="amount">Amount</option>
                  </select>

                  {sortByAmount && <select onChange={(e) => handleAmountOrder(e, close)} value={amountOrder} className="input-element">
                    <option value="" hidden>Select Order</option>
                    <option value="desc">High → Low</option>
                    <option value="asc">Low → High</option>
                  </select>}
                </div>

              </div>
            )}</Popup>

          <Popup
            contentStyle={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '400px',
            }} modal trigger={<div className="history-icon" title="Filters">
              <Funnel size={24} color="red" />
            </div>}>
            {(close) => (
              <div className="sort-container">
                <div className="filter-section">
                  <h3>Filter By Type</h3>
                  <select value={type} className="input-element" onChange={handleType}>
                    <option value="" hidden>Select One</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>

                <div className="filter-section">
                  <h3>Filter By Category</h3>
                  <div className="input-wrapper">
                    <input name='category'
                      value={category}
                      onChange={handleCategory}
                      list="categoryList"
                      required
                      className="input-element"
                    />
                    <label className="label">Category</label>

                    <datalist id="categoryList">
                      <option value="Food" />
                      <option value="Travel" />
                      <option value="Shopping" />
                      <option value="Bills" />
                      <option value="Groceries" />
                      <option value="Entertainment" />
                      <option value="Health" />
                      <option value="Education" />
                      <option value="EMI" />
                      <option value="Fuel" />
                    </datalist>
                  </div>
                </div>
                <div className="filter-section">
                  <h3>Filter By Date</h3>
                  <div className="input-wrapper">
                    <input value={date} onChange={handleFilterDate} required id='date' className="input-element" type="date" />

                  </div>
                </div>

                <div className="filter-section">
                  <h3>Last N Days</h3>
                  <input
                    className="input-element"
                    type="number"
                    placeholder="Ex: 7"
                    value={days}
                    onChange={(e) => handleDays(e, close)}
                  />
                </div>
              </div>
            )}

          </Popup>

          <div onClick={handleReset} className="history-icon" title="reset">
            <ListRestart color="red" size={24} />
          </div>

        </div>
        {(!expenseLoading || !isFetching) && (
          <div className="progress-container">
            <h2 className="expense-heading">Total Records: {data?.count}</h2>
            <h2 className="expense">Total Expenses: {data?.totalExpenses}/-</h2>
            <h2 className="income">Total Income: {data?.totalIncome}/-</h2>
            <h2 className="savings">Total Savings: {data?.totalSavings}</h2>
          </div>
        )}

        {isError && (
          <h2 className="wait-msg">{error?.data?.message} Add your first record.</h2>
        )}

        {(noFilteredData) && (
          <h2 className="wait-msg">No Records match your filters. Try adjusting them.</h2>
        )}

        {isFetching && <h2 className="wait-msg">Please wait… loading your data.</h2>}
        <div className="grid-history-container">
          {(expenseLoading || isFetching) ? (skeletons
          ) : (filteredExpenses?.map((each) => (
            <div className="each-expense-item" key={each._id}>
              <h4>Title : <span className="highlight">{each.title}</span></h4>
              <h4>Amount : <span className="highlight">{each.amount}</span></h4>
              <h4>Category : <span className="highlight">{each.category}</span></h4>
              <h4>Type : <span className="highlight">{each.type}</span></h4>
              <h4>Date : <span className="highlight">{new Date(each.date).toDateString()}</span></h4>
              <div className="btns">
                <Popup
                  contentStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '400px',
                  }} modal trigger={<button className="button delete-button">Delete</button>}>
                  {(close) => (
                    <div className="sort-container">
                      <h2>Are you sure you want to Delete? This action cannot be undone.</h2>
                      <div className="btns">
                        <button onClick={() => handleDelete(each._id, close)} className="btn confirm-btn">Confirm</button>
                        <button onClick={close} className="btn cancel-btn">Cancel</button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default History
