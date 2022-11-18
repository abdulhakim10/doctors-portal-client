import React from 'react';
import { format } from 'date-fns';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
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
            treatment: name,
            patient: pName,
            slot,
            email,
            phone
        }

        // TODO: send data to the server
        // once data is saved then close the modal
        // and display success toast

        console.log(booking)
        setTreatment(null)
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
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full" required/>
                        <input name='email' type="text" placeholder="Email Address" className="input input-bordered w-full" required/>
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" required/>
                        <input type="submit" className="input input-bordered w-full btn-accent" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;