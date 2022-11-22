import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {logOut} = useContext(AuthContext);

    const handleLogOut = async () => {
        await logOut();
    }
    return (
        <div>
            <p className='text-red-500'>Something went wrong...</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button onClick={handleLogOut}>Sign Out</button></h4>
        </div>
    );
};

export default DisplayError;