'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Globe, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';
import { cn } from '@/lib/utils';

export function CreatorCredit() {
    const { t, isRTL } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const phoneNumber = "01004897420";
    const websiteUrl = "https://mr-roan.vercel.app";

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors focus:outline-none"
            >
                <span>{t('footer.dev_by')}</span>
                <span className="text-white/60 group-hover:text-primary border-b border-white/20 group-hover:border-primary/50 transition-all">
                    {t('footer.dev_name')}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop to close */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px]"
                        />

                        {/* Contact Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10, x: isRTL ? 20 : -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className={cn(
                                "absolute bottom-full mb-4 z-[70] min-w-[280px] glass-card p-5 border-white/10 shadow-2xl",
                                isRTL ? "right-0" : "left-0"
                            )}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-1">
                                        {t('footer.dev_name')}
                                    </h4>
                                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-tight"> Full-Stack Developer & UI/UX Designer</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X className="w-3 h-3 text-white/30" />
                                </button>
                            </div>

                            <div className="grid gap-2">
                                <a
                                    href={`https://wa.me/2${phoneNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-primary/10 rounded-xl border border-white/5 hover:border-primary/20 transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Phone className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{t('footer.call')}</span>
                                        <span className="text-xs font-bold text-white/80">{phoneNumber}</span>
                                    </div>
                                </a>

                                <a
                                    href={websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-primary/10 rounded-xl border border-white/5 hover:border-primary/20 transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Globe className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{t('footer.visit')}</span>
                                        <span className="text-xs font-bold text-white/80 truncate max-w-[160px]">mr-roan.vercel.app</span>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-white/20 ml-auto group-hover:text-primary transition-colors" />
                                </a>
                            </div>

                            {/* Decorative Corner */}
                            <div
                                className={cn(
                                    "absolute top-full w-4 h-4 overflow-hidden",
                                    isRTL ? "right-6" : "left-6"
                                )}
                            >
                                <div className="w-3 h-3 bg-[#0a0a0a] border-r border-b border-white/10 rotate-45 -translate-y-1/2 mx-auto" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
