import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const {user} = useContext(AuthContext);

    const { name, slots } = treatment;

    const date = format(selectedDate, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const pName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            patient: pName,
            slot,
            email,
            phone
        }

        // TODO: send data to the server
        // once data is saved then close the modal
        // and display success toast

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                toast.success('Booking Successfully Done');
                setTreatment(null);
                refetch();
            }
            else{
                setTreatment(null);
                toast.error(data.message);
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form
                        className='grid grid-cols-1 gap-4 mt-10'
                        onSubmit={handleBooking}
                    >
                        <input type="text" disabled value={date} className="input input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, idx) => <option
                                key={idx}
                                value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled className="input input-bordered w-full" required/>
                        <input name='email' type="text" defaultValue={user?.email} disabled className="input input-bordered w-full" required/>
                        <input name='phone' type="text" placeholder="Phone Number"  className="input input-bordered w-full" required/>
                        <input type="submit" className="input input-bordered w-full btn-accent" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;