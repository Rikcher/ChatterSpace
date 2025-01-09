'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as blobs2 from 'blobs/v2';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '@/shared/lib/utils';

interface BlobProps {
  size?: number;
  extraPoints?: number;
  randomness?: number;
  duration?: number;
  className?: string;
}

const Blob: React.FC<BlobProps> = ({
  size = 256,
  extraPoints = 8,
  randomness = 3,
  duration = 16000,
  className,
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [currentSeed, setCurrentSeed] = useState(Math.random());

  const generatePath = (seed: number) =>
    blobs2.svgPath({ seed, size, extraPoints, randomness });

  useEffect(() => {
    const startPath = generatePath(currentSeed);
    const nextSeed = Math.random();
    const endPath = generatePath(nextSeed);

    if (pathRef.current) {
      pathRef.current.setAttribute('d', startPath);
    }

    const animation = anime({
      targets: pathRef.current,
      d: [{ value: startPath }, { value: endPath }],
      duration: duration,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate',
      complete: () => {
        setCurrentSeed(nextSeed);
      },
    });

    return () => animation.pause();
  }, [currentSeed, duration, extraPoints, randomness, size]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('absolute opacity-60 blur-[80px] z-[-1]', className)}
    >
      <path ref={pathRef} fill="url(#gradient)" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="100%" stopColor="#E2276C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Blob;
