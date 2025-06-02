import { useState } from 'react';
import Transition from './Transition';

const positions = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2'
};

const arrows = {
  top: 'bottom-[-6px] border-t-black',
  bottom: 'top-[-6px] border-b-black',
  left: 'right-[-6px] border-l-black',
  right: 'left-[-6px] border-r-black'
};

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 200,
  className = ''
}) => {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setShow(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setShow(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <Transition
        show={show}
        type="fade"
          className={`
          absolute z-50 px-2 py-1 text-sm text-white bg-black rounded
          whitespace-nowrap ${positions[position]} ${className}
          `.trim()}
        >
            {content}
          <div
            className={`
            absolute w-0 h-0
            border-4 border-transparent
              ${arrows[position]}
            `.trim()}
          />
      </Transition>
    </div>
  );
};

export default Tooltip; 