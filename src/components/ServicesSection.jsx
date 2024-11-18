import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const servicesData = {
  "Vital Events": [
    { name: "Birth Registration", link: "/services/apply-birth-certificate", onboarded: true },
    { name: "Death Registration", link: "/services/death-registration", onboarded: false },
    { name: "Marriage Registration", link: "/services/marriage-registration", onboarded: false },
    { name: "Divorce Registration", link: "/services/not-onboarded", onboarded: false },
    { name: "Adoption Registration", link: "/services/not-onboarded", onboarded: false },
    { name: "Civil Status Amendment", link: "/services/civil-status-amendment", onboarded: false },
    { name: "Paternity Acknowledgment", link: "/services/paternity-acknowledgment", onboarded: false },
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
  // Other categories omitted for brevity
};

const regions = [
  "Addis Ababa",
  "Dire Dawa",
  "Tigray",
  "Afar",
  "Amhara",
  "Oromia",
  "Somali",
  "Benishangul-Gumuz",
  "SNNPR",
  "Gambela",
  "Harari"
];

const addisAbabaSubCities = [
  "Arada",
  "Addis Ketema",
  "Bole",
  "Gulele",
  "Kirkos",
  "Kolfe Keranio",
  "Lideta",
  "Nifas Silk-Lafto",
  "Yeka",
  "Akaky Kaliti"
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubCity, setSelectedSubCity] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const navigate = useNavigate();

  const handleServiceClick = (link) => {
    setRedirectLink(link);
    setShowPopup(true);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedSubCity(""); // Reset sub-city selection when region changes
  };

  const handleSubCitySelect = (subCity) => {
    setSelectedSubCity(subCity);
  };

  const handleGoToApplication = () => {
    if (selectedRegion === "Addis Ababa" && selectedSubCity) {
      navigate(redirectLink);
    }
  };

  return (
    <section className="py-16 bg-background-light">
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
                    {service.onboarded ? (
                      <button
                        onClick={() => handleServiceClick(service.link)}
                        className="text-primary-dark hover:text-blue-800 font-medium transition duration-200"
                      >
                        {t(`servicesList.${service.name}`)}
                      </button>
                    ) : (
                      <Link
                        to="/service-not-available"
                        className="text-primary-dark hover:text-blue-800 font-medium transition duration-200"
                      >
                        {t(`servicesList.${service.name}`)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Dear user, you're about to apply for a birth certificate.
            </h2>
            <p className="mb-4">
              Please select to which physical kebele office you want this to be sent:
            </p>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedRegion}
              onChange={(e) => handleRegionSelect(e.target.value)}
            >
              <option value="">Select a region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {selectedRegion === "Addis Ababa" && (
              <div className="mt-4">
                <p className="mb-4">Please select a sub-city in Addis Ababa:</p>
                <select
                  className="w-full p-2 border rounded mb-4"
                  value={selectedSubCity}
                  onChange={(e) => handleSubCitySelect(e.target.value)}
                >
                  <option value="">Select a sub-city</option>
                  {addisAbabaSubCities.map((subCity) => (
                    <option key={subCity} value={subCity}>
                      {subCity}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedRegion && selectedRegion !== "Addis Ababa" && (
              <p className="text-red-600 mb-4">
                Currently, the eKebele platform is not operational in this region. Please stay tuned
                for updates.
              </p>
            )}

            <button
              className={`w-full p-2 rounded text-white ${
                selectedRegion === "Addis Ababa" && selectedSubCity
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!(selectedRegion === "Addis Ababa" && selectedSubCity)}
              onClick={handleGoToApplication}
            >
              Go to Application
            </button>
            <button
              className="w-full p-2 mt-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
