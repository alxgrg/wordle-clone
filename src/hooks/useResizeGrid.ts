import { MutableRefObject, useEffect, useState } from 'react';

export const useResizeGrid = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 350, height: 420 });
  useEffect(() => {
    if (!ref.current) return;
    // Watch for element height change
    const resizeObserver = new ResizeObserver(() => {
      // Get element dimensions
      const { current } = ref;
      let height = current?.clientHeight;
      let width = current?.clientWidth;
      // Calculate grid size
      if (height) {
        const newWidth = Math.min(Math.floor(height * (5 / 6)), 350);
        const newHeight = 6 * Math.floor(newWidth / 5);
        // Set dimensions
        setDimensions({ width: newWidth, height: newHeight });
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [ref]);

  return dimensions;
};
