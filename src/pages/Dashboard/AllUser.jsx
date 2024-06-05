import { FaUsers } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { ImBlocked } from "react-icons/im";
const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleBlockedUser = (user) => {
        console.log(user)
    }

    return (
        <div>
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
                                    {user.role === 'admin' ? <button className="btn btn-sm btn-disabled">Admin</button> : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm bg-orange-500">
                                        <FaUsers className="text-white"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                {user.status === 'blocked' ? <button className="btn btn-sm btn-disabled"><ImBlocked/></button> : user.role === 'admin'? <button className="btn btn-disabled btn-sm">Active</button> : <button
                                        onClick={() => handleBlockedUser(user)}
                                        className="btn btn-sm bg-orange-500">
                                        Active
                                    </button>}
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