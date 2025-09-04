import React, { useEffect, useRef } from 'react';
import { createMorphingBlob } from '../utils/animations';

interface MorphingBlobProps {
  className?: string;
  size?: number;
  color?: string;
}

const MorphingBlob: React.FC<MorphingBlobProps> = ({ 
  className = '', 
  size = 200, 
  color = 'rgba(59, 130, 246, 0.1)' 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      createMorphingBlob(svgRef.current as any);
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 240 80"
      className={`absolute ${className}`}
      style={{ zIndex: 1 }}
    >
      <path
        d="M20,20 Q40,0 60,20 T100,20 T140,20 T180,20 T220,20 Q240,40 220,60 T180,60 T140,60 T100,60 T60,60 T20,60 Q0,40 20,20 Z"
        fill={color}
        filter="blur(20px)"
      />
    </svg>
  );
};

export default MorphingBlob;
