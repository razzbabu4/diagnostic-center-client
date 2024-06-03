import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card card-body shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" {...register("name")} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text" placeholder="image" className="input input-bordered" {...register("photo")} />
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <p><small>Already registered? <Link to='/login'>Go to log in</Link></small></p>
                    {/* <SocialLogin></SocialLogin> */}
                </div>
            </div>
        </div>
    );
};

export default Register;