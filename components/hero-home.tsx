import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import HeroPic from "@/public/heropic.jpg";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="py-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Quality Raw Materials
                </span>
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Premium Paint Chemical <br className="max-lg:hidden" />
              Raw Materials
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Your trusted partner in supplying high-quality chemical raw materials 
                for paint manufacturing. Reliable sourcing, competitive pricing, and 
                exceptional service for the coatings industry.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#contact"
                  >
                    <span className="relative inline-flex items-center">
                      Request Quote{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="/sales"
                  >
                    View Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,--theme(--color-slate-300/.8),transparent)1]">
              <Image
                src={HeroPic}
                alt="Paint Chemical Raw Materials"
                fill
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Stats section */}
          <div className="mx-auto mt-12 max-w-3xl md:mt-16" data-aos="fade-up">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 px-8 py-8 shadow-lg">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-blue-600">500+</div>
                  <div className="text-sm font-medium text-gray-600">Products Available</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-blue-600">15+</div>
                  <div className="text-sm font-medium text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-blue-600">200+</div>
                  <div className="text-sm font-medium text-gray-600">Happy Clients</div>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <p className="text-center text-sm text-gray-600">
                  Specializing in Titanium Dioxide, Resins, Solvents, Pigments, and Additives
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}