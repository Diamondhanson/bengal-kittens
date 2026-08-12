import Link from "next/link";
import { Reveal } from "./Reveal";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { Stars } from "./Stars";
import type { Review } from "@/lib/types";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const shown = reviews.slice(0, 6);
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-20">
      <Reveal>
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
            Happy families 😻
          </h2>
          {reviews.length > 0 ? (
            <p className="mt-3 flex items-center justify-center gap-2 text-ink-500">
              <Stars rating={Math.round(average)} className="text-lg" />
              <span className="font-bold text-ink-700">
                {average.toFixed(1)}
              </span>
              <span>
                from {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </p>
          ) : (
            <p className="mx-auto mt-3 max-w-xl text-ink-500">
              Our first kittens are settling into their new homes. Adopted one
              of ours? Be the first family to share your story.
            </p>
          )}
        </div>
      </Reveal>

      {shown.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((review, i) => (
            <Reveal key={review.id} delay={i * 100}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      )}

      {reviews.length > shown.length && (
        <Reveal className="mt-8 text-center">
          <Link
            href="/reviews"
            className="group font-bold text-clay-600 hover:text-clay-700"
          >
            See all {reviews.length} reviews{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      )}

      <Reveal className="mt-12">
        <ReviewForm />
      </Reveal>
    </section>
  );
}
