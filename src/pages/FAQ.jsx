import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is eKebele?",
      answer: "eKebele is an online platform that allows citizens to access essential government services in Ethiopia digitally, starting with a pilot in Addis Ababa's Bole sub-city."
    },
    {
      question: "What services are available on eKebele?",
      answer: "In the first phase, eKebele offers access to key services such as ID card renewals, birth and death certificates, and land-related services."
    },
    {
      question: "Is eKebele a government-owned platform?",
      answer: "eKebele is a privately owned startup where the government holds stakes, ensuring better management efficiency and service delivery."
    },
    {
      question: "How do I register for eKebele?",
      answer: "Registration is simple! You can sign up using your national ID or visit your local Kebele office for in-person registration assistance."
    },
    {
      question: "Is eKebele secure?",
      answer: "Yes, we prioritize your data privacy and security with industry-standard encryption and multi-factor authentication to protect your personal information."
    },
    {
      question: "How do I get support if I face issues?",
      answer: "You can visit our Support section on the platform, where we provide assistance for technical issues, account management, and other inquiries."
    }
  ];

  return (
    <section className="bg-background-light p-8">
      <h2 className="text-2xl font-semibold text-center text-primary mb-8">Frequently Asked Questions</h2>
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
