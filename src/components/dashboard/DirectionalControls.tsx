'use client';

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageContext';

interface DirectionalControlsProps {
    onCommand: (direction: string) => void;
}

export const DirectionalControls = ({ onCommand }: DirectionalControlsProps) => {
    const { t } = useLanguage();
    const ControlBtn = ({ direction, icon: Icon, className }: { direction: string; icon: any; className?: string }) => (
        <button
            onMouseDown={() => onCommand(direction)}
            onMouseUp={() => onCommand('STOP')}
            className={cn(
                "control-btn w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl glass-card border-white/5 bg-white/5 hover:bg-white/10 active:bg-primary/20 hover:border-primary/50 text-white/70 hover:text-primary",
                className
            )}
        >
            <Icon className="w-6 h-6 md:w-8 md:h-8" />
        </button>
    );

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-1 md:gap-2">
                <div />
                <ControlBtn direction="FORWARD" icon={ChevronUp} />
                <div />

                <ControlBtn direction="LEFT" icon={ChevronLeft} />
                <button
                    onClick={() => onCommand('STOP')}
                    className="control-btn w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl bg-status-danger/20 border border-status-danger/50 text-status-danger hover:bg-status-danger/30"
                >
                    <Square className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                </button>
                <ControlBtn direction="RIGHT" icon={ChevronRight} />

                <div />
                <ControlBtn direction="BACKWARD" icon={ChevronDown} />
                <div />
            </div>

            <button
                onClick={() => onCommand('EMERGENCY_STOP')}
                className="w-full mt-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-status-danger text-white text-[11px] md:text-sm font-black tracking-[0.2em] shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:brightness-110 active:scale-[0.98] transition-all uppercase glow-border"
            >
                {t('dashboard.sections.emergency_stop')}
            </button>
        </div>
    );
};
