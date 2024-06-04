import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const NavBar = () => {
    const { user, logOut } = useAuth()
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/allTest'>All Test</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
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
                            <>
                                <div>
                                    <div className="btn btn-ghost btn-circle avatar relative group">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} />
                                        </div>
                                        <span className="text-black bg-gray-100 p-3 rounded-lg absolute right-12 opacity-0 group-hover:opacity-70">
                                            <div className="flex flex-col gap-2">
                                                {user.displayName || 'Unknown'}
                                                <Link className="bg-red-500 p-2 text-white rounded-md" onClick={logOut}>Logout</Link>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </>
                            :
                            <><Link to='/login'>Login</Link></>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;