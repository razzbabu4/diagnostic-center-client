import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import icon from '../../../public/icons8-heart-with-pulse.gif'
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../hooks/useAxiosPublic";


const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const axiosPublic = useAxiosPublic();

    const { data: users = {}} = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    });
// console.log(users?.status)
    const navOptions = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allTest'>All Test</NavLink></li>
        {
            user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && <li>{
                users?.status === 'active' ? (
                    <NavLink to='/dashboard/userProfile'>Dashboard</NavLink>
                ) : (
                    <span style={{ cursor: 'not-allowed', color: 'gray' }}>Dashboard</span>
                )
            }</li>
        }
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/contact'>Contact Us</NavLink></li>
        <li><NavLink to='/reviews'>Reviews</NavLink></li>

    </>
    return (
        <div>
            <div className="navbar lg:h-20 max-w-screen-xl mx-auto text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><img className="h-10 w-10 hidden lg:flex" src={icon} alt="icon" /><span>Health Quest</span></a>
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