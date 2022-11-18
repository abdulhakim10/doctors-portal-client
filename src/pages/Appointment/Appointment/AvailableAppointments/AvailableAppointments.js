import React, { useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from './BookingModal';
import { useQuery } from '@tanstack/react-query';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);

    const {data: appointmentOption = []} = useQuery({
        queryKey: ['appointmentOptions'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/appointmentOptions')
            const data = await res.json()
            return data;
        }
    })

    return (
        <section className='my-16'>
            <p className='text-secondary text-center font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid mt-6 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOption.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;