import Header from "../Header"
import { Link,Navigate } from "react-router-dom"
import { Main } from "../../styles"
import Cookies from "js-cookie"

import "./index.css"

const Home = () => {
  const token=Cookies.get("jwt_token")
  if (token){
    return <Navigate to="/expenses" />
  }
  return (
    <div>
      <Header />
      <Main>
        <div className="grid-container home-top-container">
          <div className="ul">
            <h1>Turn your spending into growth, not stress.</h1>
            <h1>Master your money, master your Life.</h1>
            <h1>Everyone earns money, but few know how to grow and protect it. When you hit rock bottom, only your savings and smart investments stand by you.</h1>
            <h1>What are you waiting for? Try our free platform and manage your finances effortlessly.</h1>
            <div >
              <Link to="/login"><button style={{width:"100%"}} className="button login-button">Login</button></Link>
            </div>
          </div>
          <div className="grid-container images">
            <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760348126/budget_img_vvi5xt.webp" alt="image" />
            <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760349409/budget_graph_ydt1rz.webp" alt="image" />
            <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760349782/Screenshot_2025-10-13_153229_k9rgot.webp" alt="image" />
            <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1760421170/expense_tracker_ik5yfv.webp" alt="image" />
          </div>
        </div>

      </Main>
    </div>
  )
}

export default Home
