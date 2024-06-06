import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const AllBanner = () => {
    const axiosSecure = useAxiosSecure();

    const { data: banners = [] } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners')
            return res.data;
        }
    })
    const handleActiveBanner = () => {

    }
    const handleDeactiveBanner = () => {

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
                                {banner.isActive === 'true' ? <button
                                    onClick={() => handleActiveBanner(banner)}
                                    className="btn btn-sm bg-green-800 text-white">
                                    Activate
                                </button> : <button
                                    onClick={() => handleDeactiveBanner(banner)}
                                    className="btn btn-sm bg-red-500 text-white">
                                    Deactivate
                                </button>}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBanner;