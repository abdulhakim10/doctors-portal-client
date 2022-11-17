import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const Signup = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
   
    const handleSignUp = data => {
        console.log(data);
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl font-bold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text"
                        {...register('name', {
                            required: true
                        })}
                        className="input input-bordered w-full max-w-xs" 
                        />
                        {errors.name && <p className='text-red-600'>Name is required</p> }
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email"
                        {...register('email', {
                            required: 'Email is required'
                        })} 
                        className="input input-bordered w-full max-w-xs" 
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p> }
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {value: 6, message: 'Password must be 6 characters or longer'},
                            pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be strong'}
                        })}
                        className="input input-bordered w-full max-w-xs" 
                        />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p> }
                    </div>
                    <br />
                    <input className='btn btn-accent w-full max-w-xs' value='Sign Up' type="submit" />
                </form>
                <p>Have an account? Please go to <Link className='text-secondary' to='/login'>Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;