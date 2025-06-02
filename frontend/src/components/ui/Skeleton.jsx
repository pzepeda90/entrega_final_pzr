const Skeleton = ({ className = '', variant = 'rectangular', height, width }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variants = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  const styles = {
    height: height ? `${height}px` : 'auto',
    width: width ? `${width}px` : '100%'
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={styles}
    />
  );
};

export default Skeleton; 