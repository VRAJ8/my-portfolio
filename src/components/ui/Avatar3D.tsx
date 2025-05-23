import React from 'react';
import avatarImage from '../../assets/avatar.png';

interface Avatar3DProps {
  className?: string;
}

const Avatar3D: React.FC<Avatar3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={avatarImage} 
          alt="Vraj's Avatar" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Avatar3D; 