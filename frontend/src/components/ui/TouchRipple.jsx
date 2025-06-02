import { useState, useEffect } from 'react';

const TouchRipple = ({ color = 'rgba(255, 255, 255, 0.3)' }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const cleanup = ripples.filter(ripple => Date.now() - ripple.timestamp < 1000);
    if (cleanup.length !== ripples.length) {
      setRipples(cleanup);
    }
  }, [ripples]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    const ripple = {
      x: event.clientX - rect.left - radius,
      y: event.clientY - rect.top - radius,
      diameter,
      timestamp: Date.now(),
      id: Date.now()
    };

    setRipples([...ripples, ripple]);
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onClick={createRipple}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x + 'px',
            top: ripple.y + 'px',
            width: ripple.diameter + 'px',
            height: ripple.diameter + 'px',
            backgroundColor: color
          }}
        />
      ))}
    </div>
  );
};

export default TouchRipple; 