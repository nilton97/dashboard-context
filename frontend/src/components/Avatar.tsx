import { useState } from 'react';

interface AvatarProps {
  nome: string;
  foto?: string;
  size?: number;
}

export default function Avatar({ nome, foto, size = 40 }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const inicial = nome.charAt(0).toUpperCase();
  
  return (
    <div className="flex items-center justify-center">
      {foto && !imageError ? (
        <img 
          src={foto} 
          alt={nome}
          className="rounded-full object-cover border-2"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`,
            borderColor: '#e0e0e0'
          }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          className="rounded-full bg-cofre-blue text-white flex items-center justify-center font-semibold border-2"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`, 
            fontSize: `${size * 0.35}px`,
            borderColor: '#e0e0e0'
          }}
        >
          {inicial}
        </div>
      )}
    </div>
  );
}
