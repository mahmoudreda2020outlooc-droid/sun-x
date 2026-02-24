'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageContext';

interface StatusCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    status?: 'ok' | 'warning' | 'danger' | 'neutral';
    description?: string;
}

export const StatusCard = ({ title, value, icon: Icon, status = 'neutral', description }: StatusCardProps) => {
    const { isRTL } = useLanguage();
    const getStatusColor = () => {
        switch (status) {
            case 'ok': return 'text-status-ok';
            case 'warning': return 'text-status-warning';
            case 'danger': return 'text-status-danger';
            default: return 'text-primary';
        }
    };

    const getStatusGlow = () => {
        switch (status) {
            case 'ok': return 'shadow-[0_0_15px_rgba(16,185,129,0.2)]';
            case 'warning': return 'shadow-[0_0_15px_rgba(245,158,11,0.2)]';
            case 'danger': return 'shadow-[0_0_15px_rgba(239,68,68,0.2)]';
            default: return '';
        }
    };

    return (
        <div className={cn(
            "glass-card p-4 md:p-6 border-b-2 transition-all hover:scale-[1.02]",
            getStatusColor(),
            isRTL ? "text-right" : "text-left"
        )}>
            <div className={cn("flex items-center gap-3 md:gap-4 mb-2 md:mb-3", isRTL && "flex-row-reverse")}>
                <div className="p-1.5 md:p-2 bg-white/5 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 opacity-70" />
                </div>
                <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-none truncate">{title}</h3>
            </div>
            <div className="flex flex-col gap-0.5 md:gap-1">
                <div className="text-xl md:text-2xl font-black tracking-tight text-white uppercase italic leading-none">
                    {value}
                </div>
                {description && (
                    <div className="text-[8px] md:text-[10px] font-bold opacity-30 uppercase tracking-widest truncate">
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
};
