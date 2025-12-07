import PacmanLoader from "react-spinners/PacmanLoader";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { stagedTimers } from "../../fetchData";
import { CirclePlus } from "lucide-react";
import { useState,useEffect } from "react";
import { useAddDeliveryRecordMutation } from "../../services/deliveryApi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddDeliveryForm = () => {
    const today = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState({ date:today, timeTaken: "", dropLocation: "", distance: '', earnings: "", status: "completed", notes: "", customerName: "" })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const [addDeliveryRecord, { isLoading,isFetching }] = useAddDeliveryRecordMutation()
    useEffect(() => {
        if (isLoading || isFetching) stagedTimers.start();
        else stagedTimers.stop();

        return () => {
            stagedTimers.stop();
        }
    }, [isLoading, isFetching])
    const handleForm = async (e, close) => {
        e.preventDefault()

        try {
            await addDeliveryRecord(formData).unwrap();
            toast.success("Record Added Successfully!")
            close()
            setFormData({ timeTaken: "", earnings: "", distance: "", dropLocation: "", date: "", status: "", notes: "", customerName: "" })
        }
        catch (error) {
            toast.error(error?.data?.message || "Failed to add Record!");
        }
    }
    const { notes, ...requiredFields } = formData;

    const isValid = Object.values(requiredFields).every(
        (value) => value.trim() !== ""
    );
     const isMobile = useMediaQuery({ maxWidth: 640 }); // mobile
    return (
        <div>
            <Popup
                contentStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '400px',
                }} modal trigger={<button className={`expense-button ${isMobile ? "footer-item" : "nav-item"}`}><CirclePlus />{isMobile ? "Add":"Add Delivery"}</button>}>
                {(close) => (
                    <form onSubmit={(e) => handleForm(e, close)}>
                        <h2 className="expense-heading">Add Delivery Record</h2>
                        <div className="input-wrapper">
                            <input name="customerName" value={formData.customerName}
                                onChange={handleChange} id="customerName" required className="input-element" type="text" />
                            <label className="label" htmlFor="customerName">Customer Name</label>
                        </div>
                        <div className="input-wrapper">
                            <input name="dropLocation" value={formData.dropLocation}
                                onChange={handleChange} id="dropLocation" required className="input-element" type="text" />
                            <label className="label" htmlFor="dropLocation">Drop Location</label>
                        </div>
                        <div className="input-wrapper">
                            <input name="earnings" value={formData.earnings}
                                onChange={handleChange} required id="earnings" type="number" className="input-element" />
                            <label htmlFor="earnings" className="label">Earnings</label>
                        </div>
                        <div className="input-wrapper">
                            <input name="distance" value={formData.distance}
                                onChange={handleChange} required id="distance" type="number" className="input-element" />
                            <label htmlFor="distance" className="label">Distance</label>
                        </div>

                        <div className="input-wrapper">
                            <input name="timeTaken" value={formData.timeTaken}
                                onChange={handleChange} id="timeTaken" required className="input-element" type="number" />
                            <label className="label" htmlFor="timeTaken">Time Taken</label>
                        </div>

                        <input name="date" value={formData.date}
                            onChange={handleChange} required id="date" type="date" className="input-element" />

                        <select name="status" value={formData.status}
                            onChange={handleChange} className="input-element">
                            <option value="">Select Status</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                        </select>
                        <div className="input-wrapper">
                            <input name="notes" value={formData.notes}
                                onChange={handleChange} id="notes" className="input-element" type="text" />
                            <label className="label" htmlFor="notes">Notes</label>
                        </div>

                        <button disabled={isLoading || !isValid} style={{ width: '100%' }} className="button login-button" type="submit">
                            {isLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                                Processing...
                                <PacmanLoader color="black" size={10} />
                            </span>) : ("Add Trip Details")}
                        </button>

                    </form>
                )}
            </Popup>
        </div>
    )
}

export default AddDeliveryForm
