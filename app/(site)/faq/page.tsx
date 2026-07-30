import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  {
    q: "How does reserving a kitten work?",
    a: "Add your favorite kitten to your basket and submit the reservation form — it's free and non-binding. We receive it instantly and reply within 24 hours to talk next steps, answer questions, and arrange a visit or video call. Payment is only discussed after we've spoken.",
  },
  {
    q: "When can kittens go to their new homes?",
    a: "Kittens leave us at 12–14 weeks old, once they're fully weaned, litter trained, vaccinated, and confident. It's tempting to send them earlier, but those extra weeks with mom make for happier, healthier cats.",
  },
  {
    q: "What comes with my kitten?",
    a: "Every kitten goes home with vet health records, age-appropriate vaccinations, deworming, a written health guarantee, a starter bag of their current food, and a blanket that smells like mom and littermates to ease the transition.",
  },
  {
    q: "Can we visit before deciding?",
    a: "Absolutely — we encourage it! Visits are by appointment so mom cats aren't overwhelmed. If you're far away, we're happy to do a live video call and send weekly photo updates.",
  },
  {
    q: "Do you ship kittens?",
    a: "We don't cargo-ship. For distant families we can arrange in-cabin flight nanny delivery or meet partway by car — costs depend on distance. Ask us and we'll figure out the kindest option together.",
  },
  {
    q: "Are your kittens good with children and dogs?",
    a: "Yes — they're raised with both. Our kittens are handled daily by our kids and share the house with a very patient golden retriever, so they arrive well socialized.",
  },
  {
    q: "What should I prepare before pickup?",
    a: "A quiet room to start, a litter box (we'll tell you which litter they know), food and water bowls, a scratching post, and a cozy bed. We'll send you our full new-kitten checklist when you reserve.",
  },
  {
    q: "What if it doesn't work out?",
    a: "Our cats are never to be rehomed to shelters. If your circumstances change — at any point in the cat's life — they always have a place back with us. It's in our contract and it's a promise.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 lg:py-16">
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        Frequently asked questions
      </h1>
      <p className="mt-3 text-ink-500">
        Everything families usually ask before reserving. Can't find your
        answer?{" "}
        <Link href="/contact" className="font-bold text-clay-600">
          Just ask us
        </Link>
        .
      </p>
      <div className="mt-10 space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-cream-300 bg-white p-6 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-display text-lg font-semibold text-ink-900 marker:content-none flex items-center justify-between gap-4">
              {item.q}
              <span className="text-clay-500 transition-transform group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-500">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
