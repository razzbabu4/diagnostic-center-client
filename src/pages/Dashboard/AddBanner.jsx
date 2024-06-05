import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBanner = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        const { name, title, couponCode, couponRate, description} = data;
        console.log(data)
        // img upload to imagebb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            // now send the menu item data to the server with image url
            const bannerItem = {
                name: name,
                title: title,
                couponCode: couponCode,
                couponRate: couponRate,
                description: description,
                image: res.data.data.display_url,
                isActive: 'false'
            }
            const menuRes = await axiosSecure.post('/banners', bannerItem)
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                reset();
                // success message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Banner has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data)
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Name*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Banner Name"
                            {...register("name")}
                            className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Banner Title*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title", { required: true })}
                            className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Coupon Code*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            {...register("couponCode", { required: true })}
                            className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Coupon Rate*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Coupon Rate"
                            {...register("couponRate", { required: true })}
                            className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Banner Description*</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered"
                            placeholder="Banner Description"
                            {...register('description', { required: true })}
                        ></textarea>
                    </label>

                    <div className="mb-6">
                        <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn">
                        Add Banner
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBanner;