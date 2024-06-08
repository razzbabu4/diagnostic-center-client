import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";


const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/allTest'>All Test</Link></li>
        {
            user && isAdmin && <li><Link to='/dashboard'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard'>Dashboard</Link></li>
        }
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
        <li><Link to='/reviews'>Reviews</Link></li>
        
    </>
    return (
        <div>
            <div className="navbar lg:h-20 max-w-screen-xl mx-auto bg-opacity-30 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Health Quest</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end mr-4">
                    {
                        user ?
                            <>
                                <span>{user?.email} </span>
                                <Link className="bg-red-500 py-1 px-3 text-white rounded-md ml-2" onClick={logOut}>Logout</Link>
                            </>
                            :
                            <>
                                <Link className="bg-teal-500 py-1 px-3 text-white rounded-md" to='/login'>Login</Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;