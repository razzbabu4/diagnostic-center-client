import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from "react-icons/fa";
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

    const handleUpdateTest = () =>{

    }

    const handleDelateTest = () => {
       

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
                                <button
                                    onClick={() => handleUpdateTest(test)}
                                    className="btn btn-sm bg-teal-500 text-white">
                                    <FaEdit />
                                </button>
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