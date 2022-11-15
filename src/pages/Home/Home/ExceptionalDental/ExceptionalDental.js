import React from 'react';
import treatment from '../../../../assets/images/treatment.png';

const ExceptionalDental = () => {
    return (
        <div className="hero m-8 p-6">
            <div className="hero-content flex-col lg:flex-row ">
                <img src={treatment} alt='..' className="md:max-w-md h-[576px] rounded-lg shadow-2xl" />
                <div className='md:max-w-md h-[347px] p-4 mb-12 ml-8'>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default ExceptionalDental;