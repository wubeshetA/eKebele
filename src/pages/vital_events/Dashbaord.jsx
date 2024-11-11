// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import StaffDashboard from './StaffDashboard';
import UserDashboard from './UserDashboard';
import api from '../../api/api'; // Import your API configuration or axios instance

const Dashboard = () => {
  const [isStaff, setIsStaff] = useState(false); // Initialize as false
  const [loading, setLoading] = useState(true);  // Initialize loading as true

  useEffect(() => {
    const checkIsStaff = async () => {
      try {
        const response = await api.get('/auth/check-is-staff/');
        const data = response.data;



        if (data.is_staff === true) {
            console.log("is_staff ", data.is_staff)
          setIsStaff(true);
        } else {
            console.log("is_staff ", data.is_staff)
          setIsStaff(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);  // Set loading to false once request completes
      }
    };

    checkIsStaff();
  }, []); // No dependencies, only runs once on mount

  // Render loading spinner until the request completes
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the appropriate component based on the isStaff value
  return (
    <div>
      {isStaff ? <StaffDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
