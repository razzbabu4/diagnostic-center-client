import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaDownload } from 'react-icons/fa';

const TestResult = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reservation = [] } = useQuery({
        queryKey: ['reservation'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservation/${user.email}`)
            return res.data;
        }
    });
    const handleDownload = (url, testName, date) => {
        const isGoogleDriveLink = url.includes('drive.google.com');

        let downloadUrl = url;
        if (isGoogleDriveLink) {
            const fileIdMatch = url.match(/\/d\/(.+?)\//);
            if (fileIdMatch && fileIdMatch[1]) {
                const fileId = fileIdMatch[1];
                downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            } else {
                console.error("Invalid Google Drive URL");
                return;
            }
        }
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${testName}_${date}.pdf`;
        link.click();
    };
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full overflow-x-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Test Name</th>
                        <th>Paid Price</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Report</th>
                        <th>Save</th>
                    </tr>
                </thead>
                {
                    reservation.map((reserve, index) => <tbody key={reserve._id}>
                        {
                            reserve.status === 'delivered' ? <tr key={reserve._id}>
                                <th>{index + 1}</th>
                                <td>{reserve.name}</td>
                                <td>${reserve.price}</td>
                                <td>{reserve.date}</td>
                                <td>{reserve.time}</td>
                                <td>{reserve.status}</td>
                                <td>
                                    <a href={reserve.testReport} target="_blank" rel="noopener noreferrer" className='btn btn-sm'>
                                        View
                                    </a>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDownload(reserve.testReport, reserve.name, reserve.date)}
                                        className="btn bg-teal-500 text-white btn-sm"
                                    >
                                        <FaDownload/>
                                    </button>
                                </td>
                            </tr> :
                            <tr>
                                <td>No test result</td>
                            </tr>
                        }
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default TestResult;