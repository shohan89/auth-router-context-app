import React, { useContext } from 'react';
import { AuthContext } from '../contexts/UserContext';

const Home = () => {
    const user = useContext( AuthContext )
    console.log("from home",user.user.email);
    return (
        <div>
            <h2 className='text-2xl font-bold'>This is Home for <span>{ user.user.email }</span></h2>
        </div>
    );
};

export default Home;