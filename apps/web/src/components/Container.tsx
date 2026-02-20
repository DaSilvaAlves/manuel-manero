import * as React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'sm' | 'lg' | 'xl'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-2xl',
      default: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

export { Container }
