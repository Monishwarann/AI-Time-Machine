import React from 'react';

export const TimelineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Horizontal Timeline Strand */}
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffb703" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Central Connecting Strand */}
        <path
          d="M 50 240 Q 300 200 600 260 T 1200 220 T 1800 250"
          fill="none"
          stroke="url(#grad-line)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Temporal Node Points */}
        <circle cx="200" cy="225" r="4" fill="#38bdf8" className="animate-ping" />
        <circle cx="200" cy="225" r="6" fill="#0284c7" />

        <circle cx="550" cy="255" r="5" fill="#00f0ff" />
        <circle cx="950" cy="228" r="7" fill="#ffb703" />
        <circle cx="1400" cy="235" r="5" fill="#a855f7" />
      </svg>
    </div>
  );
};
