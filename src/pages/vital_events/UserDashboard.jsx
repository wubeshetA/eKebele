// src/pages/UserDashboard.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesSection from '../../components/ServicesSection';
import api from '../../api/api';



const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [currentApplications, setCurrentApplications] = useState([]);
  const [previousApplications, setPreviousApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const servicesSectionRef = useRef(null);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc'); 

  // Mock notifications data
  const [notifications] = useState([
    { id: 1, message: 'New service "Land Registration" is now available!', date: '2024-10-15' },
    { id: 2, message: 'Maintenance scheduled on 2024-10-20 from 12:00 AM to 4:00 AM.', date: '2024-10-10' },
  ]);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/api/vital-events/birth-certificate/');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  // Filter applications into current and previous categories
  useEffect(() => {
    const filteredCurrent = applications.filter(app => app.status.toLowerCase() === 'pending');
    const filteredPrevious = applications.filter(
      app => app.status.toLowerCase() === 'rejected' || app.status.toLowerCase() === 'approved'
    );

    // Apply search term filtering
    const searchFiltered = (list) =>
      list.filter(
        (app) =>
          app.application_number.toString().toLowerCase().includes(searchTerm) ||
          app.applicant_name.toLowerCase().includes(searchTerm) ||
          app.first_name.toLowerCase().includes(searchTerm) ||
          app.last_name.toLowerCase().includes(searchTerm)
      );

    setCurrentApplications(searchFiltered(filteredCurrent));
    setPreviousApplications(searchFiltered(filteredPrevious));
  }, [applications, searchTerm]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Scroll to Services Section
  const scrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle row click to navigate to details page
  const handleRowClick = (id) => {
    navigate(`/services/vital-events/${id}`);
  };

  // Handle delete application
  const handleDeleteApplication = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (confirmDelete) {
      try {
        const response = await api.delete(`/api/vital-events/birth-certificate/${id}/`);
        if (response.status === 204) {
          setApplications(applications.filter(app => app.id !== id));
          alert("Application deleted successfully.");
        }
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete the application.");
      }
    }
  };


  const sortByDate = () => {
    const sortedApplications = [...currentApplications].sort((a, b) => {
      const dateA = new Date(a.date_created);
      const dateB = new Date(b.date_created);
  
      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  
    setCurrentApplications(sortedApplications);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order
  };
  
  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center">
      <header className="bg-primary-dark text-white p-16 text-center w-full">
        <h1 className="text-3xl font-semibold">Your Applications</h1>
      </header>

      <main className="p-6 w-full max-w-6xl flex flex-col lg:flex-row items-start gap-6">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by Application Number, Applicant Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />

          {/* Current Applications Section */}
          <section className="w-full bg-white p-6 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">Current Applications</h2>
            <div className="overflow-x-auto">
              {currentApplications.length > 0 ? (
                <table className="min-w-full bg-background text-left">
                  <thead className="bg-primary-dark text-white">
                    <tr>
                      <th className="py-2 px-4">Application Number</th>
                      <th className="py-2 px-4">First Name</th>
                      <th className="py-2 px-4">Last Name</th>
                      <th className="py-2 px-8 cursor-pointer"
                          onClick={sortByDate}>
                          Submission Date {sortOrder === 'asc' ? '↑' : '↓'}
                        </th>

                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-10">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRowClick(app.id)}
                      >
                        <td className="py-2 px-4">{app.application_number}</td>
                        <td className="py-2 px-4">{app.first_name}</td>
                        <td className="py-2 px-4">{app.last_name}</td>
                        <td className="py-2 px-4">{formatDate(app.date_created)}</td>
                        <td className="py-2 px-4 text-secondary">Pending</td>
                        <td className="py-2 px-4"> Vital Event
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No current applications.</p>
              )}
            </div>
          </section>

          {/* Previous Applications Section */}
          <section className="w-full bg-white p-6 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">Previous Applications</h2>
            <div className="overflow-x-auto">
              {previousApplications.length > 0 ? (
                <table className="min-w-full bg-background text-left">
                  <thead className="bg-primary-dark text-white">
                    <tr>
                      <th className="py-2 px-4">Application Number</th>
                      <th className="py-2 px-4">First Name</th>
                      <th className="py-2 px-4">Last Name</th>
                      <th className="py-2 px-4 cursor-pointer"
                          onClick={sortByDate}>
                          Submission Date {sortOrder === 'asc' ? '↑' : '↓'}
                        </th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-10">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRowClick(app.id)}
                      >
                        <td className="py-2 px-4">{app.application_number}</td>
                        <td className="py-2 px-4">{app.first_name}</td>
                        <td className="py-2 px-4">{app.last_name}</td>
                        <td className="py-2 px-4">{formatDate(app.date_created)}</td>
                        <td
                          className={`py-2 px-4 ${
                            app.status.toLowerCase() === 'approved' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </td>
                        <td className="py-2 px-4 "> Vital Event
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No previous applications.</p>
              )}
            </div>
          </section>

          {/* Button to Scroll to Services Section */}
          <div className="w-full text-center mb-6">
            <button
              onClick={scrollToServices}
              className="bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-2xl"
            >
              Apply for a New Service
            </button>
          </div>

          {/* Services Section */}
          
        </div>
      

        {/* Notifications Section */}
        <aside className="w-full lg:w-1/4 bg-white p-6 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Notifications</h2>
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex justify-between text-lg">
                <span>{notification.message}</span>
                <span className="text-text-light">{notification.date}</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <div ref={servicesSectionRef}>
            <ServicesSection />
          </div>
    </div>
  );
};

export default UserDashboard;
