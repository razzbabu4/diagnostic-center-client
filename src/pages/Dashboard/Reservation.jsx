import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';

const Reservation = () => {
    const axiosSecure = useAxiosSecure();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const { data: reservation = [], refetch } = useQuery({
        queryKey: ['reservation'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservation`)
            return res.data;
        }
    });

    const handleDelateReserve = (reserve) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reservation/${reserve._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Canceled!",
                                text: "Your reserve has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handleSearch = async () => {
        const res = await axiosSecure.get(`/reservation/${searchValue}`)
        setSearchResult(res.data)
    }
    const displayedReservation = searchResult.length > 0 ? searchResult : reservation;
    return (
        <div>
            <div className="flex gap-2 my-6">
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="email"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        placeholder="Patients Email"
                    />
                </label>
                <button onClick={handleSearch} className="btn btn-accent">Search</button>
            </div>
            <table className="table table-zebra w-full overflow-x-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Test Name</th>
                        <th>Patient Email</th>
                        <th>Paid Price</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Cancel</th>
                        <th>Report</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayedReservation.map((reserve, index) => <tr key={reserve._id}>
                            <th>{index + 1}</th>
                            <td>{reserve.name}</td>
                            <td>{reserve.email}</td>
                            <td>${reserve.price}</td>
                            <td>{reserve.date}</td>
                            <td>{reserve.time}</td>
                            <td>{reserve.status}</td>
                            <td>
                                <button
                                    onClick={() => handleDelateReserve(reserve)}
                                    className="btn btn-sm bg-red-500 text-white">
                                    Cancel
                                </button>
                            </td>
                            <td>
                                <Link to={`/dashboard/uploadReport/${reserve._id}`}>
                                    <button className='btn btn-sm bg-teal-500 text-white'><FaUpload/></button>
                                </Link>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Reservation;