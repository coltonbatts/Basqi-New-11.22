import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
  children: React.ReactNode;
}

const Typography = ({ variant = 'body', className, children }: TypographyProps) => {
  const styles = {
    h1: 'text-[12vw] font-display uppercase leading-[0.8]',
    h2: 'text-6xl font-display uppercase',
    h3: 'text-3xl font-display uppercase',
    body: 'text-xl',
    caption: 'text-sm uppercase tracking-ultra font-bold',
  };

  return (
    <div className={cn(styles[variant], className)}>
      {children}
    </div>
  );
};

export default Typography;