import React from 'react';
import { format } from 'date-fns';

const AvailableAppointments = ({selectedDate}) => {
    return (
        <div className='mt-16'>
            <p className='text-secondary text-center font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
        </div>
    );
};

export default AvailableAppointments;