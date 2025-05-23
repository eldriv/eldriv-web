import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'

const footerLinks = [
  {
    title: 'X',
    href: 'https://x.com/eldrivi',
    target: "_blank",
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/eldrivi/',
    target: "_blank",
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/eldriv/',
    target: "_blank",
  },
]

export const Footer = () => {
  return (
    <footer className="relative z-10 overflow-x-clip w-full ">
      {/* Background gradient layer */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30
       [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10 pointer-events-none">
      </div>

      {/* Content */}
      <div className="w-full max-w-[77%] mx-auto px-4">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">
            &copy; 2025. All Rights Reserved. | Powered by Eldriv
          </div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map(link => (
              <a
                key={link.title}
                href={link.href}
                target={link.target}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-[#FD8128] transition-colors"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
