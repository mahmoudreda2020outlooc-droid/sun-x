'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BatteryBarProps {
    level: number; // 0 to 100
    size?: 'sm' | 'md' | 'lg';
}

export const BatteryBar = ({ level, size = 'md' }: BatteryBarProps) => {
    const getColor = () => {
        if (level > 60) return 'var(--status-ok)';
        if (level > 20) return 'var(--status-warning)';
        return 'var(--status-danger)';
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center px-1">
                <span className="text-sm font-medium opacity-70">Battery Status</span>
                <span className="text-sm font-bold" style={{ color: getColor() }}>{level}%</span>
            </div>
            <div
                className={cn(
                    "w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1",
                    size === 'sm' ? 'h-6' : size === 'md' ? 'h-10' : 'h-14'
                )}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ backgroundColor: getColor() }}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent w-full h-full" />
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 h-full"
                    />
                </motion.div>
            </div>
        </div>
    );
};
