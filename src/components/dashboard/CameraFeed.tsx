'use client';

import { motion } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';

export const CameraFeed = () => {
    return (
        <div className="h-full w-full relative group">
            <div className="absolute inset-0 bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5">
                {/* Animated Static/Noise Background */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://media.giphy.com/media/oEI9uWUicGLe98tHjC/giphy.gif')] bg-cover mix-blend-screen" />

                {/* Placeholder Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                    <Camera className="w-12 h-12 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Feed / No Input</span>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20" />

                {/* HUD Elements */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-status-danger"
                    />
                    <span className="text-[10px] font-bold text-white/50 tracking-widest">REC: CAM_01</span>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-3">
                    <Maximize2 className="w-4 h-4 text-white/30 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
};
