import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center font-bold uppercase tracking-ultra transition-colors',
          {
            'bg-white text-black hover:bg-neutral-200': variant === 'default',
            'border-2 border-white text-white hover:bg-white/10': variant === 'outline',
            'px-6 py-3': size === 'default',
            'px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;