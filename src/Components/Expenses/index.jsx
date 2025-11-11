import "./index.css"

const Expenses = () => {
    const user=JSON.parse(localStorage.getItem("user"))
  return (
    <div>
      <h1>Expesnes Page</h1>
        <h1>UserName: {user.username}</h1>
        <h1>Role: {user.role}</h1>
        <img src={user.avatar} alt="" />
    </div>
  )
}

export default Expenses
