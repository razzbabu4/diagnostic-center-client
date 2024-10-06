import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { FaCalendar, FaHome, FaInfo, FaNotesMedical, FaUser, FaUsers } from 'react-icons/fa';
import { MdOutlineNoteAdd } from 'react-icons/md';
import { LuReplaceAll } from 'react-icons/lu';
import { GrDocumentTest } from 'react-icons/gr';
import { GiHypodermicTest } from 'react-icons/gi';
import { FaBookBookmark, FaMessage } from 'react-icons/fa6';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className='flex min-h-screen'>
            {/* dashboard sidebar */}
            <div className="w-2/5 lg:w-64 min-h-screen bg-teal-600">
                <ul className="menu p-4 text-white">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'>
                                   <FaHome className='text-lg'/> Admin Home
                                </NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'>
                                   <FaUsers className='text-lg'/> All Users
                                </NavLink></li>
                                <li><NavLink to='/dashboard/addBanner'>
                                <MdOutlineNoteAdd className='text-lg'/> Add Banner
                                </NavLink></li>
                                <li><NavLink to='/dashboard/allBanner'>
                                <LuReplaceAll className='text-lg'/> All Banner
                                </NavLink></li>
                                <li><NavLink to='/dashboard/addTest'>
                                <GiHypodermicTest className='text-lg' /> Add Test
                                </NavLink></li>
                                <li><NavLink to='/dashboard/manageTest'>
                                <GrDocumentTest className='text-lg'/> All Test
                                </NavLink></li>
                                <li><NavLink to='/dashboard/reservation'>
                                  <FaBookBookmark className='text-lg'/> Reservation
                                </NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to='/dashboard/userProfile'>
                                  <FaUser className='text-lg'/>  My Profile
                                </NavLink></li>
                                <li><NavLink to='/dashboard/appointment'>
                                   <FaCalendar className='text-lg' /> My Appointment
                                </NavLink></li>
                                <li><NavLink to='/dashboard/testResult'>
                                <GrDocumentTest className='text-lg'/> Test Result
                                </NavLink></li>
                            </>
                    }

                    <div className="divider"></div>

                    {/* shared menu */}
                    <li><NavLink to='/'>
                    <FaHome className='text-lg'/> Home
                    </NavLink></li>
                    <li><NavLink to='/allTest'>
                    <GrDocumentTest className='text-lg'/> All Test
                    </NavLink></li>
                    <li><NavLink to='/about'>
                    <FaInfo className='text-lg'/> About
                    </NavLink></li>
                    <li><NavLink to='/contact'>
                    <FaMessage className='text-md'/> Contact Us 
                    </NavLink></li>
                    <li><NavLink to='/reviews'>
                    <FaNotesMedical className='text-lg'/> Reviews 
                    </NavLink></li>
                </ul>
            </div>

            {/* dashboard content */}
            <div className='flex-1 p-8 min-h-screen'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;