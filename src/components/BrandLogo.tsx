import React from 'react';
import Image from 'next/image';

export default function BrandLogo({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', ...style }} className={className}>
      <Image 
        src="/logo.png" 
        alt="Education South West" 
        width={300} 
        height={60} 
        style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
        priority
      />
    </div>
  );
}
