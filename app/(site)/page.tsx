import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { KittenCard } from "@/components/KittenCard";
import { Reveal } from "@/components/Reveal";
import { getKittens } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const heroImages = [
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1920&q=75&fit=crop",
  "https://images.unsplash.com/photo-1475518112798-86ae358241eb?w=1920&q=75&fit=crop",
  "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1920&q=75&fit=crop",
  "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=1920&q=75&fit=crop",
];

const heroFramedImage =
  "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=1600&q=75&fit=crop";

export default async function HomePage() {
  const kittens = await getKittens();
  const available = kittens.filter((k) => k.status === "available");
  const breedCount = new Set(kittens.map((k) => k.breed)).size;
  const featured = kittens.filter((k) => k.featured && k.status === "available");
  const spotlight = (featured.length > 0 ? featured : kittens).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroSlideshow images={heroImages} />

        {/* Floating decorative paws (kept in the gap between the columns) */}
        <span
          aria-hidden
          className="animate-float absolute left-[46%] top-14 hidden lg:block text-4xl opacity-25"
          style={{ "--float-rotate": "-15deg" } as React.CSSProperties}
        >
          🐾
        </span>
        <span
          aria-hidden
          className="animate-float absolute right-[47%] bottom-20 hidden lg:block text-2xl opacity-20 [animation-delay:1.5s]"
          style={{ "--float-rotate": "20deg" } as React.CSSProperties}
        >
          🐾
        </span>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-moss-100/90 px-4 py-1.5 text-sm font-bold text-moss-700 shadow-sm">
              🏡 Family-raised, never caged
            </p>
            <h1 className="animate-fade-up [animation-delay:120ms] mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-ink-900">
              A gentle new friend is{" "}
              <span className="relative inline-block text-clay-600">
                waiting for you
                <svg
                  aria-hidden
                  viewBox="0 0 220 12"
                  className="absolute -bottom-2 left-0 w-full text-clay-400"
                  fill="none"
                >
                  <path
                    d="M3 9c40-6 140-8 214-4"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>
              </span>
            </h1>
            <p className="animate-fade-up [animation-delay:240ms] mt-6 max-w-lg text-lg leading-relaxed text-ink-700">
              We raise our kittens in the heart of our home — socialized with
              children, vet-checked, and loved from their very first breath.
              Find the one who belongs on your sofa.
            </p>
            <div className="animate-fade-up [animation-delay:360ms] mt-8 flex flex-wrap gap-4">
              <Link
                href="/kittens"
                className="rounded-xl bg-clay-500 px-7 py-3.5 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-600 hover:shadow-lg active:translate-y-0"
              >
                Meet the kittens
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-cream-300 bg-white/90 px-7 py-3.5 font-bold text-ink-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream-100 active:translate-y-0"
              >
                Our story
              </Link>
            </div>
            <div className="animate-fade-up [animation-delay:480ms] mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { n: String(available.length), label: "kittens available" },
                { n: String(breedCount), label: "loving breeds" },
                { n: "100%", label: "family-raised" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold text-clay-600">
                    {stat.n}
                  </span>
                  <span className="text-sm font-semibold text-ink-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:240ms] relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg ring-1 ring-cream-300/80 transition-transform duration-500 lg:rotate-2 lg:hover:rotate-0">
              <Image
                src={heroFramedImage}
                alt="A kitten relaxing at home"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-ink-700 shadow-sm backdrop-blur">
                🛋️ Raised in our living room
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-cream-300 bg-cream-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3 text-center">
          {[
            {
              icon: "🩺",
              title: "Vet checked & vaccinated",
              text: "Every kitten leaves with a full health record and age-appropriate shots.",
            },
            {
              icon: "📜",
              title: "Written health guarantee",
              text: "Genetic screening on all parents and a guarantee you can hold in your hand.",
            },
            {
              icon: "💛",
              title: "Socialized with love",
              text: "Raised underfoot with kids and other pets — confident, cuddly companions.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <p className="animate-float text-3xl [animation-delay:calc(var(--i)*1.2s)]" style={{ "--i": i } as React.CSSProperties}>
                {item.icon}
              </p>
              <h2 className="mt-3 font-display text-lg font-semibold text-ink-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured kittens */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
                Kittens looking for a home
              </h2>
              <p className="mt-2 text-ink-500">
                A few of the little ones currently available.
              </p>
            </div>
            <Link
              href="/kittens"
              className="group font-bold text-clay-600 hover:text-clay-700"
            >
              See all kittens{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {spotlight.map((kitten, i) => (
            <Reveal key={kitten.id} delay={i * 130}>
              <KittenCard kitten={kitten} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-moss-100/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-20">
          <Reveal>
            <h2 className="text-center font-display text-3xl sm:text-4xl font-semibold text-ink-900">
              Bringing your kitten home is easy
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Choose your kitten",
                text: "Browse the litter, read each personality profile, and pick the kitten (or pair!) that steals your heart.",
              },
              {
                step: "2",
                title: "Send a reservation",
                text: "Add them to your basket and send us your details — no payment online. We'll receive it instantly.",
              },
              {
                step: "3",
                title: "We arrange the rest",
                text: "We reply within 24 hours to plan a visit or video call, answer questions, and arrange payment & pickup.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 130}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-sm border border-cream-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay-500 font-display text-lg font-bold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <Reveal>
          <p className="animate-float inline-block text-4xl">😻</p>
          <blockquote className="mt-4 font-display text-2xl leading-relaxed text-ink-700">
            “Our Bengal boy arrived confident, healthy, and impossibly sweet. You
            can tell these kittens grow up in a real home full of love.”
          </blockquote>
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-ink-400">
            — The Ramirez family
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-clay-500 px-8 py-12 text-center shadow-md sm:px-16">
            <span aria-hidden className="animate-float absolute left-8 top-6 text-3xl opacity-20">🐾</span>
            <span aria-hidden className="animate-float absolute right-10 bottom-6 text-3xl opacity-20 [animation-delay:2s]">🐾</span>
            <h2 className="font-display text-3xl font-semibold text-white">
              Ready to meet your new best friend?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-clay-100">
              Come say hello — or ask us anything about our kittens, visits, and
              how adoption works. We love to chat. {site.hours}.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/kittens"
                className="rounded-xl bg-white px-7 py-3.5 font-bold text-clay-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream-100 active:translate-y-0"
              >
                Browse kittens
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/60 px-7 py-3.5 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-600 active:translate-y-0"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
