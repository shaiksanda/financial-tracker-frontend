import { LogoImg, HeaderContainer } from "../../styles"
import { Link } from "react-router-dom"
import { Menu, BanknoteArrowDown, BanknoteArrowUp, HandCoins,  } from "lucide-react"
import SideMenu from "../SideMenu"
import { useState } from "react"
import { useGetHeaderSummaryQuery } from "../../services/expenseApi"
import "./index.css"
import PacmanLoader from "react-spinners/PacmanLoader";

const MainHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);


  const user = JSON.parse(localStorage.getItem("user"))
  const { data, isLoading, isFetching } = useGetHeaderSummaryQuery()
  const { totalExpenses, totalIncome, totalSavings } = data || []
  return (
    <>
      <HeaderContainer>
        <Link to="/home"><LogoImg src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1762663256/image_adgp0r.webp" alt="" /></Link>
        {(isLoading || isFetching) ? (<div className="loader-container"><PacmanLoader color="orange" /> </div>) : (<>
          <h6 className="icon-heading expense"><BanknoteArrowDown /> {totalExpenses}</h6>
          <h6 className="icon-heading income"><BanknoteArrowUp />{totalIncome}</h6>
          <h6 className="icon-heading savings"><HandCoins /> {totalSavings}</h6>
        </>)}
        <Menu onClick={() => setOpenMenu(true)} className="menu-item" />
      </HeaderContainer>
      <SideMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  )
}

export default MainHeader
