import { FaUsers } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { ImBlocked } from "react-icons/im";
import { useRef, useState } from "react";
const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const modalRef = useRef(null);

    const { data: user = [], refetch, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    if(isLoading){
        <span>Loading.........</span>
    }

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
        axiosSecure.patch(`/users/blocked/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is blocked!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleSeeInfo = (user) => {
        setSelectedUser(user);
        modalRef.current.showModal();
    };

    const handleCloseModal = () => {
        modalRef.current.close();
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full overflow-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? <button className="btn btn-sm btn-disabled">Admin</button> : user.status === 'blocked' ? <button className="btn btn-disabled btn-sm bg-green-800 text-white"><FaUsers className="text-white"></FaUsers></button> : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm bg-green-800 text-white">
                                        <FaUsers className="text-white text-lg"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    {user.status === 'blocked' ? <button className="btn btn-sm btn-disabled"><ImBlocked /></button> : user.role === 'admin' ? <button className="btn btn-disabled btn-sm">Block</button> : <button
                                        onClick={() => handleBlockedUser(user)}
                                        className="btn btn-sm bg-red-500 text-white">
                                        Block
                                    </button>}
                                </td>
                                <td>
                                    <button className="btn btn-sm bg-teal-500 text-white" onClick={() => handleSeeInfo(user)}>
                                        See Info
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {/* user info modal */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">User Information</h3>
                        {selectedUser && (
                            <>
                                <p>ID: {selectedUser._id}</p>
                                <p>Name: {selectedUser.name}</p>
                                <p>Email: {selectedUser.email}</p>
                                <p>Blood: {selectedUser.blood}</p>
                                <p>District: {selectedUser.district}</p>
                                <p>Upazila: {selectedUser.upazila}</p>
                                <p>Status: {selectedUser.status}</p>
                            </>
                        )}
                        <div className="modal-action">
                            <button className="btn" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AllUser;