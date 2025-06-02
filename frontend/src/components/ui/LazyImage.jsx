import { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderSrc = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    // Crear nueva imagen para precargar
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton 
            className="w-full h-full" 
            variant="rectangular"
          />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`
          transition-opacity duration-300 
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${className}
        `}
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

export default LazyImage; 