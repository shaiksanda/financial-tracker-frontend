import { Link } from "react-router-dom";
import AddExpenseForm from "../AddExpenseForm";
import Logout from "../Logout";

import { LayoutDashboard, House, History, TramFront, X,UserPen } from "lucide-react";
import "./index.css"

const SideMenu = ({ openMenu, setOpenMenu }) => {
  return (
    <div className={`side-menu ${openMenu ? "show" : ""}`}>
      <h2 className="expense-heading">Menu</h2>
      <div>

        <Link to="/home" className="link-item">
          <div className="nav-item">
            <House size={18} />
            <h2 className="footer-text">Home</h2>
          </div>
        </Link>
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

        <Link to="/profile" className="link-item">
          <div className="nav-item">
            <UserPen size={18} />
            <h2 className="nav-text">Profile</h2>
          </div>
        </Link>

        <Logout />

      </div>

      <div className="cross-icon">
        <X color="red" size={40} onClick={() => setOpenMenu(false)} />
      </div>
    </div>
  )
}

export default SideMenu
