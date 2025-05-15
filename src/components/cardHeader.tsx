import StarIcon from "@/assets/icons/star.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"; // Import the arrow icon
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export const CardHeader = ({
  title,
  subtitle,
  description,
  href,
  researchLink,
  className,
}: {
  title: string;
  subtitle?: string;
  description: string;
  href?: string; 
  researchLink?: string; 
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col p-6", className)}>
      <div className="inline-flex items-center gap-2">
        <StarIcon className="size-9 text-emerald-300" />
        {href ? (
          <Link
            href={href}
            className="font-sans text-3xl text-white hover:text-emerald-300 transition-colors"
          >
            {title}
          </Link>
        ) : (
          <h3 className="font-sans text-3xl text-white">{title}</h3>
        )}
      </div>
      {subtitle && (
        <h3 className="font-sans lg:text-lg font-semibold pt-2 text-[#fd8128]">
          {subtitle}
        </h3>
      )}
      <p className="text-sm leading-relaxed flex-grow mt-2 lg:text-lg gap-3 md:text-lg sm:text-lg text-white">
        {description}
        {researchLink && (
          <Link 
            href={researchLink}
            className="sm:-mt-5 mt-5 text-emerald-300 hover:text-[#FD8128] transition-colors inline-flex items-center"
          >
            View Research
            <ArrowUpRightIcon className="ml-1 w-4 h-4" />
          </Link>
        )}
      </p>
    </div>
  );
};