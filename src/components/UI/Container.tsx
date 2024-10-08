import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export function Container({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-full max-w-[90%] xl:max-w-screen-lg 3xl:max-w-screen-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
