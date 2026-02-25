'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-all group"
        >
            <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white">
                {language === 'en' ? 'Arabic' : 'English'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                {language === 'en' ? 'عربي' : 'EN'}
            </span>
        </motion.button>
    );
};
