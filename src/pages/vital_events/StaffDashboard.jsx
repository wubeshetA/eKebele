// src/pages/StaffDashboard.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesSection from '../../components/ServicesSection';
import api from '../../api/api';

const StaffDashboard = () => {
  const servicesSectionRef = useRef(null);
  const navigate = useNavigate();

  // State for applications, search, sorting, and filters
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState('');

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
        setFilteredApplications(response.data); // Initialize with all applications
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  // Date Comparison Helper Functions
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const isThisWeek = (date) => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    return date >= oneWeekAgo && date <= today;
  };

  const isThisMonth = (date) => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);
    return date >= oneMonthAgo && date <= today;
  };

  const isThisYear = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
  };

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

  // Apply date filter
  const applyDateFilter = (dateString) => {
    const applicationDate = new Date(dateString);
    switch (selectedDateFilter) {
      case 'Today':
        return isToday(applicationDate);
      case 'Yesterday':
        return isYesterday(applicationDate);
      case 'This Week':
        return isThisWeek(applicationDate);
      case 'This Month':
        return isThisMonth(applicationDate);
      case 'This Year':
        return isThisYear(applicationDate);
      default:
        return true;
    }
  };

  // Effect to apply filters whenever any filter state changes
  useEffect(() => {
    setFilteredApplications(
      applications.filter((app) => {
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(app.status.toLowerCase());
        const matchesSearch =
          app.application_number.toString().toLowerCase().includes(searchTerm) ||
          app.first_name.toLowerCase().includes(searchTerm) ||
          app.last_name.toLowerCase().includes(searchTerm);
        const matchesDate = applyDateFilter(app.date_created);
        return matchesStatus && matchesSearch && matchesDate;
      })
    );
  }, [searchTerm, selectedStatuses, selectedDateFilter, applications]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle checkbox changes for status filters
  const handleStatusChange = (status) => {
    const updatedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(updatedStatuses);
  };

  // Handle date filter change
  const handleDateFilterChange = (filter) => {
    setSelectedDateFilter(filter);
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredApplications].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setFilteredApplications(sortedData);
  };

  // Scroll to services section function
  const scrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle row click to navigate to the details page
  const handleRowClick = (id) => {
    navigate(`/services/vital-events/${id}`);
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center">
      <header className="bg-primary-dark text-white p-16 text-center w-full">
        <h1 className="text-3xl font-semibold">Welcome to eKebele Dashboard</h1>
      </header>

      <main className="p-6 w-full flex flex-col lg:flex-row items-start gap-6">
        {/* Filter Section */}
        <aside className="w-full lg:w-1/4 bg-white p-6 shadow-lg rounded-2xl mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-center">Filter Applications</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="pending"
                checked={selectedStatuses.includes('pending')}
                onChange={() => handleStatusChange('pending')}
                className="mr-2"
              />
              Pending
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="approved"
                checked={selectedStatuses.includes('approved')}
                onChange={() => handleStatusChange('approved')}
                className="mr-2"
              />
              Approved
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="rejected"
                checked={selectedStatuses.includes('rejected')}
                onChange={() => handleStatusChange('rejected')}
                className="mr-2"
              />
              Rejected
            </label>

            {/* Date Filter */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Filter by Date</h3>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={selectedDateFilter}
                onChange={(e) => handleDateFilterChange(e.target.value)}
              >
                <option value="">All Dates</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Applications Section */}
        <div className="w-full lg:w-1/2 bg-white p-6 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Staff Applications Overview</h2>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by Application Number, Applicant Name, or Child's Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-background text-left">
              <thead className="bg-primary-dark text-white">
                <tr>
                  <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('date_created')}>
                    Submission Date {sortConfig.key === 'date_created' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('application_number')}>
                    Application Number
                  </th>
                 
                  <th className="py-2 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(app.id)}
                  >
                    <td className="py-2 px-4">{formatDate(app.date_created)}</td>
                    <td className="py-2 px-4">{app.application_number}</td>
                    <td className="py-2 px-4">{app.first_name}</td>
                    <td className="py-2 px-4">{app.last_name}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          app.status === 'approved'
                            ? 'bg-green-200 text-green-800'
                            : app.status === 'rejected'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default StaffDashboard;
