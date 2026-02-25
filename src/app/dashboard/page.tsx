'use client';

import { useState, useEffect } from 'react';
import { BatteryBar } from '@/components/dashboard/BatteryBar';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { DirectionalControls } from '@/components/dashboard/DirectionalControls';
import { EquipmentControls } from '@/components/dashboard/EquipmentControls';
import { ActivityLog, LogEntry } from '@/components/dashboard/ActivityLog';
import { EfficiencyChart } from '@/components/dashboard/EfficiencyChart';
import { CameraFeed } from '@/components/dashboard/CameraFeed';
import { GpsGrid } from '@/components/dashboard/GpsGrid';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Signal, Gauge, ShieldCheck,
    CloudRain, Wind, Thermometer, Zap, Cpu, MousePointer2, ArrowLeft, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useLanguage } from '@/components/providers/LanguageContext';
import { CreatorCredit } from '@/components/dashboard/CreatorCredit';

export default function Dashboard() {
    const { t, isRTL } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // --- State Management ---
    const [battery, setBattery] = useState(85);
    const [speed, setSpeed] = useState(0.0);
    const [status, setStatus] = useState<'IDLE' | 'CLEANING' | 'ERROR' | 'AUTO'>('IDLE');
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [gpsPos, setGpsPos] = useState({ x: 45, y: 30 });
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: '1', timestamp: new Date().toLocaleTimeString(), message: t('dashboard.logs.init'), type: 'info' },
        { id: '2', timestamp: new Date().toLocaleTimeString(), message: t('dashboard.logs.link'), type: 'success' },
    ]);

    // --- Helpers ---
    const addLog = (message: string, type: LogEntry['type'] = 'info') => {
        const newLog: LogEntry = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString(),
            message,
            type
        };
        setLogs(prev => [newLog, ...prev.slice(0, 19)]); // Keep last 20 logs
    };

    // --- Effects & Simulation ---
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoMode) {
            interval = setInterval(() => {
                setGpsPos(prev => ({
                    x: (prev.x + (Math.random() - 0.5) * 2),
                    y: (prev.y + 1) % 100
                }));
                setSpeed(0.52);
                if (Math.random() > 0.95) addLog(t('dashboard.logs.auto_correct'), 'info');
            }, 1000);
        } else {
            setSpeed(0);
        }
        return () => clearInterval(interval);
    }, [isAutoMode]);

    useEffect(() => {
        const batteryTimer = setInterval(() => {
            setBattery(prev => Math.max(0, prev - 0.05));
        }, 5000);
        return () => clearInterval(batteryTimer);
    }, []);

    // --- Handlers ---
    const handleCommand = (cmd: string) => {
        if (isAutoMode && cmd !== 'EMERGENCY_STOP') {
            addLog(t('dashboard.logs.blocked'), 'warning');
            return;
        }

        addLog(`Directional Command: ${cmd}`, 'info');
        if (cmd === 'EMERGENCY_STOP') {
            setStatus('ERROR');
            setIsAutoMode(false);
            setSpeed(0);
            addLog(t('dashboard.logs.emergency'), 'error');
        }
    };

    const handleEquipment = (equip: string, state: boolean) => {
        addLog(`${equip} toggled: ${state ? 'ON' : 'OFF'}`, state ? 'success' : 'info');
        if (state) setStatus('CLEANING');
        else if (!isAutoMode) setStatus('IDLE');
    };

    const toggleAutoMode = () => {
        const nextState = !isAutoMode;
        setIsAutoMode(nextState);
        setStatus(nextState ? 'AUTO' : 'IDLE');
        addLog(`Operation mode switched to ${nextState ? 'AUTO-PILOT' : 'MANUAL'}`, nextState ? 'success' : 'info');
    };

    // --- Authentication ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState(false);

    const handleAuth = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (passcode === '8208') {
            setIsAuthenticated(true);
            setAuthError(false);
        } else {
            setAuthError(true);
            setPasscode('');
            // Shake effect or feedback could be added here
        }
    };

    if (!isAuthenticated) {
        return (
            <main
                dir={isRTL ? 'rtl' : 'ltr'}
                className="h-screen w-full flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden"
            >
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-md z-10"
                >
                    <div className="glass-card p-10 border-primary/20 bg-white/[0.02] backdrop-blur-2xl relative overflow-hidden group">
                        {/* Animated Border/Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:border-primary/40 transition-colors">
                                <ShieldCheck className="w-10 h-10 text-primary" />
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">
                                {t('dashboard.auth.title')}
                            </h1>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-10">
                                {t('dashboard.auth.subtitle')}
                            </p>

                            <form onSubmit={handleAuth} className="w-full space-y-4">
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={passcode}
                                        onChange={(e) => {
                                            setPasscode(e.target.value);
                                            if (authError) setAuthError(false);
                                        }}
                                        placeholder={t('dashboard.auth.placeholder')}
                                        className={cn(
                                            "w-full bg-white/5 border px-6 py-5 rounded-xl text-center text-2xl font-black tracking-[0.5em] focus:outline-none transition-all placeholder:text-[10px] placeholder:tracking-[0.2em] placeholder:font-black placeholder:uppercase placeholder:text-white/20",
                                            authError
                                                ? "border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                                                : "border-white/10 focus:border-primary/50 text-primary"
                                        )}
                                        autoFocus
                                    />
                                    {authError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-3"
                                        >
                                            {t('dashboard.auth.error')}
                                        </motion.p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98]"
                                >
                                    {t('dashboard.auth.button')}
                                </button>
                            </form>

                            <NextLink
                                href="/"
                                className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft className={cn("w-3 h-3", isRTL && "rotate-180")} />
                                {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
                            </NextLink>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <CreatorCredit />
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main
            dir={isRTL ? 'rtl' : 'ltr'}
            lang={isRTL ? 'ar' : 'en'}
            className="h-screen flex flex-col max-w-[1700px] mx-auto overflow-hidden"
        >

            {/* 2. Main Terminal Grid & Header Wrapper */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 lg:p-10 pb-10">
                {/* 1. Header Section */}
                <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-10">
                    <div className="flex flex-col gap-2 w-full xl:w-auto">
                        <div className="flex items-center gap-4 w-full">
                            <NextLink href="/" className="shrink-0 hover:opacity-70 transition-opacity p-2.5 bg-white/5 rounded-xl border border-white/10 group">
                                <ArrowLeft className={cn("w-5 h-5 text-white/50 group-hover:text-primary transition-colors", isRTL && "rotate-180")} />
                            </NextLink>
                            <div
                                className="shrink-0 relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center p-1.5 bg-white/5 rounded-xl border border-white/10 cursor-zoom-in active:scale-95 transition-transform overflow-hidden shadow-inner"
                                onClick={() => setSelectedImage('/logo.png')}
                            >
                                <img
                                    src="/logo.png"
                                    alt="Sun-X Robotics Logo"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = '<svg class="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>';
                                    }}
                                />
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none truncate">
                                {t('hero.title_part1')}<span className="text-primary italic">{t('hero.title_part2')}</span>
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                            <div className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm shrink-0",
                                isConnected ? 'bg-status-ok/10 text-status-ok border border-status-ok/20' : 'bg-status-danger/10 text-status-danger border border-status-danger/20'
                            )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full bg-current", isConnected && "status-pulse")} />
                                {isConnected ? t('dashboard.link_stable') : t('dashboard.link_lost')}
                            </div>
                            <div className="flex items-center gap-4 border-l border-white/10 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4 overflow-x-auto no-scrollbar">
                                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 shrink-0">
                                    <Thermometer className="w-3 h-3 text-primary opacity-70" />
                                    <span className="text-[10px] font-bold text-white/70">28°C</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 shrink-0">
                                    <Wind className="w-3 h-3 text-primary opacity-70" />
                                    <span className="text-[10px] font-bold text-white/70">12km/h</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 shrink-0">
                                    <CloudRain className="w-3 h-3 text-primary opacity-70" />
                                    <span className="text-[10px] font-bold text-white/70">0%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto mt-4 xl:mt-0">
                        <button
                            onClick={toggleAutoMode}
                            className={cn(
                                "px-10 py-5 rounded-2xl font-extrabold uppercase tracking-[0.2em] text-[11px] transition-all border relative overflow-hidden group",
                                isAutoMode
                                    ? "bg-primary text-white border-primary shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                                    : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95"
                            )}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isAutoMode && <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />}
                                {isAutoMode ? t('dashboard.auto_on') : t('dashboard.manual')}
                            </span>
                        </button>
                        <div className="w-full sm:w-72 lg:w-80 glass-card p-5 border-primary/10">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{t('dashboard.battery_status')}</span>
                                <span className="text-[10px] font-black text-primary">{Math.round(battery)}%</span>
                            </div>
                            <BatteryBar level={Math.round(battery)} size="sm" />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

                    {/* Row 1: Key Telemetry */}
                    <StatusCard
                        title={t('dashboard.status.title')}
                        value={t(`dashboard.status.${status.toLowerCase()}` as any)}
                        icon={Activity}
                        status={status === 'ERROR' ? 'danger' : status === 'AUTO' ? 'ok' : 'neutral'}
                        description={isAutoMode ? t('dashboard.status.ai_active') : t('dashboard.status.waiting')}
                    />
                    <StatusCard
                        title={t('dashboard.speed')}
                        value={`${speed.toFixed(2)} ${isRTL ? 'م/ث' : 'm/s'}`}
                        icon={Gauge}
                        status={speed > 0 ? 'ok' : 'neutral'}
                    />
                    <StatusCard
                        title={t('dashboard.yield')}
                        value="98.2%"
                        icon={Zap}
                        status="ok"
                        description={t('dashboard.yield_desc')}
                    />
                    <StatusCard
                        title={t('dashboard.core')}
                        value={t('dashboard.healthy')}
                        icon={ShieldCheck}
                        status="ok"
                    />

                    {/* Column: Visuals & Position (Spans 2 rows) */}
                    <div className="lg:col-span-2 xl:col-span-2 row-span-2 flex flex-col gap-6">
                        <section className="glass-card flex-1 min-h-[400px] flex flex-col p-6 overflow-hidden">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="text-sm font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                                    <Signal className="w-4 h-4" /> {t('dashboard.sections.visual')}
                                </h3>
                            </div>
                            <div className="flex-1">
                                <CameraFeed />
                            </div>
                        </section>
                    </div>

                    {/* Column: Controls & Hardware */}
                    <div className="xl:col-span-1 flex flex-col gap-6">
                        <section className="glass-card p-6 border-primary/5">
                            <h3 className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-6 text-center italic flex items-center justify-center gap-2">
                                <MousePointer2 className="w-3 h-3" /> {t('dashboard.sections.navigation')}
                            </h3>
                            <DirectionalControls onCommand={handleCommand} />
                        </section>

                        <section className="glass-card p-6">
                            <h3 className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-4 text-center italic">{t('dashboard.sections.service')}</h3>
                            <EquipmentControls onToggle={handleEquipment} />
                        </section>
                    </div>

                    {/* Column: Analytics & Mapping */}
                    <div className="xl:col-span-1 flex flex-col gap-6">
                        <section className="glass-card p-6 flex flex-col">
                            <h3 className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-2">{t('dashboard.sections.gps')}</h3>
                            <GpsGrid posX={gpsPos.x} posY={gpsPos.y} />
                        </section>

                        <section className="glass-card p-6 overflow-hidden h-full">
                            <h3 className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-2">{t('dashboard.sections.efficiency')}</h3>
                            <EfficiencyChart />
                        </section>
                    </div>

                    {/* Bottom Wide Column: Logs */}
                    <div className="lg:col-span-3 xl:col-span-1 min-h-[300px]">
                        <section className="glass-card p-6 h-full border-white/5">
                            <ActivityLog logs={logs} />
                        </section>
                    </div>

                </div>

                {/* Footer */}
                <footer className="mt-8 pt-6 border-t border-white/5 flex justify-center items-center pb-8">
                    <CreatorCredit />
                </footer>
            </div>

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
                            className="relative max-w-2xl w-full flex items-center justify-center"
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
        </main >
    );
}
