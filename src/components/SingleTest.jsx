import { FaCalendarDay, FaClock, FaDollarSign } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { Link } from "react-router-dom";


const SingleTest = ({test}) => {
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl border ">
            <div className="relative">
                <figure><img className="h-72 w-full" src={test.image} alt="service" /></figure>
                <div className="absolute text-white bg-black font-medium p-3 rounded-tl-xl bg-opacity-50 bottom-0 right-0 flex items-center gap-2">
                    <FaDollarSign/> {test.price}
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{test.name}</h2>
                <span className="font-bold text-gray-400">{test.details}</span>
                <div className="flex justify-between my-4">
                    <span className="flex items-center gap-2 text-lg"><FaCheckToSlot/> {test.slots}</span>
                    <span className="flex items-center gap-2 text-lg"><FaCalendarDay/> {test.date}</span>
                    <span className="flex items-center gap-2 text-lg"><FaClock/> {test.time}</span>
                </div>
                <div className="card-actions">
                    <Link to={`/viewDetailsTest/${test._id}`} className="btn border-none w-full btn-outline bg-teal-500 text-white">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default SingleTest;