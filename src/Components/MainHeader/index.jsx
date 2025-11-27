import { LogoImg, HeaderContainer } from "../../styles"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import SideMenu from "../SideMenu"
import { useState } from "react"
import "./index.css"

const MainHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  

  const user = JSON.parse(localStorage.getItem("user"))
  const { avatar } = user
  return (
    <>
    <HeaderContainer>
      <Link to="/home"><LogoImg src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1762663256/image_adgp0r.webp" alt="" /></Link>
      <Link to="/profile"><LogoImg src={avatar} alt="avatar" /></Link>
      <Menu onClick={() => setOpenMenu(true)} className="menu-item" />
    </HeaderContainer>
    <SideMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  )
}

export default MainHeader
