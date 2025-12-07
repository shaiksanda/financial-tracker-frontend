import Sidebar from "../Sidebar"
import MainHeader from "../MainHeader"
import "./index.css"
import { useEffect, useState } from "react"
import Footer from "../Footer"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
//import { Motorbike,Route,IndianRupee,Fuel } from "lucide-react"
import { useGetTodayPerformanceQuery, useDeleteTripMutation, useUpdateTripMutation } from "../../services/deliveryApi"
import { PacmanLoader } from "react-spinners";
import { stagedTimers } from "../../fetchData";

const MainHomePage = () => {
    const { data, isLoading, isFetching, isError, error } = useGetTodayPerformanceQuery()
    const [deleteTrip] = useDeleteTripMutation()
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
    const [updateTrip, { isLoading: updateLoading, isFetching: updateFetching }] = useUpdateTripMutation();


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
    return (
        <div>
            <MainHeader />
            <Sidebar />
            <main>
                <h2 className="expense-heading">Today’s Progress</h2>
                {isFetching && <h2 className="wait-msg">Please wait… loading your data.</h2>}
                {isError ? (<h2 className="wait-msg">{error?.data?.message} Add your first record.</h2>) : (isLoading || isFetching) ? <div className="loader-container"><PacmanLoader color="green" /> </div> : (
                    <div>
                        <div className="progress-container">
                            <div className="flex-container">

                                {/* <Motorbike size={24} /> */}
                                <h2>Trips: {data?.totalTrips}/-</h2>
                            </div>
                            <div className="flex-container">

                                {/* <Route size={24} /> */}
                                <h2>Total Kms:{data?.totalKm}</h2>
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
                        <div className="grid-history-container">
                            {data?.records.map((each) => (
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
                                            }} modal trigger={<button className="button update-btn">Update</button>}>
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
                                                        <button disabled={updateLoading || updateFetching} type="submit" className="button update-btn">{updateLoading ? "Processing..." : "Update"}</button>
                                                        <button className="button" onClick={close}>Close</button>
                                                    </div>

                                                </form>
                                            )}
                                        </Popup>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    )
}

export default MainHomePage
