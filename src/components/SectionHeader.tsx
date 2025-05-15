import React from 'react';

export const SectionHeader = () => ({
    title,
    eyebrow,
    description,
}: {
    title: string;
    eyebrow: string;
    description: string;
}) => {
    return (
    <>
    <div className="flex justify-center">
        <p className="uppercase md:text-10xl text-3xl font-semibold tracking-widest bg-gradient-to-r from-white to-[#fd8128] text-center text-transparent bg-clip-text">
        {eyebrow}
        </p>
      </div>
      <h2 className="font-sans md:text-5xl text-3xl text-center mt-8">
       {title}
    </h2>
      <p className="text-center md:text-lg text-white/90 lg:mt-10 lg:text-xlmt-4 max-w-2xl mx-auto sm:text-lg ">
      {description}
    </p>  
    </>
 );
};