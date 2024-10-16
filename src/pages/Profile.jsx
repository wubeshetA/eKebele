import React, { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi'; // Logout Icon
import { logoutUser } from '../utils';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Import your API call module

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
                const response = await api.get('/auth/users/me/');
                const data = response.data;

                // Update user state with the fetched data, providing default values
                setUser({
                    firstName: data.first_name || 'None',
                    lastName: data.last_name || 'None',
                    phoneNumber: data.phone_number || 'None',
                    email: data.email || 'None'
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

    if (loading) {
        return <div>Loading...</div>;
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

                {/* User Info */}
                <h1 className="text-2xl font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600 mt-2">Phone: {user.phoneNumber}</p>
                <p className="text-gray-600 mt-2">Email: {user.email}</p>
                <p className="text-gray-600 mt-2">User Type: Public</p>

                {/* Spacer */}
                <div className="my-6 border-t border-gray-300"></div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                >
                    <FiLogOut className="mr-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
