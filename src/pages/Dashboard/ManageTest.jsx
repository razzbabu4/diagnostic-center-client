import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


const ManageTest = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: tests = [], refetch } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data;
        }
    });

    const handleDelateTest = (test) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tests/${test._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your test has been deleted.",
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
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Slots</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tests.map((test, index) => <tr key={test._id}>
                            <th>{index + 1}</th>
                            <td>{test.name}</td>
                            <td>$ {test.price}</td>
                            <td>{test.details}</td>
                            <td>{test.date}</td>
                            <td>{test.slots}</td>
                            <td>
                            <Link to={`/dashboard/updateTest/${test._id}`}>
                                        <button
                                            className="btn btn-sm bg-orange-500">
                                            <FaEdit className="text-white"></FaEdit>
                                        </button>
                                    </Link>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelateTest(test)}
                                    className="btn btn-sm bg-red-500 text-white">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageTest;