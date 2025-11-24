import { Link } from "react-router-dom";
import AddExpenseForm from "../AddExpenseForm";
import AddDeliveryForm from "../AddDeliveryForm";
import { ChartSpline,ChartNoAxesCombined,TramFront,X } from "lucide-react";
import "./index.css"

const SideMenu = ({ openMenu, setOpenMenu }) => {
  return (
    <div className={`side-menu ${openMenu ? "show" : ""}`}>
      <h2 className="expense-heading">Menu</h2>
      <div>
        <AddExpenseForm />
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
            <Link className="link-item" to="/product-tour">
                <div className="nav-item">
                    <TramFront size={18} />
                    <h2 className="nav-text">Product Tour</h2>
                </div>
            </Link>


      </div>

      <div className="cross-icon">
        <X color="red" size={40} onClick={() => setOpenMenu(false)}/>
      </div>
    </div>
  )
}

export default SideMenu
