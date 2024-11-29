import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import Swal from 'sweetalert2';
import icon from '../../../public/icons8-heart-with-pulse.gif'

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [passErr, setPassErr] = useState('')
    const navigate = useNavigate();

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
        < section className="bg-white dark:bg-gray-900" >
            <div className="lg:grid lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt="registration banner"
                        src="https://img.freepik.com/vetores-premium/desenhos-animados-medicos-de-saude_24640-41199.jpg"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <img src={icon} alt="logo" />
                        </a>

                        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Health Quest
                        </h2>

                        <p className="mt-4 leading-relaxed text-white text-lg">
                            Health Quest is a comprehensive diagnostic center management solution designed to streamline appointments, securely handle payments, and provide easy access to patient records and test results. Enhance efficiency and deliver exceptional care with our user-friendly platform.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
                                href="#"
                            >
                                <img className='rounded-full' src={icon} alt="" />
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                Welcome to Health Quest
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Health Quest streamlines appointments, payments, and patient records, enhancing efficiency for diagnostic centers.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                            {/* form input start */}
                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-4 input input-bordered" {...register("name")} />
                            </div>

                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-4 input input-bordered" {...register("email", { required: true })} />
                                {errors.email && <span>Email is required</span>}
                            </div>

                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select defaultValue='default' {...register("district", { required: true })} className="select select-bordered w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                    <option disabled value='default'>Select</option>
                                    {
                                        district.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Subdistrict</span>
                                </label>
                                <select defaultValue='default' {...register("upazila", { required: true })} className="select select-bordered w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                    <option disabled value='default'>Select</option>
                                    {
                                        upazila.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>

                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select defaultValue='default' {...register("blood", { required: true })} className="select select-bordered w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
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
                                {errors.blood && <span>Profile image is required</span>}
                            </div>
                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs" />
                                {errors.image && <span>Profile image is required</span>}
                            </div>

                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-4 input input-bordered" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/ })} />
                                {errors.password?.type === 'required' && <span>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span>Password must be 6 character</span>}
                                {errors.password?.type === 'pattern' && <span>Password must be one uppercase, one lower case, one special character</span>}
                            </div>

                            <div className="form-control col-span-6 sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="password" className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-4 input input-bordered" {...register("confirm_password", { required: true })} />
                                {errors.confirm_password && <span>Please confirm your password</span>}
                                <p>{passErr}</p>
                            </div>
                            {/* form input end */}
                            <div className="col-span-6">
                                <label htmlFor="MarketingAccept" className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        id="MarketingAccept"
                                        name="marketing_accept"
                                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                                    />

                                    <span className="text-sm text-gray-700 dark:text-gray-200">
                                        I want to receive emails about events, test updates and company announcements.
                                    </span>
                                </label>
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline dark:text-gray-200 mx-1">
                                        terms and conditions
                                    </a>
                                    and
                                    <a href="#" className="text-gray-700 underline dark:text-gray-200 ml-1">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="form-control btn btn-primary btn-outline text-lg"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                    Already have an account?
                                    <Link to='/login' className="text-gray-700 dark:text-gray-200 ml-2 hover:underline hover:text-blue-600 text-base">Log in</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section >
    );
};

export default Register;