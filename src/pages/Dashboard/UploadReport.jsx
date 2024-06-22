import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UploadReport = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const testResult = {
            status: 'delivered',
            testReport: data.report
        }

        const testRep = await axiosSecure.patch(`/reservation/${id}`, testResult)
        if(testRep.data.modifiedCount > 0){
            reset();
            // success message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your test report has been submitted",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/reservation')
        }

    }

    return (
        <div>
            {/* <h2>Report: {id}</h2> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full mb-4">
                    <div className="label">
                        <span className="text-lg">Test Report*</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Submit your link here"
                        {...register("report", { required: true })}
                        className="input input-bordered w-full" />
                </label>
                <button className="btn">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadReport;