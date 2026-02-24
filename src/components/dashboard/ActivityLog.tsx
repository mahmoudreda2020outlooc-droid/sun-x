'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Terminal, Clock, ShieldCheck, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

interface ActivityLogProps {
    logs: LogEntry[];
}

export const ActivityLog = ({ logs }: ActivityLogProps) => {
    const { t, isRTL } = useLanguage();

    const getTypeIcon = (type: LogEntry['type']) => {
        switch (type) {
            case 'success': return ShieldCheck;
            case 'warning': return AlertTriangle;
            case 'error': return AlertOctagon;
            default: return Info;
        }
    };

    const getTypeColor = (type: LogEntry['type']) => {
        switch (type) {
            case 'success': return 'text-status-ok bg-status-ok/10 border-status-ok/20';
            case 'warning': return 'text-status-warning bg-status-warning/10 border-status-warning/20';
            case 'error': return 'text-status-danger bg-status-danger/10 border-status-danger/20';
            default: return 'text-primary bg-primary/10 border-primary/20';
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className={cn("flex items-center gap-3 mb-6 px-2", isRTL && "flex-row-reverse")}>
                <Terminal className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-black tracking-widest text-white/50 italic uppercase">{t('dashboard.sections.logs')}</h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2 rtl:pr-0 rtl:pl-2">
                <AnimatePresence initial={false}>
                    {logs.map((log) => {
                        const Icon = getTypeIcon(log.type);
                        return (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={cn(
                                    "flex items-start gap-4 p-4 rounded-xl border transition-colors",
                                    getTypeColor(log.type),
                                    isRTL && "flex-row-reverse text-right"
                                )}
                            >
                                <div className="mt-1 p-1.5 rounded-lg bg-white/5">
                                    <Icon className="w-3 h-3" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={cn("flex items-center gap-3 mb-2 font-mono text-[9px] opacity-50", isRTL && "flex-row-reverse")}>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-2.5 h-2.5" />
                                            <span>{log.timestamp}</span>
                                        </div>
                                        <span>TRM-{log.id.toUpperCase()}</span>
                                    </div>
                                    <p className="text-[10px] font-bold leading-relaxed tracking-wider uppercase">
                                        {log.message}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
