import MainHeader from "../MainHeader"
import Sidebar from "../Sidebar"

import "./index.css"

const Dashboard = () => {
  return (
    <div>
      <MainHeader />
      <Sidebar />
      <main className="main">
        <h2>Dashboard</h2>
        <h2>This section is still under development and will be available soon.</h2>
      </main>
    </div>
  )
}

export default Dashboard
