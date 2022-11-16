import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import doctor from '../../../assets/images/doctor.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <div className="hero"
        style={{
            backgroundImage: `url(${appointment})`
        }}
        >
            <div className="hero-content flex-col lg:flex-row mt-12">
                <img src={doctor} alt='' className="-mt-40 hidden md:block lg:w-1/2 rounded-lg " />
                <div className='text-white'>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Appointment</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;