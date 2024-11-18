import React, { useState, useEffect } from 'react';
import { FiLogOut, FiArrowRight } from 'react-icons/fi'; // Import Logout and Right Arrow Icons
import { logoutUser } from '../utils';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Import your API call module
import SpinnerLoading from '../components/SpinnerLoading';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: 'None',
        lastName: 'None',
        phoneNumber: 'None',
        email: 'None'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data from the API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/auth/user/profile/');
                const data = response.data;

                setUser({
                    firstName: data.first_name || 'None',
                    lastName: data.last_name || 'None',
                    phoneNumber: data.phone_number || 'None',
                    email: data.email || 'None',
                    userType: data.user_type || 'None',
                    NID: data.nid || 'None'
                });
            } catch (error) {
                setError('Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    const handleOpenDashboard = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return <SpinnerLoading />; // Display the overlay spinner
      }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                {/* User Avatar (Initials) */}
                <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary-dark flex items-center justify-center text-5xl font-semibold text-white">
                        {user.firstName.charAt(0).toUpperCase()}
                    </div>
                </div>

               
                <h1 className="text-2xl font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                </h1>
                <div className="mt-4">
                    <div className="flex justify-between text-gray-600 mt-2 ">
                        <span className='font-semibold'>Phone:</span>
                        <span className="text-right">{user.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mt-2">
                    <span className='font-semibold'>Email:</span>
                        <span className="text-right">{user.email}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600 mt-2">
                    <span className='font-semibold'>National ID:</span>
                        <span className="text-right">{user.NID}</span>
                    </div>

                    <div className="flex justify-between text-gray-600 mt-2">
                    <span className='font-semibold'>User Type:</span>
                        <span className="text-right">{user.userType}</span>
                    </div>
                </div>
                <div className="my-6 border-t border-gray-300"></div>

                {/* Logout Button */}

                <button
                    onClick={handleOpenDashboard}
                    className="flex items-center justify-center w-full bg-primary-dark text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all mt-4"
                >
                    <span>Open Dashboard</span>
                    <FiArrowRight className="ml-2" />
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all mt-8"
                >
                    <FiLogOut className="mr-2" />
                    Logout
                </button>

              
                
            </div>
        </div>
    );
};

export default ProfilePage;
