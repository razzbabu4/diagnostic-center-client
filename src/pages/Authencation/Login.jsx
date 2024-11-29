import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const { signIn, googleLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const { email, password } = data;
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate('/dashboard/userProfile')
                navigate(location?.state ? location.state : '/dashboard/userProfile')
            })
            .catch(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Invalid email or password",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                if (result.user) {
                    navigate(location?.state || '/')
                }
            })
            .catch(error => {
                console.error(error.message)
            })
    }
    return (
        <div className="w-full max-w-xl p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 mx-auto">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-base text-center text-gray-400 dark:text-gray-600">Dont have account?
                <Link to='/register' rel="noopener noreferrer" className="text-white focus:underline hover:underline hover:text-blue-600"> Sign up</Link>
            </p>
            <div className="my-6 space-y-4">
                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 dark:border-gray-600 focus:ring-violet-400 focus:dark:ring-violet-600 hover:border-gray-300">
                    <FcGoogle className="text-2xl"></FcGoogle>
                    <p>Login with Google</p>
                </button>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full text-gray-400 dark:text-gray-600" />
                <p className="px-3 text-gray-400 dark:text-gray-600">OR</p>
                <hr className="w-full text-gray-400 dark:text-gray-600" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4 form-control">
                    <div className="space-y-2 form-control">
                        <label htmlFor="email" className="block text-sm">Email address</label>
                        <input type="email" placeholder="example@gmail.com" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400 focus:dark:border-violet-600" {...register("email", { required: true })} />
                        {errors.email && <span>Email is required</span>}
                    </div>
                    <div className="space-y-2 form-control">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <input type="password" placeholder="*******" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400 focus:dark:border-violet-600" {...register("password", { required: true })} />
                        {errors.password && <span>Password is required</span>}
                        <div className="flex justify-end">
                            <a rel="noopener noreferrer" href="#" className="text-sm hover:underline text-gray-400 dark:text-gray-600">Forgot password?</a>
                        </div>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-accent btn-outline text-lg">Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;