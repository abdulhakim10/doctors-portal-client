import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {logIn} = useContext(AuthContext);
    const [logInError, setLogInError] = useState('');
    const location  = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    
    const handleLogin = async(data) => {
        const email = data.email;
        const password = data.password;

        setLogInError('');

        await logIn(email, password)
        navigate(from, {replace: true})
        .catch(err => {
            console.log(err.message)
            setLogInError(err.message)
        })
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl font-bold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" 
                        {...register("email", {
                            required: 'Email Address is required'
                        })} 
                        className="input input-bordered w-full max-w-xs" 
                        />
                        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" 
                        {...register("password", {
                            required: 'Password is required',
                            minLength: {value: 6, message: 'Password must be 6 character or longer'}
                        })}  
                        className="input input-bordered w-full max-w-xs" 
                        />
                        {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    <input className='btn btn-accent w-full max-w-xs' value='Login' type="submit" />
                        <div>
                            {logInError && <p className="text-red-600">{logInError}</p> }
                        </div>
                </form>
                <p>New to Doctors Portal? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;