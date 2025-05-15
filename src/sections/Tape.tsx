
import TaijituIcon from '@/assets/icons/Taijitu_yellow.svg';
import { Fragment } from 'react';

const words = [
  "Web Designer",
  "Reliable",
  "Search Optimized",
  "Interactive",
  "Lisper",
  "User Friendly",
  "Web Developer",
  "Imagination",
  "Creativity",
  "Logic",
  "Communication",
];

export const TapeSection = () => {
  return (
    <div className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-[linear-gradient(to_right,#FD8128,white,black)] 
      -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 pr-4 py-3 animate-move-right [animation-duration:30s]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {words.map((word) => (
                <div key={word} className="inline-flex gap-10 items-center">
                <span className="text-gray-900 uppercase font-extrabold text-sm">{word}</span>
                <TaijituIcon className="size-3 text-gray-900" />
                </div>
            ))}
            </Fragment>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};
