import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <div>Restaurant Dashboard</div>
            <p>sidebar</p>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Dashboard