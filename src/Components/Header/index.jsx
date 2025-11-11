import { HeaderContainer,LogoImg} from "../../styles"
import { Link } from "react-router-dom"
import "./index.css"

const Header = () => {
  return (
    <HeaderContainer>
      <LogoImg  src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1762663256/image_adgp0r.webp" alt="Logo-image" />
      <nav className="btns-container">
        <Link to="/login"><button className="button login-button">Login</button></Link>
        <Link to="/signup"><button className="button signup-button">Signup</button></Link>
      </nav>
      
    </HeaderContainer>
  )
}

export default Header
