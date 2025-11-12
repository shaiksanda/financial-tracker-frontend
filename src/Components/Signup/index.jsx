import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation,Navigate } from "react-router-dom";
import { stagedTimers } from "../../fetchData";
import { useSignupUserMutation } from "../../services/api"
import PacmanLoader from "react-spinners/PacmanLoader";
import 'remixicon/fonts/remixicon.css';
import "./index.css"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [signupUser, { isLoading, isFetching }] = useSignupUserMutation();

  useEffect(() => {
    if (isLoading || isFetching) stagedTimers.start();
    else stagedTimers.stop();

    return () => {
      stagedTimers.stop();
    }
  }, [isLoading, isFetching, location.pathname]);


  const handleEmail = (e) => {
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

  const onSubmitSuccess = (data) => {
    console.log(data)
    setUsername("")
    setEmail("")
    setPassword("")
    Cookies.set("jwt_token", data.token, { expires: 5 })
    localStorage.setItem("user", JSON.stringify({
      username: data?.userDetails?.username,
      role: data?.userDetails?.role,
      avatar: data?.userDetails?.avatar
    }));
    toast.success(data.message)
    navigate("/expenses")
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!username || !email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be Atleast 6 Characters Long");
        return;
      }
      const res = await signupUser({ username, email, password }).unwrap()
      onSubmitSuccess(res)
    }
    catch (error) {
      toast.error(error?.data?.message);
    }
  }

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/expenses" />;
  }

  const isValid = email && username && password
  return (
    <div className="grid-container">
      <div className="img-container">
        <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1762740292/Screenshot_2025-11-10_073427_xkrq7n.png" alt="" />
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
          <button className="button signup-button" type='submit' disabled={isLoading || !isValid} style={{ width: "100%" }}>
            {isLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
              Processing...
              <PacmanLoader color="black" size={10} />
            </span>) : ("Signup")}
          </button>
        </div>
        <Link to="/login" className="link" style={{ color: 'orange' }}>Already Signup? Login</Link>
      </form>

    </div>
  )
}

export default Signup
