import { useState } from "react"
import { Link } from "react-router-dom";
import { SignupButton } from "../../styles"
import 'remixicon/fonts/remixicon.css';
import "./index.css"

const Singup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email,setEmail]=useState("")
  const [showPassword, setShowPassword] = useState(false)
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = () => { }
  return (
    <div className="grid-container">
      <div className="img-container">
        <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1732344145/WhatsApp_Image_2024-11-23_at_12.09.56_PM_bd450l.jpg" alt="" />
      </div>

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
            id="email"
            value={email}
            onChange={handleEmail}
            className="input-element"
            type="text"
            name="email"
            required
          />
          <label htmlFor="email" className="label">
            EMAIL
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
        <div style={{ textAlign: "center" }}>
          <SignupButton style={{width:"100%"}}>Singup</SignupButton>
        </div>
        <Link to="/login" className="link">Already Signup? Login</Link>
      </form>

    </div>
  )
}

export default Singup
