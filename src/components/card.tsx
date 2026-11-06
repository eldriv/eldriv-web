import { twMerge } from 'tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';

export const Card = ({ className, children, ...other }:
ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={twMerge(
        "glass rounded-2xl relative z-0 overflow-hidden",
        className
      )}
      {...other}
    >
      {children}
    </div>
  )
}
