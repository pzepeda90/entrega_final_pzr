import { Transition as HeadlessTransition } from '@headlessui/react';

const animations = {
  fade: {
    enter: 'transition-opacity duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition-opacity duration-200',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  scale: {
    enter: 'transition-all duration-300',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: 'transition-all duration-200',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  },
  slideRight: {
    enter: 'transition-all duration-300',
    enterFrom: 'opacity-0 translate-x-[-100%]',
    enterTo: 'opacity-100 translate-x-0',
    leave: 'transition-all duration-200',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: 'opacity-0 translate-x-[100%]',
  },
  slideDown: {
    enter: 'transition-all duration-300',
    enterFrom: 'opacity-0 -translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transition-all duration-200',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 -translate-y-4',
  },
};

const Transition = ({ 
  show, 
  type = 'fade',
  children,
  className = '',
  as = 'div'
}) => {
  const animation = animations[type];

  return (
    <HeadlessTransition
      show={show}
      as={as}
      className={className}
      enter={animation.enter}
      enterFrom={animation.enterFrom}
      enterTo={animation.enterTo}
      leave={animation.leave}
      leaveFrom={animation.leaveFrom}
      leaveTo={animation.leaveTo}
    >
      {children}
    </HeadlessTransition>
  );
};

export default Transition; 