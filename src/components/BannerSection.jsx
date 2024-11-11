import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'; 
import { useTranslation } from 'react-i18next';

const BannerSection = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state for "Read More"
  const handleToggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full bg-primary-dark h-[40vh] flex flex-col justify-center items-center text-white">
      
      
      <h1 className="font-bold text-3xl md:text-3xl lg:text-4xl tracking-widest">E K B E L E</h1>
        <p className="text-sm md:text-base lg:text-lg mb-20">{t('driving-digital-governance')}</p>

      {/* About Us Section */}
      <div className="absolute w-[90%] md:w-[60%] bg-white rounded-lg shadow-lg p-8 transform translate-y-[70%]"> {/* Pushed further down */}
        <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">{t("about-us")}</h2>
        <p className="text-gray-600 text-justify">
          {t("about-us-text-less")}
          {isExpanded && (
            <span>
              {' '}{t("about-us-text-more")}
            </span>
          )}
        </p>

        {/* Read More Button with Arrow */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleToggleReadMore}
            className="text-green-500 font-medium flex items-center hover:underline focus:outline-none"
          >
            {isExpanded ? t('read-less') : t('read-more')}
            {isExpanded ? (
              <FiChevronUp className="ml-2 text-green-500" />
            ) : (
              <FiChevronDown className="ml-2 text-green-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
