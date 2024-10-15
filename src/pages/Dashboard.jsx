// src/pages/Dashboard.jsx
import React, { useRef } from 'react';
import ServicesSection from '../components/ServicesSection';

const Dashboard = () => {
  const applications = [
    { id: 1, service: 'Birth Certificate', status: 'Completed', date: '2024-01-10' },
    { id: 2, service: 'Business License', status: 'Pending', date: '2024-02-14' },
  ];

  const upcomingServices = [
    { id: 1, service: 'Marriage License', availableFrom: '2024-11-01' },
    { id: 2, service: 'Land Ownership Transfer', availableFrom: '2024-12-15' },
  ];

  const notifications = [
    { id: 1, message: 'New service "Land Registration" is now available!', date: '2024-10-15' },
    { id: 2, message: 'Maintenance scheduled on 2024-10-20 from 12:00 AM to 4:00 AM.', date: '2024-10-10' },
  ];

  const servicesSectionRef = useRef(null);

  const scrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center">
      <header className="bg-primary text-white p-6 text-center w-full">
        <h1 className="text-3xl font-semibold">Welcome to eKebele Dashboard</h1>
      </header>

      <main className="p-6 w-full max-w-6xl flex flex-col md:flex-row items-start">
        {/* Main Content */}
        <div className="w-full md:w-3/4 mr-0 md:mr-6">
          {/* Applications Section */}
          <section className="bg-white p-6 shadow-lg rounded-2xl mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Previous Applications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-background text-left">
                <thead className="bg-primary-dark text-white">
                  <tr>
                    <th className="py-2 px-4">Service</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b">
                      <td className="py-2 px-4">{app.service}</td>
                      <td className="py-2 px-4">{app.date}</td>
                      <td
                        className={`py-2 px-4 ${
                          app.status === 'Pending' ? 'text-secondary' : 'text-primary-dark'
                        }`}
                      >
                        {app.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Upcoming Services Section */}
          <section className="bg-white p-6 shadow-lg rounded-2xl mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Services</h2>
            <ul className="space-y-4">
              {upcomingServices.map((service) => (
                <li key={service.id} className="flex justify-between text-lg">
                  <span>{service.service}</span>
                  <span className="text-text-light">Available From: {service.availableFrom}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Separator Line */}
          <hr className="w-full border-t-2 border-gray-300 my-6" />

          {/* New Application Button */}
          <div className="mt-6 w-full text-center">
            <button
              onClick={scrollToServices}
              className="bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-2xl"
            >
              Apply for a New Service
            </button>
          </div>
        </div>

        {/* Notifications Section (Sidebar) */}
        <aside className="w-full md:w-1/4 mt-6 md:mt-0 bg-white p-6 shadow-lg rounded-2xl">
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

      {/* Services Section */}
      <div ref={servicesSectionRef}>
        <ServicesSection />
      </div>
    </div>
  );
};

export default Dashboard;
