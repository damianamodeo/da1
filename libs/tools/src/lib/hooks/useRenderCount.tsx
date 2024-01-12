import { useEffect, useRef } from 'react';

export const useRenderCount = () => {
  const count = useRef(1);
  useEffect(() => {
    count.current++;
    return;
  });
  return count.current;
};

export default useRenderCount;
