
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  bordered?: boolean;
  children: React.ReactNode;
}

const Card = ({
  className,
  hover = false,
  glass = false,
  bordered = true,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        glass ? 'glass-panel' : 'bg-white',
        bordered && !glass ? 'border border-gray-100' : '',
        hover ? 'card-hover' : '',
        glass ? 'shadow-sm' : 'shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn('px-6 pt-6 flex flex-col space-y-1.5', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h3
      className={cn('font-display text-xl font-medium leading-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'video' | 'square' | 'auto';
}

const CardImage = ({
  className,
  aspectRatio = 'auto',
  ...props
}: CardImageProps) => {
  return (
    <div
      className={cn(
        'w-full overflow-hidden',
        aspectRatio === 'video' && 'aspect-video',
        aspectRatio === 'square' && 'aspect-square'
      )}
    >
      <img
        className={cn('w-full h-full object-cover', className)}
        {...props}
      />
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn('px-6 pb-6 pt-0 flex items-center', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardFooter,
};
