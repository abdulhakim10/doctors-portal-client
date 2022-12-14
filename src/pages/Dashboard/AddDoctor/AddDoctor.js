import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey)
    const navigate = useNavigate();

    const {data: specialties, isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url =`https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            // console.log(imgData.data.url)
            if(imgData.success){
                console.log(imgData.data.url)
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }

                // save doctor information to the database
                fetch('http://localhost:5000/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result => {
                    // console.log(result)
                    toast.success(`${data.name} is added successfully`)
                    navigate('/dashboard/managedoctors')
                })
            }
        })
    }

    return (
        <div>
            <h2 className="text-4xl">Add A New Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text"
                        {...register('name', {
                            required: true
                        })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && <p className='text-red-600'>Name is required</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email"
                        {...register('email', {
                            required: 'Email is required'
                        })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select 
                    {...register('specialty')}
                    className="select select-bordered w-full max-w-xs">
                        {
                            specialties?.map(specialty => <option
                            key={specialty._id}
                            value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type="file"
                        {...register('image', {
                            required: true
                        })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.image && <p className='text-red-600'>Photo is required</p>}
                </div>
                <br />

                <input className='btn btn-accent w-full max-w-xs' value='Add Doctor' type="submit" />
                <div>

                </div>
            </form>
        </div>
    );
};

/**
 * Three places to store your images
 * 1. Third party Image hosting server (they optimize your images and save their server)
 * 2. File: system of your server(usually you do not optimize image when u save it)
 * 3. mongodb database(not enough space)
 */

export default AddDoctor;