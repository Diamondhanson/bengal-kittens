import { Stars } from "./Stars";
import type { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Stars rating={review.rating} />
      <blockquote className="mt-3 flex-1 leading-relaxed text-ink-700">
        “{review.message}”
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-bold text-ink-900">{review.name}</span>
        {review.location && (
          <span className="text-ink-400"> · {review.location}</span>
        )}
      </figcaption>
    </figure>
  );
}
