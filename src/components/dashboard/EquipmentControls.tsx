'use client';

import { Droplets, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageContext';

interface EquipmentControlsProps {
    onToggle: (equipment: string, state: boolean) => void;
}

export const EquipmentControls = ({ onToggle }: EquipmentControlsProps) => {
    const { t, isRTL } = useLanguage();
    const [states, setStates] = useState({
        brush: false,
        vacuum: false,
        sensors: true,
        lights: false
    });

    const toggle = (key: string) => {
        setStates(prev => {
            const newState = { ...prev, [key]: !prev[key as keyof typeof prev] };
            onToggle(key.toUpperCase(), newState[key as keyof typeof newState]);
            return newState;
        });
    };

    const controls = [
        { key: 'brush', name: t('dashboard.equipment.brush'), icon: Droplets },
        { key: 'vacuum', name: t('dashboard.equipment.suction'), icon: Zap },
        { key: 'sensors', name: t('dashboard.equipment.sensors'), icon: ShieldAlert },
        { key: 'lights', name: t('dashboard.equipment.payload'), icon: Cpu }
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {controls.map((item) => {
                const isActive = (states as any)[item.key];
                return (
                    <button
                        key={item.key}
                        onClick={() => toggle(item.key)}
                        className={cn(
                            "flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border transition-all gap-1.5 md:gap-2",
                            isActive
                                ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                                : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10"
                        )}
                    >
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-wider md:tracking-widest leading-none text-center h-5 md:h-6 flex items-center justify-center break-words max-w-full">
                            {item.name}
                        </span>
                        <span className="text-[6px] md:text-[7px] font-bold opacity-50 uppercase tracking-tighter">
                            {isActive ? t('dashboard.status.on') : t('dashboard.status.off')}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
