import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = t('faqs', { returnObjects: true });

  return (
    
    <section className="bg-background-light p-8">
      <h2 className="text-2xl font-semibold text-center text-primary-dark mb-8">{t('faq')}</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b border-text-light">
            <button
              className="w-full text-left py-4 text-lg font-medium text-primary-dark focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-text-light">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
