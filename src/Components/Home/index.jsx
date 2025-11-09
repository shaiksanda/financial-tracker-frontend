import Header from "../Header"
import { Link } from "react-router-dom"
import { Main,LoginButton,SignupButton } from "../../styles"
import "./index.css"

const Home = () => {
  return (
    <div>
      <Header />
      <Main>
        <div className="cards">
          <h1>Turn your spending into growth, not stress.</h1>
          <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760348126/budget_img_vvi5xt.webp" alt="" />
        </div>
        <div className="cards">
          <h1>Master your money, master your life.</h1>
          <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760349409/budget_graph_ydt1rz.webp" alt="" />
        </div>
        <div className="cards">
          <h1>Everyone earns money, but few know how to grow and protect it. When you hit rock bottom, only your savings and smart investments stand by you.</h1>
          <img class="where-money-goes-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760349608/Screenshot_2025-10-13_152556_1_wfqkln.webp" alt="" />
          <h1>What are you waiting for? Try our free platform and manage your finances effortlessly.</h1>
        </div>
        <nav className="btns-container">
          <Link to="/login"><LoginButton>Login</LoginButton></Link>
        </nav>
      </Main>
    </div>
  )
}

export default Home
