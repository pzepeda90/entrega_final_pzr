import { useState, useEffect, useRef } from 'react';

const VirtualList = ({
  items,
  renderItem,
  itemHeight = 50,
  containerHeight = 400,
  overscan = 3
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const totalHeight = items.length * itemHeight;
  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    startIndex + visibleItems + 2 * overscan
  );

  const visibleItemsData = items.slice(startIndex, endIndex);
  
  const handleScroll = (event) => {
    setScrollTop(event.target.scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
    >
      <div
        style={{
          height: totalHeight,
          position: 'relative'
        }}
      >
        {visibleItemsData.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList; 