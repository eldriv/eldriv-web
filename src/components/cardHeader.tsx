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
    <div className={twMerge("flex flex-col p-3", className)}>
      <div className="inline-flex items-center gap-2">
        <StarIcon className="size-6 md:size-7 text-zinc-200" />
        {href ? (
          <Link
            href={href}
            className="type-card-title text-white hover:text-zinc-200 transition-colors"
          >
            {title}
          </Link>
        ) : (
          <h3 className="type-card-title text-white">{title}</h3>
        )}
      </div>
      {subtitle && (
        <h3 className="text-sm font-semibold pt-2 text-zinc-300">
          {subtitle}
        </h3>
      )}
      <p className="type-body mt-2 flex-grow text-white/70">
        {description}
        {researchLink && (
          <Link 
            href={researchLink}
            className="ml-1 text-zinc-200 hover:text-zinc-300 transition-colors inline-flex items-center"
          >
            View Research
            <ArrowUpRightIcon className="ml-1 w-4 h-4" />
          </Link>
        )}
      </p>
    </div>
  );
};