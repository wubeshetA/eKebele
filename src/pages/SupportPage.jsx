import React from 'react';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background-light text-text-default font-sans">
      <header className="bg-primary-dark text-white py-6 px-4 shadow-lg text-center">

        <h1 className="text-3xl font-bold">Support</h1>
        <p className="text-lg">We're here to help you with any issues or questions.</p>
      </header>

      <main className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">How can we assist you?</h2>
          <p className="mt-2 text-text-light">Browse through our common support topics or reach out to us directly.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-primary-dark">Account Issues</h3>
            <p className="mt-2 text-text-light">Having trouble with your account? Let us help you recover or set up your profile.</p>
            <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg shadow-md">Learn More</button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-primary-dark">Technical Support</h3>
            <p className="mt-2 text-text-light">Encountering a technical problem? Reach out to our team for assistance.</p>
            <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg shadow-md">Learn More</button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-primary-dark">Billing Questions</h3>
            <p className="mt-2 text-text-light">Have any questions about billing or payments? We’re here to clarify.</p>
            <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg shadow-md">Learn More</button>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-primary-dark">Other Inquiries</h3>
            <p className="mt-2 text-text-light">Need help with something else? Feel free to reach out to us for assistance.</p>
            <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg shadow-md">Learn More</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPage;
