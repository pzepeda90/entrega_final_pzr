import { forwardRef } from 'react';
import TouchRipple from './TouchRipple';

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white relative overflow-hidden',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 relative overflow-hidden',
  danger: 'bg-red-500 hover:bg-red-600 text-white relative overflow-hidden',
  success: 'bg-green-500 hover:bg-green-600 text-white relative overflow-hidden',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white relative overflow-hidden',
  info: 'bg-blue-500 hover:bg-blue-600 text-white relative overflow-hidden',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 relative overflow-hidden',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white relative overflow-hidden'
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

const Button = forwardRef(({
      children,
  type = 'button',
      variant = 'primary',
      size = 'md',
  className = '',
      isLoading = false,
      disabled = false,
      ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
    return (
      <button
        ref={ref}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
      <span className={`relative z-10 flex items-center gap-2 ${isLoading ? 'opacity-0' : ''}`}>
        {children}
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <TouchRipple color={variant === 'ghost' || variant === 'outline' ? 'rgba(0, 0, 0, 0.1)' : undefined} />
      </button>
    );
});

Button.displayName = 'Button';

export default Button; 