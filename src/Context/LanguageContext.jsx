import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

// Custom hook for using context easily
export const useLanguage = () => useContext(LanguageContext);

// Language data
const translations = {
    EN: {
        home: "Home",
        shop: "Shop",
        join: "Join Us",
        footerText: "Providing reliable tech since 2025",
        footerService: "SERVICES",
        footerCompany: "COMPANY",
        footerLegal: "LEGAL",
    },
    BN: {
        home: "হোম",
        shop: "দোকান",
        join: "যোগ দিন",
        footerText: "২০২৫ সাল থেকে নির্ভরযোগ্য প্রযুক্তি সরবরাহ করা হচ্ছে",
        footerService: "পরিষেবা",
        footerCompany: "কোম্পানির",
        footerLegal: "আইনি",

    },
};


// Provider component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("EN");

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
