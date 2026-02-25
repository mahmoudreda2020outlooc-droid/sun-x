'use client';

import React, { useState } from 'react';

import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu, Zap, ShieldCheck, Activity, ArrowRight,
    AlertTriangle, CheckCircle2, LayoutDashboard, Globe, Droplets,
    X, ZoomIn, Users, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { CreatorCredit } from '@/components/dashboard/CreatorCredit';

export default function LandingPage() {
    const { t, isRTL } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 [overflow-x:clip] w-full relative">
            {/* --- Navbar --- */}
            <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="glass-card border-white/10 bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-visible relative"
                >
                    {/* Glow Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 rounded-t-2xl" />

                    <div className="flex items-center justify-between px-5 py-3.5">
                        {/* Logo */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div
                                className="w-8 h-8 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Sun-X</span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary transition-colors">{t('nav.home')}</button>
                            <button onClick={() => scrollTo('problem')} className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary transition-colors text-nowrap">{t('nav.problem_solution')}</button>
                            <button onClick={() => scrollTo('features')} className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary transition-colors text-nowrap">{t('nav.features')}</button>
                            <button onClick={() => scrollTo('anatomy')} className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary transition-colors text-nowrap">{t('nav.technical')}</button>
                            <button onClick={() => scrollTo('about')} className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary transition-colors text-nowrap">{t('nav.about')}</button>
                        </div>

                        {/* Desktop: Right side */}
                        <div className="hidden md:flex items-center gap-3">
                            <LanguageToggle />
                            <NextLink
                                href="/dashboard"
                                className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary transition-all active:scale-95"
                            >
                                <LayoutDashboard className="w-3 h-3" />
                                {t('nav.dashboard')}
                            </NextLink>
                        </div>

                        {/* Mobile: Hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-primary transition-colors active:scale-95 ml-2"
                        >
                            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden overflow-hidden border-t border-white/5"
                            >
                                <div className="flex flex-col px-5 pt-3 pb-5 gap-1">
                                    {[
                                        { label: t('nav.home'), onClick: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); } },
                                        { label: t('nav.problem_solution'), onClick: () => scrollTo('problem') },
                                        { label: t('nav.features'), onClick: () => scrollTo('features') },
                                        { label: t('nav.technical'), onClick: () => scrollTo('anatomy') },
                                        { label: t('nav.about'), onClick: () => scrollTo('about') },
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={item.onClick}
                                            className="w-full text-left py-3 px-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-primary hover:bg-white/5 transition-all"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                    {/* Language Toggle inside mobile menu */}
                                    <div className="py-2 px-3">
                                        <LanguageToggle />
                                    </div>
                                    <NextLink
                                        href="/dashboard"
                                        className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-xl text-[11px] font-black uppercase tracking-widest text-primary transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        {t('nav.dashboard')}
                                    </NextLink>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </nav>

            <div id="home" />

            {/* --- Hero Section --- */}
            <section className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 text-center max-w-4xl"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <div
                            className="w-5 h-5 flex items-center justify-center cursor-zoom-in active:scale-90 transition-transform"
                            onClick={() => setSelectedImage('/logo.png')}
                        >
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = '<div class="w-2 h-2 rounded-full bg-primary animate-pulse" />';
                                }}
                            />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t('hero.tag')}</span>
                    </div>


                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
                        {t('hero.title_part1')}<span className="text-primary italic block sm:inline">{t('hero.title_part2')}</span>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-white/70 mb-4 tracking-tight px-4">
                        {t('hero.subtitle')}
                    </p>

                    <p className="text-sm md:text-base lg:text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed font-medium px-4">
                        {t('hero.description')}
                    </p>

                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-black uppercase tracking-widest">{t('hero.discover')}</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
                </motion.div>
            </section>

            {/* --- The Problem Section --- */}
            <section id="problem" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-block p-3 bg-red-500/10 rounded-2xl">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{t('problem.title_part1')}<span className="text-red-500 italic">{t('problem.title_part2')}</span></h2>
                        <p className="text-lg text-white/60 leading-relaxed font-medium transition-all">
                            {t('problem.description')}
                        </p>
                        <ul className="space-y-4">
                            {(t('problem.points')).map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-4 text-white/50 text-xs font-black uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Dirty Panels Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "/dirty-1.jpg",
                            "/dirty-2.jpg",
                            "/dirty-3.jpg",
                            "/dirty-4.jpg"
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-2 group overflow-hidden border-white/5 hover:border-red-500/20 transition-all cursor-zoom-in"
                                onClick={() => setSelectedImage(src)}
                            >
                                <div className="relative overflow-hidden rounded-lg aspect-video">
                                    <img
                                        src={src}
                                        alt={`Dirty Panel ${i + 1}`}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1559302995-f0a1bc139f37?auto=format&fit=crop&q=80&w=400"; // Fallback URL
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10">
                                            <ZoomIn className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Our Solution Section --- */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:order-2"
                    >
                        <div className="inline-block p-3 bg-primary/10 rounded-2xl">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{t('solution.title_part1')}<span className="text-primary">{t('solution.title_part2')}</span></h2>
                        <p className="text-lg text-white/60 leading-relaxed font-medium">
                            {t('solution.description')}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-card p-4 border-primary/20">
                                <h4 className="text-primary font-black text-xs uppercase mb-1">{t('solution.features.eco.title')}</h4>
                                <p className="text-[10px] text-white/40 font-bold leading-tight">{t('solution.features.eco.desc')}</p>
                            </div>
                            <div className="glass-card p-4 border-primary/20">
                                <h4 className="text-primary font-black text-xs uppercase mb-1">{t('solution.features.ai.title')}</h4>
                                <p className="text-[10px] text-white/40 font-bold leading-tight">{t('solution.features.ai.desc')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Solution Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:order-1">
                        {[
                            "/clean-1.jpg",
                            "/clean-2.jpg",
                            "/clean-3.jpg",
                            "/clean-4.jpg"
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-2 group overflow-hidden border-white/5 hover:border-primary/20 transition-all cursor-zoom-in"
                                onClick={() => setSelectedImage(src)}
                            >
                                <div className="relative overflow-hidden rounded-lg aspect-video">
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img
                                        src={src}
                                        alt={`Clean Panel ${i + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1509391366360-fe5bb65804bb?auto=format&fit=crop&q=80&w=400"; // Fallback URL
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-primary/50 p-2 rounded-full backdrop-blur-sm border border-white/10">
                                            <ZoomIn className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-primary rounded text-[8px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {t('solution.badge')}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Key Features Section --- */}
            <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('features.title_part1')}<span className="text-primary">{t('features.title_part2')}</span></h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs">{t('features.subtitle')}</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(t('features.items')).map((feature: any, i: number) => {
                        const iconMap = [Activity, Zap, Droplets, ShieldCheck];
                        const Icon = iconMap[i];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 group hover:border-primary/40 transition-colors"
                            >
                                <Icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-black uppercase tracking-tight mb-3 italic">{feature.title}</h3>
                                <p className="text-xs text-white/40 font-bold leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* --- Technical Anatomy Section --- */}
            <section id="anatomy" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-primary/10 rounded-[32px] blur-2xl" />
                        <div className="relative glass-card p-4 overflow-hidden rounded-[24px] border-primary/20 cursor-zoom-in group" onClick={() => setSelectedImage("/robot-1.jpg")}>
                            <img
                                src="/robot-1.jpg"
                                alt="Sun-X Robot Technical View"
                                className="w-full rounded-xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=800"; // Fallback if image not found
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-primary/20 p-4 rounded-full backdrop-blur-md border border-primary/30">
                                    <ZoomIn className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            {/* Technical Overlays */}
                            <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                                <div className="w-12 h-[1px] bg-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-black/60 px-2 py-1 rounded backdrop-blur-md">{t('anatomy.labels.lidar')}</span>
                            </div>
                            <div className="absolute bottom-1/4 left-10 flex flex-col items-start gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-black/60 px-2 py-1 rounded backdrop-blur-md">{t('anatomy.labels.wheels')}</span>
                                <div className="w-12 h-[1px] bg-primary" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">{t('anatomy.title_part1')}<span className="text-primary">{t('anatomy.title_part2')}</span></h2>
                            <p className="text-white/40 font-bold uppercase tracking-widest text-xs italic">{t('anatomy.subtitle')}</p>
                        </div>

                        <div className="grid gap-6">
                            {(t('anatomy.items')).map((part: any, i: number) => {
                                const iconMap = [Cpu, Zap, Droplets, ShieldCheck];
                                const Icon = iconMap[i];
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-6 p-6 glass-card border-white/5 hover:border-primary/20 group transition-all"
                                    >
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest mb-1 italic group-hover:text-primary transition-colors">{part.title}</h3>
                                            <p className="text-xs text-white/40 font-bold leading-relaxed">{part.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- About Us Section --- */}
            <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* The Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-block p-3 bg-primary/10 rounded-2xl">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                            {t('about.title_part1')}<span className="text-primary italic">{t('about.title_part2')}</span>
                        </h2>
                        <div className="space-y-6 text-base md:text-lg text-white/60 leading-relaxed font-medium">
                            <div className="space-y-2">
                                <h3 className="text-primary font-black uppercase tracking-widest text-sm italic">{t('about.story_title')}</h3>
                                <p>
                                    {t('about.story_p1')}
                                </p>
                            </div>
                            <p>
                                {t('about.story_p2')}
                            </p>
                        </div>
                        <div className="p-6 glass-card border-primary/20 bg-primary/5">
                            <h4 className="text-primary font-black text-xs uppercase mb-3 tracking-widest">{t('about.mission_title')}</h4>
                            <p className="text-sm text-white/70 font-bold leading-relaxed">
                                {t('about.mission_p')}
                            </p>
                        </div>
                    </motion.div>

                    {/* The Team - Premium Bento Portfolio Redesign */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-12 py-16"
                    >
                        <div className="flex items-end justify-between border-b border-white/10 pb-8">
                            <div className="text-left group/title cursor-default">
                                <motion.h3
                                    whileHover={{ letterSpacing: "0.05em" }}
                                    className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white/80 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
                                >
                                    {t('about.team_title')}<span className="italic text-primary drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{t('about.team_subtitle')}</span>
                                </motion.h3>
                                <p className="text-[9px] md:text-[10px] text-white/40 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mt-2 group-hover/title:text-primary/60 transition-colors">{t('about.team_count')}</p>
                            </div>
                            <div className="text-5xl font-black text-white/5 italic opacity-50 select-none">#TECHNO</div>
                        </div>

                        {/* Bento Grid Layout - Clean, Large, and Fills Space */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -5,
                                        backgroundColor: "rgba(59,130,246,0.12)",
                                        borderColor: "rgba(59,130,246,0.4)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                        delay: (i % 3) * 0.1
                                    }}
                                    className="group relative flex flex-col items-center justify-between p-6 md:p-10 glass-card border-white/10 hover:border-primary/40 transition-all cursor-crosshair overflow-hidden min-h-[200px]"
                                >
                                    {/* --- Stylized Cyber-Frame Corner 'Touch' --- */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary group-hover:w-6 group-hover:h-6 transition-all duration-300 rounded-tl-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary group-hover:w-6 group-hover:h-6 transition-all duration-300 rounded-tr-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary group-hover:w-6 group-hover:h-6 transition-all duration-300 rounded-bl-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary group-hover:w-6 group-hover:h-6 transition-all duration-300 rounded-br-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                                    {/* Subtle Ambient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Large ID Indicator */}
                                    <div className="absolute top-6 left-6 text-sm font-black font-mono text-white/10 group-hover:text-primary transition-colors">
                                        [{String(i + 1).padStart(2, '0')}]
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-col items-center gap-3 relative z-10 w-full">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/5 transition-all mb-2 md:mb-4">
                                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white/90 group-hover:text-white transition-colors text-center leading-none">
                                            {t('about.team_subtitle').toUpperCase()}<br />{isRTL ? 'عضو' : 'MEMBER'}
                                        </h4>
                                    </div>

                                    {/* Bottom Info Bar */}
                                    <div className="w-full flex items-center justify-between mt-6 pt-4 border-t border-white/5 group-hover:border-primary/20 transition-colors relative z-10">
                                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30 group-hover:text-white/60">
                                            {t('about.member_role')}
                                        </span>
                                        <div className="flex gap-1 items-center">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/20 group-hover:bg-primary group-hover:animate-pulse transition-all" />
                                            <span className="text-[7px] md:text-[8px] font-bold text-white/10 group-hover:text-primary/50">{t('about.member_status')}</span>
                                        </div>
                                    </div>

                                    {/* Corner Decoration */}
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-primary/0 group-hover:border-primary/20 transition-all rounded-br-2xl" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive Hint */}
                        <div className="text-center pt-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 animate-pulse">
                                {t('about.roster_status')}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Final CTA --- */}
            <section className="py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto glass-card p-10 md:p-20 text-center relative overflow-hidden bg-primary/5 border-primary/20"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                        <img
                            src="/robot-2.jpg"
                            alt="Sun-X Robot"
                            className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-700"
                            onClick={() => setSelectedImage("/robot-2.jpg")}
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-8 relative z-10">
                        {t('about.story_title') === 'Why Sun-X?' ? 'Ready to Optimize?' : 'جاهز للتحسين؟'}
                    </h2>
                    <NextLink href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm relative z-10 shadow-[0_0_50px_rgba(59,130,246,0.2)]"
                        >
                            {t('hero.cta')}
                        </motion.button>
                    </NextLink>
                </motion.div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-12 px-6 border-t border-white/5 text-center flex flex-col items-center gap-4">
                <CreatorCredit />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                    {t('footer.copyright')}
                </p>
            </footer>

            {/* --- Image Lightbox Modal --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ rotate: 90 }}
                            className="absolute top-8 right-8 p-3 bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full aspect-video md:aspect-auto flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged view"
                                className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-[0_0_100px_rgba(59,130,246,0.2)] border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
