import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

    // todo: get isAdmin data from database
    const isAdmin = true;
    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className="w-1/3 lg:w-64 min-h-screen bg-teal-600">
                <ul className="menu p-4 text-white">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'>
                                    Admin Home
                                </NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'>
                                    All Users
                                </NavLink></li>
                                <li><NavLink to='/dashboard/addBanner'>
                                    Add Banner
                                </NavLink></li>
                                <li><NavLink to='/dashboard/allBanner'>
                                    All Banner
                                </NavLink></li>
                                <li><NavLink to='/dashboard/addTest'>
                                    Add Test
                                </NavLink></li>
                                <li><NavLink to='/dashboard/manageTest'>
                                    Manage Test
                                </NavLink></li>
                                <li><NavLink to='/dashboard/reservation'>
                                    Reservation
                                </NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to='/dashboard/userProfile'>
                                    My Profile
                                </NavLink></li>
                                <li><NavLink to='/dashboard/appointment'>
                                    My Upcoming Appointment
                                </NavLink></li>
                                <li><NavLink to='/dashboard/testResult'>
                                    Test Result
                                </NavLink></li>
                            </>
                    }

                    <div className="divider"></div>

                    {/* shared menu */}
                    <li><NavLink to='/dashboard'>
                        Dashboard
                    </NavLink></li>
                    <li><NavLink to='/'>
                        Home
                    </NavLink></li>
                    <li><NavLink to='/allTest'>
                        All Test
                    </NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 border p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;