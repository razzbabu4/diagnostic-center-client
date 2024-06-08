import useAuth from "../../../hooks/useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: users = {} } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    return (
        <div className="flex flex-col mx-auto max-w-lg justify-center p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
            <img src={user.photoURL} alt="profile" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
            <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">{user.displayName}</h2>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-600">{user.email}</p>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold sm:text-xl mt-4">Blood Group: {users.blood}</h2>
                    <h2 className="text-lg font-semibold sm:text-xl">District: {users.district}</h2>
                    <h2 className="text-lg font-semibold sm:text-xl">Upazila: {users.upazila}</h2>
                </div>
            </div>
            <Link to='/dashboard/updateProfile' className="btn mt-4 bg-teal-500 text-white border-none">Update</Link>
        </div>
    );
};

export default MyProfile;