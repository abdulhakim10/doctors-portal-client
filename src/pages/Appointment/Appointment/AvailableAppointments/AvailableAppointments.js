import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { data } from 'autoprefixer';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({selectedDate}) => {
    const [appointmentOption, setAppointmentOption] = useState([]);

    useEffect(() => {
        fetch('appointmentOptions.json')
        .then(res => res.json())
        .then(data => setAppointmentOption(data))
    },[])
    return (
        <div className='my-16'>
            <p className='text-secondary text-center font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid mt-6 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOption.map(option => <AppointmentOption
                    key={option._id}
                    appointmentOption={option}
                    ></AppointmentOption>)
                }
            </div>
        </div>
    );
};

export default AvailableAppointments;