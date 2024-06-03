import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const NavBar = () => {
    const {user, logOut} = useAuth()
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/salad'>Our Shop</Link></li>
        <li><Link to='/secret'>Secret</Link></li>
        {/* {
        user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
    }
    {
        user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
    } */}
        {/* <li>
        <Link to='/dashboard/cart'>
            <button className="flex gap-2 items-center">
                <FaCartShopping></FaCartShopping>
                <div className="badge badge-secondary text-white">+{cart.length}</div>
            </button>
        </Link>
    </li>
     */}
    </>
    return (
        <div>
            <div className="navbar fixed z-10 max-w-screen-xl mx-auto bg-opacity-30 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end mr-4">
                    {
                        user ?
                            <><button onClick={logOut} className="">Logout</button></>
                            :
                            <><Link to='/login'>Login</Link></>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;