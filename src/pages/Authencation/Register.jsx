import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [passErr, setPassErr] = useState('')
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const { email, password, confirm_password, name } = data;

        // password confirmation
        if (password !== confirm_password) {
            setPassErr("Password didn't match");
            return;
        } else {
            setPassErr('')
        }
        // img upload to imagebb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const image = res.data.data.display_url;
        createUser(email, password)
            .then((result) => {
                // Signed in 
                console.log(result.user)
                if (res.data.success) {
                    updateUserProfile(name, image)
                        .then(() => {
                            // user entry in database
                            const userInfo = {
                                name: name,
                                email: email,
                                // image: image,
                                blood: data.blood,
                                district: data.district,
                                upazila: data.upazila,
                                status: 'active'

                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('user added to the database')
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Profile created successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/')
                                        reset();
                                    }
                                })
                        });
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Email already in use or invalid",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold">Sign Up</h1>
                </div>
                <div className="card card-body shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" {...register("name")} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="" placeholder="password" className="input input-bordered" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/ })} />
                            {errors.password?.type === 'required' && <span>This field is required</span>}
                            {errors.password?.type === 'minLength' && <span>Password must be 6 character</span>}
                            {errors.password?.type === 'pattern' && <span>Password must be one uppercase, one lower case, one special character</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="" placeholder="password" className="input input-bordered" {...register("confirm_password", { required: true })} />
                            {errors.confirm_password && <span>This field is required</span>}
                            <p>{passErr}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select defaultValue='default' {...register("blood", { required: true })} className="select select-bordered w-full">
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
                            <select defaultValue='default' {...register("district", { required: true })} className="select select-bordered w-full">
                                <option disabled value='default'>Select</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Dhaka">Dhaka</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select defaultValue='default' {...register("upazila", { required: true })} className="select select-bordered w-full">
                                <option disabled value='default'>Select</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Dhaka">Dhaka</option>
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
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <p><small>Already registered? <Link to='/login'>Go to Login</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Register;