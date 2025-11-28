import MainHeader from "../MainHeader"
import Skeleton from "@mui/material/Skeleton";
import Sidebar from "../Sidebar"
import { Pencil, Trash } from "lucide-react"
import "./index.css"
import { toast } from "react-toastify"
import { useDeleteAccountMutation, useEditUserProfileMutation, useGetUserProfileQuery } from "../../services/api"
import Popup from "reactjs-popup"

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
  const user = data?.user
  const finance = data?.finance
  const delivery = data?.delivery



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
          <div className="loader-container"><PacmanLoader color="green" /> </div>
        </div>) : (
          <div>
            <section>
              <article>
                <h2 className="heading">Username: {user?.username.toUpperCase()}</h2>
              </article>
              <article>
                <h4 className="heading email">Email: {user?.email}</h4>
              </article>
              <article>
                <h3 className="heading">My Debut:{new Date(user?.createdAt).toDateString()}</h3>
              </article>
              <article>

                <h4 className="heading">Id: {user?.userId}</h4>
              </article>
            </section>
            <h2 className="expense-heading">Finance Summary</h2>
            <section className="cards">
              <article className="card">
                <h2>Total Expenses:{finance?.totalExpenses}/-</h2>
              </article>
              <article className="card">
                <h3>Total Income: {finance?.totalIncome}/-</h3>
              </article>
              <article className="card">

                <h3>Total Savings: {finance?.totalSavings}/-</h3>
              </article>

            </section>
            <h2 className="expense-heading">Delivery Summary</h2>
            <section className="cards">
              <article className="card">

                <h2>Total Trips: {delivery?.totalTrips}/-</h2>
              </article>
              <article className="card">

                <h3>Total Distance Travelled: {delivery?.totalKms}Km/-</h3>
              </article>
              <article className="card">

                <h3>Total Earnings: {delivery?.totalEarnings}/-</h3>
              </article>
              <article className="card">

                <h3>Total Petrol Cost{delivery?.totalPetrolCost}/-</h3>
              </article>


            </section>
            <section className="btns">
              <Popup
                contentStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '400px',
                }}
                modal trigger={
                  <button className="button edit-btn"><Pencil />
                    Edit Profile</button>
                }>
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
                }} modal trigger={
                  <button className="button delete-account-btn"><Trash />
                    Delete Account</button>
                }>
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

            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Profile
