import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from 'react-router-dom'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';


const UpdateTest = () => {
    const { name, image, price, date, details, slots, _id } = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const { name, image, price, date, details, slots } = data;
        console.log(data)

        const testItem = {
            name: name,
            image: image,
            price: parseFloat(price),
            date: date,
            details: details,
            slots: parseInt(slots)
        }
        const testRes = await axiosSecure.put(`/tests/${_id}`, testItem)
        console.log(testRes.data)
        if (testRes.data.modifiedCount > 0) {
            reset();
            // success message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your test has been updated",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/manageTest')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Name*</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={name}
                        placeholder="Test Name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Image URL*</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={image}
                        placeholder="Image url"
                        {...register("image", { required: true })}
                        className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Price*</span>
                    </div>
                    <input
                        type="number"
                        defaultValue={price}
                        placeholder="Price"
                        {...register("price", { required: true })}
                        className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Date*</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={date}
                        placeholder="Date"
                        {...register("date", { required: true })}
                        className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Slots*</span>
                    </div>
                    <input
                        type="number"
                        defaultValue={slots}
                        placeholder="Slots"
                        {...register("slots", { required: true })}
                        className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Test Details*</span>
                    </div>
                    <textarea
                        className="textarea textarea-bordered"
                        defaultValue={details}
                        placeholder="Banner Description"
                        {...register('details', { required: true })}
                    ></textarea>
                </label>
                <button className="btn">
                    Update Test
                </button>
            </form>
        </div>
    );
};

export default UpdateTest;