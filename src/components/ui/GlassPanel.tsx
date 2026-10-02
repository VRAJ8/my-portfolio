import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  /** Max tilt in degrees toward the pointer. 0 disables tilting. */
  tilt?: number;
}

/**
 * A visionOS-style glass window: blurred translucent material, lit edge,
 * a highlight that follows the pointer and an optional subtle 3D tilt.
 */
const GlassPanel: React.FC<GlassPanelProps> = ({ tilt = 0, className = '', style, children, onPointerMove, onPointerLeave, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mx', `${x}px`);
    ref.current.style.setProperty('--my', `${y}px`);
    if (tilt) {
      rotateY.set((x / rect.width - 0.5) * tilt * 2);
      rotateX.set(-(y / rect.height - 0.5) * tilt * 2);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass specular ${className}`}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1400, ...style } : style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;
