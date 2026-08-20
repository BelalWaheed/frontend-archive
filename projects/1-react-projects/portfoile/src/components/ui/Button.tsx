import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-accent-1 text-background font-semibold hover:bg-accent-1/90 shadow-lg shadow-accent-1/15 hover:shadow-accent-1/25 hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-muted text-foreground hover:bg-muted/80 border border-border hover:border-accent-1/20',
        outline:
          'border border-border bg-transparent hover:bg-muted/50 hover:border-accent-1/20 text-foreground',
        ghost:
          'hover:bg-muted/50 hover:text-foreground',
        link:
          'text-accent-1 underline-offset-4 hover:underline',
        gradient:
          'bg-gradient-to-r from-accent-1 via-accent-2 to-accent-1 text-background font-bold shadow-lg shadow-accent-1/15 hover:shadow-xl hover:shadow-accent-1/20 hover:scale-[1.02] active:scale-[0.98] bg-[length:200%_200%] animate-gradient',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
