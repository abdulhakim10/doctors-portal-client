import React from 'react';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import Services from '../Services/Services';
import ExceptionalDental from './ExceptionalDental/ExceptionalDental';

const Home = () => {
    return (
        <div className='mx-5'>
           <Banner></Banner>
           <InfoCards></InfoCards>
           <Services></Services>
           <ExceptionalDental></ExceptionalDental>
        </div>
    );
};

export default Home;