import Image from "next/image";
import profileImage from "@/assets/images/adi.jpg";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_15%,rgba(253,129,40,0.12),transparent_45%)]" />
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_280px] md:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#fd8128]">
            Product &amp; Software Engineer
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Hi, I&apos;m Michael Adrian Villareal.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            I build useful web products, client websites, and connected systems—from
            product direction and architecture through integrations and launch.
            Creator of BehindCourt and OnCourt at Behind Digitals.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Based in the Philippines · Working with teams worldwide
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#web-apps"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#fd8128] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#ff9448]"
            >
              View selected work
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[220px] md:max-w-[280px]">
          <Image
            src={profileImage}
            alt="Michael Adrian Villareal"
            priority
            className="aspect-square w-full rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/30"
            sizes="(max-width: 768px) 220px, 280px"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
