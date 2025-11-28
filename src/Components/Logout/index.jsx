import Popup from "reactjs-popup"
import { toast } from "react-toastify"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useLogoutUserMutation } from "../../services/api"
const Logout = () => {
    const [logoutUser]=useLogoutUserMutation()
    const navigate=useNavigate()
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
    return (
        <div className="nav-item">
            <Popup
                contentStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '400px',
                }} modal trigger={<article className="flex-container">
                    <LogOut />
                    <h2 className="nav-text">Logout</h2>
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
        </div>
    )
}

export default Logout
