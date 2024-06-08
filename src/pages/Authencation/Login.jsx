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
                navigate(location?.state ? location.state : '/')
            })
            .catch(()=>{
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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card card-body shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                            {errors.password && <span>This field is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <button onClick={handleGoogleLogin} className="btn btn-block"><FcGoogle className="text-2xl"></FcGoogle> Google</button>
                    </div>
                    <p><small>New here? <Link to='/register'>Create an account</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Login;