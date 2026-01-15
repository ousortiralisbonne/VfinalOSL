import React, { ReactNode } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'fade';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const getDelayClass = (): string => {
    if (delay <= 0) return '';
    if (delay <= 100) return 'animate-delay-100';
    if (delay <= 200) return 'animate-delay-200';
    if (delay <= 300) return 'animate-delay-300';
    return 'animate-delay-400';
  };

  const animationClass = animation !== 'fade' ? animation : '';
  const visibilityClass = isVisible ? 'animate-visible' : `animate-hidden ${animationClass}`;

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${visibilityClass} ${getDelayClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
