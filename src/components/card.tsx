import grainImage from '@/assets/images/grain.jpg';
import { twMerge } from 'tailwind-merge';
import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export const Card = ({ className, children, ...other }: 
ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={twMerge(
      "bg-gray-800 rounded-3xl relative z-0 overflow-hidden border border-white/20",
      className
    )}>
      <div className="absolute inset-0 -z-10 opacity-5" style={{
        backgroundImage: `url(${grainImage.src})`
      }}
      ></div>
      {children}
    </div>
  )
}