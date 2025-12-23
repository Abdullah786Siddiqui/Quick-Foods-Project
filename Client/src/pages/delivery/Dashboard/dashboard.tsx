import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <div>Delivery Dashboard</div>
      <p>Sidebar</p>
      <main>
          <Outlet />
      </main>
    </>
  )
}

export default Dashboard