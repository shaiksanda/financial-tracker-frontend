import MainHeader from "../MainHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import { useState, useEffect } from "react";
import { stagedTimers } from "../../fetchData";
import { Funnel, ArrowUpDown, ListRestart, Bike } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDeleteTripMutation, useDeliveryDataQuery, useUpdateTripMutation } from "../../services/deliveryApi";
const skeletons = [];

for (let i = 0; i < 3; i++) {
  skeletons.push(
    <div key={i}>
      <Skeleton variant="rectangular" width="100%" height={100} />
    </div>
  );
}

import "./index.css"


const DeliveryTracker = () => {
  const [search, setSearch] = useState("")
  const [date, setDate] = useState("")
  const [days, setDays] = useState("")
  const [status, setStatus] = useState("")
  const [sortByDate, setSortByDate] = useState("")
  const [dateOrder, setDateOrder] = useState("")
  const [sortByEarnings, setSortByEarnings] = useState("")
  const [earningsOrder, setEarningsOrder] = useState("")
  const [sortByTimeTaken, setSortByTimeTaken] = useState("")
  const [timeTakenOrder, setTimeTakenOrder] = useState("")

  const [sortByDistance, setSortByDistance] = useState("")
  const [distanceOrder, setDistanceOrder] = useState("")
  const [updateTrip,{isLoading:updateLoading,isFetching:updateFetching}] = useUpdateTripMutation();

  const { data, isLoading, isFetching, isError, error } = useDeliveryDataQuery({ sortByDistance, distanceOrder, sortByTimeTaken, timeTakenOrder, sortByEarnings, earningsOrder, sortByDate, dateOrder, date, days, status })
  const [formData, setFormData] = useState({ customerName: "", dropLocation: "", earnings: "", distance: "", timeTaken: "", notes: "" })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  useEffect(() => {
    if (isLoading || isFetching) stagedTimers.start();
    else stagedTimers.stop();

    return () => {
      stagedTimers.stop();
    }
  }, [isLoading, isFetching])
  const [deleteTrip] = useDeleteTripMutation()

  const handleDistane = (e) => {
    setSortByDistance(e.target.value)
  }

  const handleDistanceOrder = (e, close) => {
    setDistanceOrder(e.target.value)
    close()
  }

  const handleTimeTaken = (e) => {
    setSortByTimeTaken(e.target.value)
  }

  const handleTimeTakenOrder = (e) => {
    setTimeTakenOrder(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }
  const handleDate = (e) => {
    setSortByDate(e.target.value)
  }

  const handleDateOrder = (e) => {
    setDateOrder(e.target.value)
  }
  const handleEarnings = (e) => {
    setSortByEarnings(e.target.value)
  }

  const handleEarningsOrder = (e) => {
    setEarningsOrder(e.target.value)
  }

  const handleFilterDate = (e) => {
    setDate(e.target.value)
  }

  const handleDays = (e, close) => {
    setDays(e.target.value)
    close()
  }

  const handleDelete = async (id, close) => {
    try {
      await deleteTrip(id).unwrap()
      toast.success("Trip Deleted Successfully!")
      close()
    }
    catch (error) {
      toast(error?.data?.message)
    }
  }

  const handleReset = () => {
    setSearch("")
    setSortByDate("")
    setDateOrder("")
    setSortByEarnings("")
    setEarningsOrder("")
    setSortByTimeTaken("")
    setTimeTakenOrder("")
    setSortByDistance("")
    setDistanceOrder("")
    setStatus("")
    setDate("")
    setDays("")
  }
  const filteredDeliveryData = data?.deliveryRecords?.filter((item) => item.dropLocation?.toLowerCase().includes(search.toLowerCase()) || item.customerName?.toLowerCase().includes(search.toLowerCase()))
  const noFilteredData = !isLoading && !isFetching && (filteredDeliveryData?.length === 0);


  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main">
        <h2 className="expense-heading">Delivery Tracker</h2>
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
                  <h3>Sort By Earnings</h3>

                  <select onChange={handleEarnings} value={sortByEarnings} className="input-element">
                    <option value="" hidden>Pick A Sort Option</option>
                    <option value="earnings">Earnings</option>
                  </select>

                  {sortByEarnings && <select onChange={(e) => handleEarningsOrder(e)} value={earningsOrder} className="input-element">
                    <option value="" hidden>Select Order</option>
                    <option value="desc">High → Low</option>
                    <option value="asc">Low → High</option>
                  </select>}
                </div>

                <div className="sort-section">
                  <h3>Sort By Time Taken</h3>

                  <select onChange={handleTimeTaken} value={sortByTimeTaken} className="input-element">
                    <option value="" hidden>Pick A Sort Option</option>
                    <option value="timeTaken">Time Taken</option>
                  </select>

                  {sortByTimeTaken && <select onChange={(e) => handleTimeTakenOrder(e)} value={timeTakenOrder} className="input-element">
                    <option value="" hidden>Select Order</option>
                    <option value="desc">High → Low</option>
                    <option value="asc">Low → High</option>
                  </select>}
                </div>

                <div className="sort-section">
                  <h3>Sort By Distace</h3>

                  <select onChange={handleDistane} value={sortByDistance} className="input-element">
                    <option value="" hidden>Pick A Sort Option</option>
                    <option value="distance">Distance</option>
                  </select>

                  {sortByDistance && <select onChange={(e) => handleDistanceOrder(e, close)} value={distanceOrder} className="input-element">
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
                  <h3>Filter By Status</h3>
                  <select className="input-element" value={status} onChange={handleStatus}>
                    <option hidden value="">Select Status</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>

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
        {(!isLoading || !isFetching) && <div className="progress-container">
          <div className="flex-container">

            {/* <Motorbike size={24} /> */}
            <h2>Trips: {data?.totalTrips}/-</h2>
          </div>
          <div className="flex-container">

            {/* <Route size={24} /> */}
            <h2>Total Kms:{data?.totalKms}kms/-</h2>
          </div>
          <div className="flex-container">

            {/* <IndianRupee size={24} /> */}
            <h2>Earnings: {data?.totalEarnings}/-</h2>
          </div>
          <div className="flex-container">

            {/* <Fuel size={24} /> */}
            <h2>Petrol Cost: {data?.totalPetrolCost}/-</h2>
          </div>
        </div>
        }

        {(noFilteredData) && (
          <h2 className="wait-msg">No Trips match your filters. Try adjusting them.</h2>
        )}
        {isFetching && <h2 className="wait-msg">Please wait… loading your data.</h2>}
        {isError ? (
          <h2 className="wait-msg">{error?.data?.message} Add your first record.</h2>
        ) : (<div className="grid-history-container">
          {(isLoading || isFetching) ? (skeletons
          ) : filteredDeliveryData?.map((each) => (
            <div className="each-expense-item" key={each._id}>
              <h4>Customer Name: <span className="highlight">{each.customerName}</span></h4>
              <h4>Drop Location: <span className="highlight">{each.dropLocation}</span></h4>
              <h4>Earnings: <span className="highlight">{each.earnings}₹/-.</span></h4>
              <h4>Distance: <span className="highlight">{each.distance}Km's.</span></h4>
              <h4>Time Taken: <span className="highlight">{each.timeTaken}minutes</span></h4>
              <h4>Petrol Cost: <span className="highlight">{each.petrolCostPerDelivery}₹/-.</span></h4>
              <h4>Date: <span className="highlight">{new Date(each.date).toDateString()}</span></h4>
              <h4>Status: <span className="highlight">{each.status}</span></h4>
              {each.notes && <h4>Notes: <span className="highlight">{each.notes}</span></h4>}
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
                <Popup onOpen={() => setFormData({
                  customerName: each.customerName,
                  dropLocation: each.dropLocation,
                  earnings: each.earnings,
                  distance: each.distance,
                  timeTaken: each.timeTaken,
                  notes: each.notes || ""
                })}
                  contentStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '400px',
                  }} modal trigger={<button  className="button update-btn">Update</button>}>
                  {(close) => (
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        await updateTrip({ id: each._id, data: formData }).unwrap();
                        toast.success("Trip updated successfully!");
                        close(); // closes popup after success
                      } catch (err) {
                        toast.error(err?.data?.message || "Update failed!");
                      }
                    }} className="sort-container">
                      <div className="input-wrapper">
                        <input value={formData.customerName}
                          onChange={handleChange} name="customerName" id="customerName" type="text" required className="input-element" />
                        <label htmlFor="customerName" className="label">Customer Name</label>
                      </div>
                      <div className="input-wrapper">
                        <input onChange={handleChange} value={formData.dropLocation} name="dropLocation" id="dropLocation" type="text" className="input-element" required />
                        <label htmlFor="dropLocation" className="label">Drop Location</label>
                      </div>
                      <div className="input-wrapper">
                        <input onChange={handleChange} value={formData.earnings} required name="earnings" id="earnings" className="input-element" type="number" />
                        <label className="label" htmlFor="earnings">Earnings</label>
                      </div>
                      <div className="input-wrapper">
                        <input onChange={handleChange} value={formData.distance} required name="distance" id="distance" className="input-element" type="number" />
                        <label className="label" htmlFor="distance">Distance</label>
                      </div>
                      <div className="input-wrapper">
                        <input onChange={handleChange} value={formData.timeTaken} required name="timeTaken" id="timeTaken" className="input-element" type="number" />
                        <label className="label" htmlFor="timeTaken">Time Taken</label>
                      </div>
                      <div className="input-wrapper">
                        <input value={formData.notes}
                          onChange={handleChange} name="notes" id="notes" type="text" required className="input-element" />
                        <label htmlFor="notes" className="label">Notes</label>
                      </div>

                      <div className="btns">
                        <button disabled={updateLoading || updateFetching} type="submit" className="button update-btn">{updateLoading?"Processing...":"Update"}</button>
                        <button className="button" onClick={close}>Close</button>
                      </div>

                    </form>
                  )}
                </Popup>
              </div>
            </div>
          ))}
        </div>)}

      </main>
      <Footer />
    </div>
  )
}

export default DeliveryTracker
