import React from "react";

const servicesData = {
  "Vital Events": [
    { name: "Birth Registration", link: "/services/birth-registration" },
    { name: "Death Registration", link: "/services/death-registration" },
  ],
  Identification: [
    { name: "National ID", link: "/services/national-id" },
    { name: "Passport Application", link: "/services/passport-application" },
  ],
  Education: [
    { name: "School Enrollment", link: "/services/school-enrollment" },
    { name: "Exam Registration", link: "/services/exam-registration" },
  ],
};

const ServicesSection = () => {
  return (
    <section className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(servicesData).map((category) => (
            <div
              key={category}
              className="bg-white shadow-md rounded-lg p-6 transition duration-300 hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {category}
              </h3>
              <ul className="space-y-2">
                {servicesData[category].map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.link}
                      className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
