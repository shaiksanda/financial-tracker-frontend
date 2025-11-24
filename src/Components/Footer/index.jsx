import { House, LayoutDashboard, History } from "lucide-react"
import { Link } from "react-router-dom"
import "./index.css"

const Footer = () => {
    return (
        <footer>
            <Link to="/expenses" className="link-item">
                <div className="footer-item">
                    <House size={18} />
                    <h2 className="footer-text">Home</h2>
                </div>
            </Link>
            <Link className="link-item" to="/dashboard">
                <div className="footer-item">
                    <LayoutDashboard size={18} />
                    <h2 className="footer-text">Dashboard</h2>
                </div>
            </Link>
            <Link to="/history" className="link-item">
                <div className="footer-item">
                    <History size={18} />
                    <h2 className="footer-text">History</h2>
                </div>
            </Link>
        </footer>
    )
}

export default Footer
