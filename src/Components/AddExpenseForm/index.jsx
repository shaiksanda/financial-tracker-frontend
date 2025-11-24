import PacmanLoader from "react-spinners/PacmanLoader";
import { toast } from "react-toastify";

import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { useAddExpenseMutation } from "../../services/api";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddExpenseForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        type: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [addExpense, { isLoading }] = useAddExpenseMutation()

    const handleForm = async (e, close) => {
        e.preventDefault()

        try {
            await addExpense(formData).unwrap();
            toast.success("Record Added Successfully!")
            close()
            setFormData({ title: "", amount: "", category: "", type: "", date: "" })
        }
        catch (error) {
            toast.error(error?.data?.message || "Failed to add Record!");
        }
    }

    const isValid = Object.values(formData).every(value => value.trim() !== "");
    return (
        <div>
            <Popup
                contentStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '400px',
                }} modal trigger={<button className="expense-button nav-item"><BookmarkPlus />Add Expense</button>}>
                {(close) => (
                    <form onSubmit={(e) => handleForm(e, close)}>
                        <h2 className="expense-heading">Add Expense</h2>
                        <div className="input-wrapper">
                            <input name="title" value={formData.title}
                                onChange={handleChange} id="text" required className="input-element" type="text" />
                            <label className="label" htmlFor="text">Title</label>
                        </div>
                        <div className="input-wrapper">
                            <input name="amount" value={formData.amount}
                                onChange={handleChange} required id="amount" type="number" className="input-element" />
                            <label htmlFor="amount" className="label">Amount</label>
                        </div>
                        <div className="input-wrapper">
                            <input name='category'
                                value={formData.category}
                                onChange={handleChange}
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
                        <input name="date" value={formData.date}
                            onChange={handleChange} required id="date" type="date" className="input-element" />

                        <select name="type" value={formData.type}
                            onChange={handleChange} className="input-element">
                            <option value="">Select Type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                            <option value="savings">Savings</option>
                        </select>

                        <button disabled={isLoading || !isValid} style={{ width: '100%' }} className="button login-button" type="submit">
                            {isLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                                Processing...
                                <PacmanLoader color="black" size={10} />
                            </span>) : ("Add Expense Details")}
                        </button>

                    </form>
                )}
            </Popup>

        </div>
    )
}

export default AddExpenseForm
