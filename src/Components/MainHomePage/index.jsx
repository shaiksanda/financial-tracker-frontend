import Sidebar from "../Sidebar"
import MainHeader from "../MainHeader"
import "./index.css"
import { useEffect } from "react"
import Footer from "../Footer"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
//import { Motorbike,Route,IndianRupee,Fuel } from "lucide-react"
import { useGetTodayPerformanceQuery, useDeleteTripMutation } from "../../services/api"
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
