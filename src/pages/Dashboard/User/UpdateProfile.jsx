import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
    const { user, setLoading, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure()
    const { data: users = {}, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const { data: district = [] } = useQuery({
        queryKey: ['district'],
        queryFn: async () => {
            const res = await axiosPublic.get('/district')
            return res.data;
        }
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const selectedDistrict = watch('district');
    const selectedDistrictId = district.find(d => d.name === selectedDistrict)?.id;

    const { data: upazila = [] } = useQuery({
        queryKey: ['upazila', selectedDistrictId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upazila/${selectedDistrictId}`)
            return res.data;
        }

    });

    const onSubmit = async (data) => {
        let image = user?.photoURL; // Default to the existing image URL

        if (data.image?.length) {
            // If the user uploads a new image, process it
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                image = res.data.data.display_url; // Update the image URL
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to upload image",
                    text: "Please try again later.",
                });
                return; // Stop further processing if image upload fails
            }
        }

        // Proceed with updating user profile
        updateUserProfile(data.name, image).then(() => {
            const userInfo = {
                name: data.name,
                blood: data.blood,
                district: data.district,
                upazila: data.upazila,
            };
            axiosSecure.patch(`/users/${user.email}`, userInfo).then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Profile updated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    reset();
                    refetch();
                    setLoading(false);
                    navigate("/dashboard/userProfile");
                }
            });
        });
    };


    return (
        <div className="hero min-h-[calc(100vh-200px)]">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold">Update Your Profile</h1>
                </div>
                <div className="card card-body shrink-0 w-full shadow-2xl bg-base-100">
                    {users?.name ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control col-span-2">
                                <label className="label">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                {/* Show current profile image */}
                                {user?.photoURL && (
                                    <div className="mb-4">
                                        <img
                                            src={user.photoURL}
                                            alt="Current Profile"
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    </div>
                                )}
                                {/* Optional file upload */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    className="file-input w-full max-w-xs"
                                />
                                {errors.image && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.image.message}
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input defaultValue={users.name} type="text" placeholder="Name" className="input input-bordered" {...register("name")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select defaultValue={users?.blood || 'select please'} {...register("blood")} className="select select-bordered w-full">
                                    <option disabled value='default'>Select</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select defaultValue={users?.district || 'select please'} {...register("district")} className="select select-bordered w-full">
                                    <option disabled value='default'>Select</option>
                                    {
                                        district.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Subdistrict</span>
                                </label>
                                <select defaultValue={users?.upazila || 'select please'} {...register("upazila")} className="select select-bordered w-full">
                                    <option value='not selected'>Select</option>
                                    {
                                        upazila.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control mt-6 md:col-span-2">
                                <button className="btn btn-primary">Update Now</button>
                            </div>
                        </form>
                    )
                        : <div className="py-4 rounded shadow-md w-60 sm:w-96 animate-pulse dark:bg-gray-50 h-96">
                            <div className="flex p-4 space-x-4 sm:px-8">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-300"></div>
                                <div className="flex-1 py-2 space-y-4">
                                    <div className="w-full h-3 rounded dark:bg-gray-300"></div>
                                    <div className="w-5/6 h-3 rounded dark:bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 sm:px-8">
                                <div className="w-full h-4 rounded dark:bg-gray-300"></div>
                                <div className="w-full h-4 rounded dark:bg-gray-300"></div>
                                <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;