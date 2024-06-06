import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllBanner = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners')
            return res.data;
        }
    })
    const handleActiveBanner = (banner) => {
        axiosSecure.patch(`/banners/active/${banner._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${banner.name} banner is active now`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }

    const handleDelateBanner = (banner) => {
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
                axiosSecure.delete(`/banners/${banner._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
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
            {banners.length}
            <table className="table table-zebra w-full overflow-x-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        banners.map((banner, index) => <tr key={banner._id}>
                            <th>{index + 1}</th>
                            <td>{banner.name}</td>
                            <td>{banner.title}</td>
                            <td>{banner.description}</td>
                            <td>
                                {banner.isActive === 'false' ? <button
                                    onClick={() => handleActiveBanner(banner)}
                                    className="btn btn-sm bg-green-800 text-white">
                                    Activate
                                </button> : <button
                                    className="btn btn-sm btn-disabled text-white">
                                    Active
                                </button>}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelateBanner(banner)}
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

export default AllBanner;