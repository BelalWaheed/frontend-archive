import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Scroll-triggered reveal: fades in + slides up as element enters viewport.
 */
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return { ref, isInView };
}
