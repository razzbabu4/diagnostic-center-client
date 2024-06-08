import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaCalendarDay, FaCheckToSlot } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';

const ViewDetailsTest = () => {
    const axiosPublic = useAxiosPublic();
    const {id} = useParams();
    const {data: test = {}} = useQuery({
        queryKey: ['test'],
        queryFn: async()=>{
            const res = await axiosPublic(`/tests/${id}`)
            return res.data;
        }
    })
    console.log(test)
    return (
        <div className='my-8'>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="p-6 lg:w-3/5" ><img className="rounded-lg" src={test.image} alt="test" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold">{test.name}</h2>
                    <span className="text-md font-bold mb-0">Description : {test.details}</span>
                    <div className="flex flex-col gap-8 my-6">
                        <div className="flex items-center gap-2 text-lg"><FaCalendarDay />Test Date: {test.date}</div>
                        <div className="flex items-center gap-2 text-lg"><FaDollarSign/>Estimate Price: ${test.price}</div>
                        <div className="flex items-center gap-2 text-lg"><FaCheckToSlot /> Available Slots: {test.slots}</div>
                    </div>
                    <div className="card-actions gap-6 items-end flex-grow">
                        <Link to='/' className="btn bg-[#1313134D]">Book Now</Link>
                        <Link to='/' className="btn bg-[#1313134D]">Go back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsTest;