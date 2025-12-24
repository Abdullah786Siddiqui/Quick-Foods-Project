import { Link } from "react-router-dom"

const UserHome = () => {
  return (
    <>
      <div>User Home Page</div>
<Link
  to="/checkout"
  className="inline-block bg-red-500 text-white font-semibold px-6 py-2 rounded shadow-md hover:bg-red-600 transition-colors duration-300"
>
  Checkout
</Link>  

{/* <Link
  to="/login"
  className="inline-block bg-red-500 text-white font-semibold px-6 py-2 rounded shadow-md hover:bg-red-600 transition-colors duration-300"
>
  Login
</Link>    */}
 </>
  )
}

export default UserHome