import { House, ChartSpline, ChartNoAxesCombined } from "lucide-react"
import { Link } from "react-router-dom"
import AddDeliveryForm from "../AddDeliveryForm";
import "./index.css"

const Footer = () => {
    return (
        <footer>
            <Link to="/home" className="link-item">
                <div className="footer-item">
                    <House size={18} />
                    <h2 className="footer-text">Home</h2>
                </div>
            </Link>
            <AddDeliveryForm />
            <Link className="link-item" to="/delivery-tracker">
                <div className="footer-item">
                    <ChartSpline size={18} />
                    <h2 className="nav-text">Tracker</h2>
                </div>
            </Link>
            <Link className="link-item" to="/delivery-analytics">
                <div className="footer-item">
                    <ChartNoAxesCombined size={18} />
                    <h2 className="nav-text">Analytics</h2>
                </div>
            </Link>
        </footer>
    )
}

export default Footer
