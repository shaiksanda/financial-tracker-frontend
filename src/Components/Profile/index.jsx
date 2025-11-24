import MainHeader from "../MainHeader"
import Skeleton from "@mui/material/Skeleton";
import Sidebar from "../Sidebar"
import { Pencil, Trash, LogOut, Mail } from "lucide-react"
import "./index.css"
import { toast } from "react-toastify"
import { useDeleteAccountMutation, useEditUserProfileMutation, useGetUserProfileQuery, useLogoutUserMutation } from "../../services/api"
import Popup from "reactjs-popup"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import PacmanLoader from "react-spinners/PacmanLoader";
import Footer from "../Footer"

const skeletons = [];

for (let i = 0; i < 3; i++) {
  skeletons.push(
    <div key={i}>
      <Skeleton variant="rectangular" width="100%" height={100} />
    </div>
  );
}


const Profile = () => {

  const { data, isLoading, isFetching } = useGetUserProfileQuery()
  const [editUserProfile, { isLoading: editLoading }] = useEditUserProfileMutation()
  const [deleteAccount] = useDeleteAccountMutation()
  const [logoutUser] = useLogoutUserMutation()
  const user = data?.user
  const finance = data?.finance



  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate()

  const handleLogout = async (close) => {
    try {
      await logoutUser()
      toast.success("Logged Out Successfully!")
      localStorage.removeItem("user")
      Cookies.remove("jwt_token")
      navigate("/");
    }
    catch (error) {
      toast.error(error?.date?.messge)
    }
    finally {
      close()
    }
  }

  const handleDeleteAccount = async (id, close) => {
    try {
      await deleteAccount(id).unwrap()
      toast.success("Account Deleted Permanently!")
      navigate("/")
    }
    catch (error) {
      toast.error(error?.data?.message)
    }
    finally {
      close()
    }
  }

  const handleSubmit = async (e, close) => {
    e.preventDefault()
    try {
      let { username, email } = formData
      await editUserProfile({ username, email }).unwrap()
      toast.success("User profile Updated Successfully!")
    }
    catch (error) {
      toast.error(error?.data?.message)
    }
    finally {
      close()
    }
  }

  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main">
        {(isLoading || isFetching) ? (<div>
          <h2 className="wait-msg">Please wait… loading your data.</h2>
          <div className="grid-expense-container">
            {skeletons}
          </div>
        </div>) : (
          <div className="profile-layout">
            <section>
              <article className="flex-container">
                <h2>Username: </h2>
                <h2>{user?.username.toUpperCase()}</h2>
              </article>
              <article className="flex-container">
                <Mail />
                <h4>{user?.email}</h4>
              </article>
              <article className="flex-container">
                <h3>My Debut:</h3>
                <h3>{new Date(user?.createdAt).toDateString()}</h3>
              </article>
              <article className="flex-container">
                <h4>Your ID: </h4>
                <h4>{user?.userId}</h4>
              </article>
            </section>
            <section>
              <Popup
                contentStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '400px',
                }}
                modal trigger={<article className="flex-container">
                  <Pencil />
                  <h2>Edit Profile</h2>
                </article>}>
                {(close) => (
                  <form onSubmit={(e) => handleSubmit(e, close)} className="popup">
                    <h2 style={{ textAlign: 'center' }}>Update Profile</h2>
                    <div className="input-wrapper">
                      <input name="username" value={formData.username} onChange={handleChange} required className="input-element" id="newUserName" type="text" />
                      <label className="label" htmlFor="newUserName">Username</label>
                    </div>
                    <div className="input-wrapper">
                      <input name="email" value={formData.email} onChange={handleChange} required className="input-element" id="newEmail" type="text" />
                      <label className="label" htmlFor="newEmail">Email</label>
                    </div>
                    <div className="btns">
                      <button disabled={editLoading} style={{ width: "100%" }} className="button login-button" type="submit">
                        {editLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                          Processing...
                          <PacmanLoader color="black" size={10} />
                        </span>) : ("Update Profile")}
                      </button>
                      <button className="btn confirm-btn" onClick={close}>Cancel</button>
                    </div>
                  </form>
                )}
              </Popup>
              <Popup
                contentStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '400px',
                }} modal trigger={<article className="flex-container">
                  <Trash />
                  <h2>Delete Account</h2>
                </article>}>
                {(close) => (
                  <div className="popup">
                    <h2>Are you sure you want to Delete Account? This action cannot be undone.</h2>
                    <div className="btns">
                      <button onClick={() => handleDeleteAccount(user?.userId, close)} className="btn confirm-btn">Confirm</button>
                      <button onClick={close} className="btn cancel-btn">Cancel</button>
                    </div>
                  </div>
                )}
              </Popup>
              <Popup
                contentStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '400px',
                }} modal trigger={<article className="flex-container">
                  <LogOut />
                  <h2>Logout</h2>
                </article>}>
                {(close) => (
                  <div className="popup">
                    <h2>Are you sure you want to Logout? This action cannot be undone.</h2>
                    <div className="btns">
                      <button onClick={() => handleLogout(close)} className="btn confirm-btn">Confirm</button>
                      <button onClick={close} className="btn cancel-btn">Cancel</button>
                    </div>
                  </div>
                )}
              </Popup>
            </section>
            <section>
              <article className="flex-container">
                <h2>Total Expenses</h2>
                <h2>{finance?.expenses}/-</h2>
              </article>
              <article className="flex-container">
                <h3>Income</h3>
                <h3>{finance?.income}/-</h3>
              </article>
              <article className="flex-container">
                <h3>Total Savings</h3>
                <h3>{finance?.savings}/-</h3>
              </article>
              <article className="flex-container">
                <h3>Top Spending: {finance?.topCategory?.total}/-, Category: {finance?.topCategory?.category}</h3>
              </article>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Profile
