import { useRef, useState, useEffect, type ReactNode } from 'react';
import './AnimatedList.css';

interface AnimatedItemProps {
  children: ReactNode;
  index: number;
}

export const AnimatedItem = ({ children, index }: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); 
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-index={index}
      className={`animated-item-node ${isVisible ? 'is-visible' : ''}`}
      style={{ cursor: 'default', marginBottom: '1rem' }}
    >
      {children}
    </div>
  );
};

const AnimatedList = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`animated-list-container ${className}`}>
      <div className="scroll-area">
        {children}
      </div>
    </div>
  );
};

export default AnimatedList;