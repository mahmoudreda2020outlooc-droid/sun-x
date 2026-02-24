'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface GpsGridProps {
    posX: number; // 0-100
    posY: number; // 0-100
}

export const GpsGrid = ({ posX, posY }: GpsGridProps) => {
    return (
        <div className="w-full aspect-square bg-white/5 rounded-3xl border border-white/5 relative p-4 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-10">
                {[...Array(36)].map((_, i) => (
                    <div key={i} className="border border-white/20" />
                ))}
            </div>

            {/* Solar Panel Visualization Area */}
            <div className="absolute inset-4 border border-primary/20 bg-primary/5 rounded-xl flex items-center justify-center">
                <span className="text-[8px] font-bold opacity-10 uppercase tracking-[0.5em] -rotate-45">Solar Farm Zone-A</span>
            </div>

            {/* Robot Indicator */}
            <motion.div
                animate={{
                    left: `${16 + (posX * 0.68)}%`,
                    top: `${16 + (posY * 0.68)}%`
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center z-10"
            >
                <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 animate-ping" />
                <div className="absolute inset-0 bg-primary/40 rounded-full scale-110" />
                <MapPin className="w-4 h-4 text-primary fill-primary" />
            </motion.div>

            {/* Legend */}
            <div className="absolute bottom-2 left-4 text-[8px] font-bold opacity-30 flex gap-4 uppercase tracking-widest">
                <span>X: {Math.round(posX)}m</span>
                <span>Y: {Math.round(posY)}m</span>
            </div>
        </div>
    );
};
