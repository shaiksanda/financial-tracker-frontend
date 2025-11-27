import { TramFront, History, LayoutDashboard, ChartSpline, House, ChartNoAxesCombined, } from "lucide-react";
import { Link } from "react-router-dom";
import AddExpenseForm from "../AddExpenseForm";

import "./index.css"
import AddDeliveryForm from "../AddDeliveryForm";


const Sidebar = () => {

    return (
        <aside className="sidebar">

            <Link className="link-item" to="/home">
                <div className="nav-item">
                    <House size={18} />
                    <h2 className="nav-text">Home</h2>
                </div>
            </Link>
            <AddDeliveryForm />
            <Link className="link-item" to="/delivery-tracker">
                <div className="nav-item">
                    <ChartSpline size={18} />
                    <h2 className="nav-text">Delivery Tracker</h2>
                </div>
            </Link>
            <Link className="link-item" to="/delivery-analytics">
                <div className="nav-item">
                    <ChartNoAxesCombined size={18} />
                    <h2 className="nav-text">Delivery Analytics</h2>
                </div>
            </Link>
            <hr />
            <AddExpenseForm />
            <Link className="link-item" to="/history">
                <div className="nav-item">
                    <History size={18} />
                    <h2 className="nav-text">History</h2>
                </div>
            </Link>

            <Link className="link-item" to="/dashboard">
                <div className="nav-item">
                    <LayoutDashboard size={18} />
                    <h2 className="nav-text">Dashboard</h2>
                </div>
            </Link>








            <Link className="link-item" to="/product-tour">
                <div className="nav-item">
                    <TramFront size={18} />
                    <h2 className="nav-text">Product Tour</h2>
                </div>
            </Link>


        </aside>
    )
}

export default Sidebar
