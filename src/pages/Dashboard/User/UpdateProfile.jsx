import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
    const {user, setLoading, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const axiosSecure = useAxiosSecure()
    const { data: users = {} } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const {data: district = []} = useQuery({
        queryKey: ['district'],
        queryFn: async() =>{
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

     const {data: upazila = []} = useQuery({
        queryKey: ['upazila', selectedDistrictId],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/upazila/${selectedDistrictId}`)
            return res.data;
        }

    });

    const onSubmit = async (data) => {
        console.log(data);

        // img upload to imagebb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const image = res.data.data.display_url;
         if (res.data.success) {
                    updateUserProfile(data.name, image)
                        .then(() => {
                            // user entry in database
                            const userInfo = {
                                name: data.name,
                                blood: data.blood,
                                district: data.district,
                                upazila: data.upazila,
                            }
                            axiosSecure.patch(`/users/${user.email}`, userInfo)
                                .then(res => {
                                    if (res.data.modifiedCount > 0) {
                                        console.log('user added to the database')
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Profile updated successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        reset();
                                        setLoading(false)
                                    }
                                })
                        });
                }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold">Update Your Profile</h1>
                </div>
                <div className="card card-body shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <select defaultValue={users.blood} {...register("blood")} className="select select-bordered w-full">
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
                            <select defaultValue={users.district} {...register("district")} className="select select-bordered w-full">
                                <option disabled value='default'>Select</option>
                                {
                                    district.map(item=> <option key={item._id} value={item.name}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select defaultValue={users.upazila} {...register("upazila")} className="select select-bordered w-full">
                                <option disabled value='default'>Select</option>
                                {
                                    upazila.map(item=> <option key={item._id} value={item.name}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Image</span>
                            </label>
                            <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs" />
                            {errors.image && <span>This field is required</span>}
                        </div>
                        <div className="form-control mt-6 md:col-span-2">
                            <button className="btn btn-primary">Update Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;