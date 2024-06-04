import { FaUsers } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllUser = () => {
    const axiosPublic = useAxiosPublic();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        console.log(user)
    }
    const handleDeleteItem = (user) => {
        console.log(user)
    }

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl ">All Users</h2>
                <h2 className="text-3xl ">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm bg-orange-500">
                                        <FaUsers className="text-white"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteItem(user)}
                                        className="btn btn-sm bg-red-500">
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;