
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-full h-full", showText = true }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 500 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* Deep Crimson Gradient */}
          <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C41E24" />
            <stop offset="100%" stopColor="#7A0F12" />
          </linearGradient>
          
          {/* Champagne Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAD2A0" />
            <stop offset="45%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8F7135" />
          </linearGradient>

          {/* Sutil Glow Effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Minimalist Compass Ring */}
        <circle cx="250" cy="220" r="210" stroke="#F1E0B0" strokeWidth="1" strokeDasharray="10 5" opacity="0.3" />
        
        {/* Main Emblem: The Delta Diamond */}
        <g filter="url(#glow)">
          {/* Left Wing - The Business Pillar */}
          <path d="M250 40L80 340H160L250 160V40Z" fill="url(#crimsonGrad)" />
          
          {/* Right Wing - The Property Pillar */}
          <path d="M250 40L420 340H340L250 160V40Z" fill="url(#goldGrad)" />
          
          {/* Central Core - The Ally (Intersection) */}
          <path d="M250 160L320 300H180L250 160Z" fill="white" opacity="0.9" />
          <path d="M250 200L290 280H210L250 200Z" fill="url(#goldGrad)" />
          
          {/* Bottom Foundation Bar */}
          <rect x="140" y="360" width="220" height="8" rx="4" fill="url(#goldGrad)" />
          <rect x="180" y="380" width="140" height="4" rx="2" fill="url(#crimsonGrad)" opacity="0.6" />
        </g>

        {showText && (
          <g transform="translate(0, 440)">
            <text 
              x="250" 
              y="0" 
              fontFamily="Playfair Display, serif" 
              fontSize="44" 
              fontWeight="900" 
              fill="#1A1A1A" 
              textAnchor="middle" 
              letterSpacing="4"
            >
              BUSINESS
            </text>
            <text 
              x="250" 
              y="45" 
              fontFamily="Playfair Display, serif" 
              fontSize="44" 
              fontWeight="900" 
              fill="#A11B20" 
              textAnchor="middle" 
              letterSpacing="4"
            >
              PARAGUANÁ
            </text>
            <text 
              x="250" 
              y="85" 
              fontFamily="Inter, sans-serif" 
              fontSize="14" 
              fontWeight="700" 
              fill="#C5A059" 
              textAnchor="middle" 
              letterSpacing="8"
              opacity="0.8"
            >
              CONSULTORÍA & SERVICIOS
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Logo;
