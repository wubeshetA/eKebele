// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: {
        "about-us": "About Us",
        "about-us-text-less": "eKebele is a platform designed to streamline access to essential government services. We aim to simplify administrative processes and empower citizens by offering convenient digital solutions  that improve efficiency, and accessibility.",
        "about-us-text-more": "With eKebele, citizens can easily access a range of services such as birth registration, business permits,and tax filings. Our goal is to bridge the gap between the government and its people, making it easier for  individuals and businesses to thrive in an ever-evolving digital landscape. The platform is secure, easy to use, and designed to cater to the diverse needs of the population.",
        "services": "Services",
        
        "read-more": "Read More",
        "read-less": "Read Less",
        "english": "English",
        "amharic": "አማርኛ",
        "find-application": "Find Application",
        "support-center": "Support Center",
        "sign-up": "Sign Up",
        "log-in": "Log In",
        "driving-digital-governance": "Driving Digital Governance!",
        "vital-events": "Vital Events",
        "search": "Search",

        "faq": "Frequently Asked Questions",
        faqs: [
            { question: "What is eKebele?", answer: "eKebele is an online platform that allows citizens to access essential government services in Ethiopia digitally, starting with a pilot in Addis Ababa's Bole sub-city." },
            { question: "What services are available on eKebele?", answer: "In the first phase, eKebele offers access to key services such as ID card renewals, birth and death certificates, and land-related services." },
            { question: "Is eKebele a government-owned platform?", answer: "eKebele is a privately owned startup where the government holds stakes, ensuring better management efficiency and service delivery." },
            { question: "How do I register for eKebele?", answer: "Registration is simple! You can sign up using your national ID or visit your local Kebele office for in-person registration assistance." },
            { question: "Is eKebele secure?", answer: "Yes, we prioritize your data privacy and security with industry-standard encryption and multi-factor authentication to protect your personal information." },
            { question: "How do I get support if I face issues?", answer: "You can visit our Support section on the platform, where we provide assistance for technical issues, account management, and other inquiries." },
          ],

        categories : {
            "Vital Events": "Vital Events",
            "Identification": "Identification",
            "Property & Land": "Property & Land",
            "Business & Trade": "Business & Trade",
            "Health & Social Services": "Health & Social Services",
        },
        servicesList: {
            // vital events
            "Birth Registration": "Birth Registration",
            "Death Registration": "Death Registration",
            "Marriage Registration": "Marriage Registration",
            "Divorce Registration": "Divorce Registration",
            "Adoption Registration": "Adoption Registration",
            "Civil Status Amendment": "Civil Status Amendment",
            "Paternity Acknowledgment": "Paternity Acknowledgment",
            // identification
            "National ID": "National ID",
            "Passport Application": "Passport Application",
            "Driver's License": "Driver's License",
            "Voter ID": "Voter ID",
            "Residency Card": "Residency Card",
            "Work Permit": "Work Permit",
            "Student ID": "Student ID",

            // property & land
            "Land Ownership Transfer": "Land Ownership Transfer",
            "Property Registration": "Property Registration",
            "Mortgage Application": "Mortgage Application",
            "Building Permit": "Building Permit",
            "Land Dispute Resolution": "Land Dispute Resolution",

            // business & trade
            "Business License Application": "Business License Application",
            "Trade Name Registration": "Trade Name Registration",
            "Taxpayer Registration": "Taxpayer Registration",
            "Import/Export License": "Import/Export License",
            "Business Closure": "Business Closure",
            
            // health & social services
            "Health Insurance Enrollment": "Health Insurance Enrollment",
            "Social Security Registration": "Social Security Registration",
            "Disability Support": "Disability Support",
            "Child Care Benefits": "Child Care Benefits",
            "Elderly Care Registration": "Elderly Care Registration",

            


          }

        
     } },
    am: { 
        translation: {
            faqs: [
                { question: "እቀበሌ ምንድን ነው?", answer: "ዕቀበሌ በአዲስ አበባ ቦሌ ክፍለ ከተማ ከአብራሪ ጀምሮ ዜጎች በኢትዮጵያ አስፈላጊ የሆኑ የመንግስት አገልግሎቶችን በዲጂታል መንገድ እንዲያገኙ የሚያስችል የመስመር ላይ መድረክ ነው።" },
                { question: "በዕቀበሌ ላይ ምን አይነት አገልግሎቶች ይገኛሉ?", answer: "በመጀመሪያው ምዕራፍ ኢቀበሌ እንደ መታወቂያ ካርድ እድሳት፣ የልደት እና የሞት የምስክር ወረቀት እና ከመሬት ጋር የተያያዙ አገልግሎቶችን የመሳሰሉ ቁልፍ አገልግሎቶችን ይሰጣል።" },
                { question: "እቀበሌ የመንግስት መድረክ ነው?", answer: "ዕቀበሌ የተሻለ የአስተዳደር ቅልጥፍና እና የአገልግሎት አሰጣጥን በማረጋገጥ መንግስት ድርሻ የሚይዝበት የግል ጅምር ነው።" },
                { question: "ለ eKebele እንዴት ነው የምመዘገበው?", answer: "ምዝገባ ቀላል ነው! ብሔራዊ መታወቂያዎን ተጠቅመው መመዝገብ ወይም በአካል ለመመዝገብ የአካባቢዎን የቀበሌ ቢሮ መጎብኘት ይችላሉ።" },
                { question: "እቀቤሌ ደህንነቱ የተጠበቀ ነው?", answer: "አዎ፣ የእርስዎን የግል መረጃ ለመጠበቅ የውሂብ ግላዊነት እና ደህንነት በኢንዱስትሪ ደረጃ ምስጠራ እና ባለብዙ ደረጃ ማረጋገጫ ቅድሚያ እንሰጣለን።" },
                { question: "ጉዳዮች ካጋጠሙኝ እንዴት ድጋፍ አገኛለሁ?", answer: "ለቴክኒካል ጉዳዮች, ለሂሳብ አስተዳደር እና ለሌሎች ጥያቄዎች እርዳታ የምንሰጥበት በመድረኩ ላይ የእኛን የድጋፍ ክፍል መጎብኘት ይችላሉ።" },
              ],
            categories : {
                "Vital Events": "ወሳኝ ሁነቶች",
                "Identification": "ማንነት",
                "Property & Land": "ንብረት እና መሬት",
                "Business & Trade": "ንግድ",
                "Health & Social Services": "ጤና እና ማህበረሰብ",
            },

            servicesList: {
               "Birth Registration": "የልደት ምዝገባ",
                "Death Registration": "የሞት ምዝገባ",
                "Marriage Registration": "የጋብቻ ምዝገባ",
                "Divorce Registration": "የፍቺ ምዝገባ",
                "Adoption Registration": "የጉዲፈቻ ምዝገባ",
                "Civil Status Amendment": "የሲቪል ሁኔታ ማሻሻያ",
                "Paternity Acknowledgment": "የአባትነት እውቅና",
                "National ID": "ብሔራዊ መታወቂያ",
                "Passport Application": "የፓስፖርት መተግበሪያ",
                "Driver's License": "የአሽከርካሪ ፍቃድ",
                "Voter ID": "የመራጮች መታወቂያ",
                "Residency Card": "የነዋሪነት ካርድ",
                "Work Permit": "የሥራ ፈቃድ",
                "Student ID": "የተማሪ መታወቂያ",
                "Land Ownership Transfer": "የመሬት ባለቤትነት ማስተላለፍ",
                "Property Registration": "የንብረት ምዝገባ",
                "Mortgage Application": "የሞርጌጅ ማመልከቻ",
                "Building Permit": "የግንባታ ፍቃድ",
                "Land Dispute Resolution": "የመሬት ክርክር መፍትሄ",
                "Business License Application": "የንግድ ፈቃድ ማመልከቻ",
                "Trade Name Registration": "የንግድ ስም ምዝገባ",
                "Taxpayer Registration": "የግብር ከፋይ ምዝገባ",
                "Import/Export License": "ማስመጣት/የመላክ ፍቃድ",
                "Business Closure": "ቢዝነስ መዘጋት",
                "Health Insurance Enrollment": "የጤና ኢንሹራንስ ምዝገባ",
                "Social Security Registration": "የማህበራዊ ዋስትና ምዝገባ",
                "Disability Support": "የአካል ጉዳተኝነት ድጋፍ",
                "Child Care Benefits": "የልጆች እንክብካቤ ጥቅሞች",
                "Elderly Care Registration": "የአረጋውያን እንክብካቤ ምዝገባ",
              },
            "about-us": "ስለ እኛ", 
            "about-us-text-less": "eKebele አስፈላጊ የመንግስት አገልግሎቶችን ለመቀላቀል የተነደፈ መድረክ ነው። የአስተዳደር ሂደቶችን በቀላሉ ለማድረግ እና ዜጎችን ለማበረታታት በቀላሉ የሚጠቀሙ ዲጂታል መፍትሆችን በመስጠት ውጤታማነትን እና ተደራሽነትን እንፈጽማለን።",
            "about-us-text-more": "በ eKebele ዜጎች እንደ የልደት ምዝገባ፣ የንግድ ፈቃድ እና የግብር ሰነዶችን የመሳሰሉ አገልግሎቶችን በቀላሉ ማግኘት ይችላሉ። ግባችን በመንግስት እና በህዝቡ መካከል ያለውን ልዩነት በማጥበብ ግለሰቦች እና የንግድ ድርጅቶች ከጊዜ ወደ ጊዜ እያደገ በሚሄድ ዲጂታል መልክዓ ምድር እንዲበለፅጉ ማድረግ ነው። መድረኩ ደህንነቱ የተጠበቀ፣ ለአጠቃቀም ቀላል እና የህዝቡን የተለያዩ ፍላጎቶች ለማሟላት የተነደፈ ነው።",
            "services": "አገልግሎቶች",
            "faq": "ጥያቄዎች",
            "read-more": "ተጨማሪ እይ",
            "read-less": "አሳንስ",
            "english": "English",
            "amharic": "አማርኛ",
            "find-application": "ፈልግ",
            "support-center": "የድጋፍ ማዕከል",
            "sign-up": "ይመዝገቡ",
            "log-in": "ግባ",
            "driving-digital-governance": "ዲጂታል አስተዳደርን ማሽከርከር!",
            "vital-events": "ወሳኝ ሁነቶች",
            "search": "ፈልግ",

        
     } },
   
  },
  lng: localStorage.getItem('i18nextLng') || 'en', // Default to 'en' if no language is selected
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'], // Look in localStorage first
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
});

export default i18n;
