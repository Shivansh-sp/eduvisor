import React, { useEffect, useRef } from 'react';
import { createParticleSystem } from '../utils/animations';

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  particleCount = 50, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      createParticleSystem(containerRef.current, particleCount);
    }
  }, [particleCount]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
