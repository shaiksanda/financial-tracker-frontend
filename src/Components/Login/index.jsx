import { useState } from "react"
import { Link } from "react-router-dom";
import { LoginButton } from "../../styles"
import 'remixicon/fonts/remixicon.css';
import "./index.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword,setShowPassword]=useState(false)
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleShowPassword=()=>{
    setShowPassword(!showPassword)
  }
  const handleSubmit = () => { }
  return (
    <div className="grid-container">

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            id="username"
            value={username}
            onChange={handleUsername}
            className="input-element"
            type="text"
            name="username"
            required
          />
          <label htmlFor="username" className="label">
            USERNAME
          </label>
        </div>
        <div className="input-wrapper">
          <input
            id="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="input-element"
            type={showPassword ? 'text' : 'password'}
            required
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          {showPassword ? (<i onClick={handleShowPassword} className="ri-eye-line eye"></i>) : (<i onClick={handleShowPassword} className="ri-eye-off-line eye"></i>)}
        </div>
        <div >
          <LoginButton style={{ width: "100%" }}>Login</LoginButton>
        </div>
        <Link to="/signup" className="link">Not Yet Signup? Sign up Here</Link>
        
      </form>
      <div className="img-container">
        <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1727266763/4957136_ym8bwt.jpg" alt="" />
      </div>
    </div>
  )
}

export default Login
