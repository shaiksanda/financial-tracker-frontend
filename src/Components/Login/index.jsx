import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { Link, useNavigate, Navigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import { stagedTimers } from "../../fetchData";
import "./index.css"
import { useLoginUserMutation } from "../../services/authApi";
import { toast } from "react-toastify";
import PacmanLoader from "react-spinners/PacmanLoader";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()


  const [loginUser, { isLoading, isFetching }] = useLoginUserMutation()

  useEffect(() => {
    if (isLoading || isFetching) stagedTimers.start();
    else stagedTimers.stop();

    return () => {
      stagedTimers.stop();
    }
  }, [isLoading, isFetching])

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
    Cookies.set('jwt_token', data.token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify({
      username: data?.userDetails?.username,
      role: data?.userDetails?.role,
      avatar: data?.userDetails?.avatar
    }));
    toast.success(data.message)
    navigate("/home")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error('Please fill in both fields.');
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const userDetails = { username, password };

    try {
      const res = await loginUser(userDetails).unwrap()
      onSubmitSuccess(res)
    }
    catch (error) {
      toast.error(error?.data?.message)
    }

  }

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/home" />;
  }

  const isValid = username && password
  return (
    <div className="grid-container">


      <div className="img-container">
        <img src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1727266763/4957136_ym8bwt.jpg" alt="" />
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
        <div style={{ textAlign: 'center' }} >
          <button className="button login-button" type='submit' disabled={isLoading || !isValid} style={{ width: "100%" }}>
            {isLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
              Processing...
              <PacmanLoader color="black" size={10} />
            </span>) : ("Login")}
          </button>
        </div>
        <Link to="/signup" className="link">Not Yet Signup? Sign up Here</Link>

      </form>
    </div>
  )
}

export default Login
