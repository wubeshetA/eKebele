import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const servicesData = {
    "Vital Events": [
      { name: "Birth Registration", link: "/services/apply-birth-certificate", onboarded: true },
      { name: "Death Registration", link: "/services/death-registration", onboarded: false },
      { name: "Marriage Registration", link: "/services/marriage-registration", onboarded: false }, // Onboarded
      { name: "Divorce Registration", link: "/services/not-onboarded", onboarded: false },
      { name: "Adoption Registration", link: "/services/not-onboarded", onboarded: false },
      { name: "Civil Status Amendment", link: "/services/civil-status-amendment", onboarded: false }, // New service
      { name: "Paternity Acknowledgment", link: "/services/paternity-acknowledgment", onboarded: false }, // New service
    ],
    Identification: [
      { name: "National ID", link: "/services/national-id", onboarded: false },
      { name: "Passport Application", link: "/services/not-onboarded", onboarded: false },
      { name: "Driver's License", link: "/services/drivers-license", onboarded: false }, // Onboarded
      { name: "Voter ID", link: "/services/not-onboarded", onboarded: false },
      { name: "Residency Card", link: "/services/not-onboarded", onboarded: false },
      { name: "Work Permit", link: "/services/work-permit", onboarded: false }, // New service
      { name: "Student ID", link: "/services/student-id", onboarded: false }, // New service
    ],
    "Property & Land": [ // New Category
      { name: "Land Ownership Transfer", link: "/services/land-transfer", onboarded: false },
      { name: "Property Registration", link: "/services/property-registration", onboarded: false }, // Onboarded
      { name: "Mortgage Application", link: "/services/mortgage-application", onboarded: false },
      { name: "Building Permit", link: "/services/building-permit", onboarded: false },
      { name: "Land Dispute Resolution", link: "/services/land-dispute", onboarded: false },
    ],
    "Business & Trade": [ // New Category
      { name: "Business License Application", link: "/services/business-license", onboarded: false }, // Onboarded
      { name: "Trade Name Registration", link: "/services/trade-name-registration", onboarded: false }, // Onboarded
      { name: "Taxpayer Registration", link: "/services/taxpayer-registration", onboarded: false }, // Onboarded
      { name: "Import/Export License", link: "/services/import-export-license", onboarded: false },
      { name: "Business Closure", link: "/services/business-closure", onboarded: false },
    ],
    "Health & Social Services": [ // New Category
      { name: "Health Insurance Enrollment", link: "/services/health-insurance", onboarded: false }, // Onboarded
      { name: "Social Security Registration", link: "/services/social-security", onboarded: false },
      { name: "Disability Support", link: "/services/disability-support", onboarded: false },
      { name: "Child Care Benefits", link: "/services/child-care-benefits", onboarded: false },
      { name: "Elderly Care Registration", link: "/services/elderly-care", onboarded: false },
    ]  
};

const ServicesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-background-light"> {/* Added mt-20 to add some space */}
      <div className="container mx-auto px-5 lg:px-40 md:px-10">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-12 mt-44">
          {t("services")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(servicesData).map((category) => (
            <div
              key={category}
              className="bg-white shadow-md rounded-lg p-6 transition duration-300 hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {t(`categories.${category}`)}
              </h3>
              <ul className="space-y-2">
                {servicesData[category].map((service) => (
                  <li key={service.name}>
                    <Link
                      to={service.onboarded ? service.link : "/service-not-available"}
                      className="text-primary-dark hover:text-blue-800 font-medium transition duration-200"
                    >
                      {t(`servicesList.${service.name}`)}
                    </Link>
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
