import React from 'react';

interface TechIconProps {
  component?: React.ElementType | undefined;
}

export const TechIcon = ({ component }: TechIconProps): JSX.Element => {
  if (!component) {
    return (
      <div className="flex items-center justify-center bg-gray-200 rounded-md size-10">
        <span className="text-gray-500 text-xs">Icon</span>
      </div>
    );
  }
  
  const Component = component;
  return <>
  <Component className="size-10 fill-[url(#tech-icon-gradient)]"/>
  <svg className="size-0 absolute">
    <linearGradient id="tech-icon-gradient">
        <stop offset="50%" stopColor="rgb(110 231 183)" />
        <stop offset="100%" stopColor="rgb(253, 129, 40)" />
    </linearGradient>
  </svg>
  </>
};