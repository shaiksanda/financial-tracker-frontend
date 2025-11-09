import { HeaderContainer,LogoImg,LoginButton,SignupButton } from "../../styles"
import { Link } from "react-router-dom"
import "./index.css"

const Header = () => {
  return (
    <HeaderContainer>
      <LogoImg  src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1762663256/image_adgp0r.webp" alt="Logo-image" />
      <nav className="btns-container">
        <Link to="/login"><LoginButton>Login</LoginButton></Link>
        <Link to="/signup"><SignupButton>Signup</SignupButton></Link>
      </nav>
      
    </HeaderContainer>
  )
}

export default Header
