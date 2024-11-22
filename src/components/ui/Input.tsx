import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm uppercase tracking-ultra font-bold mb-4 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-black border-2 border-white px-8 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;