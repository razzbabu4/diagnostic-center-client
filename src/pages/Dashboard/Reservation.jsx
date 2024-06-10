import {useQuery} from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Reservation = () => {
    const axiosSecure = useAxiosSecure();

    const {data: reservation = [], refetch} = useQuery({
        queryKey: ['reservation'],
        queryFn: async()=>{
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
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full overflow-x-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Test Name</th>
                        <th>Patient Email</th>
                        <th>Paid Price</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservation.map((reserve, index) => <tr key={reserve._id}>
                            <th>{index + 1}</th>
                            <td>{reserve.name}</td>
                            <td>{reserve.email}</td>
                            <td>${reserve.price}</td>
                            <td>{reserve.details}</td>
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
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Reservation;