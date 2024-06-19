import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const AddTest = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const { name, image, price, date, time, details, slots } = data;
        console.log(data)
        // now send the test item data to the server with image url
        const testItem = {
            name: name,
            image: image,
            price: parseFloat(price),
            date: date,
            time: time,
            details: details,
            slots: parseInt(slots),
            bookings: 0
        }
        const testRes = await axiosSecure.post('/tests', testItem)
        console.log(testRes.data)
        if (testRes.data.insertedId) {
            reset();
            // success message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your service has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Name*</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Test Name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Image URL*</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Image url"
                        {...register("image", { required: true })}
                        className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Price*</span>
                    </div>
                    <input
                        type="number"
                        placeholder="Price"
                        {...register("price", { required: true })}
                        className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Date*</span>
                    </div>
                    <input
                        type="date"
                        placeholder="Date"
                        {...register("date", { required: true })}
                        className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Time*</span>
                    </div>
                    <input
                        type="time"
                        placeholder="time"
                        {...register("time", { required: true })}
                        className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Slots*</span>
                    </div>
                    <input
                        type="number"
                        placeholder="Slots"
                        {...register("slots", { required: true })}
                        className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full md:col-span-2">
                    <div className="label">
                        <span className="label-text">Test Details*</span>
                    </div>
                    <textarea
                        className="textarea textarea-bordered"
                        placeholder="Banner Description"
                        {...register('details', { required: true })}
                    ></textarea>
                </label>
                <button className="btn md:col-span-2">
                    Add Test
                </button>
            </form>
        </div>
    );
};

export default AddTest;