import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { Stars } from "@/components/Stars";
import { getApprovedReviews } from "@/lib/data";

// Served from cache and refreshed in the background; approving a review in
// the dashboard busts it instantly via revalidatePath.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Reviews from Our Families",
  description:
    "Read what families say about adopting a Bengal kitten from us: health, temperament, communication, and how their kittens settled in. Adopted from us? Share your story too.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-ink-900">
          What our families say 😻
        </h1>
        {reviews.length > 0 ? (
          <p className="mt-3 flex items-center justify-center gap-2 text-ink-500">
            <Stars rating={Math.round(average)} className="text-lg" />
            <span className="font-bold text-ink-700">{average.toFixed(1)}</span>
            <span>
              from {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </span>
          </p>
        ) : (
          <p className="mx-auto mt-3 max-w-xl text-ink-500">
            Our first kittens are settling into their new homes. Adopted one of
            ours? Be the first family to share your story.
          </p>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 100}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-14">
        <ReviewForm />
      </div>

      <div className="mt-16 rounded-3xl bg-moss-100/70 px-8 py-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          Ready to write your own story?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-500">
          Meet the kittens these families fell in love with.
        </p>
        <Link
          href="/kittens"
          className="mt-6 inline-block rounded-xl bg-clay-500 px-7 py-3.5 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-600 active:translate-y-0"
        >
          Browse available kittens
        </Link>
      </div>
    </div>
  );
}
