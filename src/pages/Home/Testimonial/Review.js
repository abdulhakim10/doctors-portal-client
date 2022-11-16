import React from 'react';

const Review = ({ revi }) => {
    const { name, location, img, review } = revi;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{review}</p>
                <div className="flex gap-6 items-center mt-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                    <div>
                        <h5 className="text-lg">{name}</h5>
                        <p>{location}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Review;