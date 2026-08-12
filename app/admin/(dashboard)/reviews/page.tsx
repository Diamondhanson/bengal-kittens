import {
  removeReview,
  setReviewApproval,
  setReviewFeatured,
} from "@/app/actions/admin";
import { Stars } from "@/components/Stars";
import { getAllReviews } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();
  const pending = reviews.filter((r) => !r.approved).length;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Reviews
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        Visitor reviews from the website. Only approved reviews appear on the
        home page; featured ones are pinned to the front.
        {pending > 0 && (
          <span className="ml-2 rounded-full bg-clay-100 px-3 py-1 text-xs font-bold text-clay-700">
            {pending} waiting for approval
          </span>
        )}
      </p>

      <div className="mt-8 space-y-5">
        {reviews.map((review) => (
          <article
            key={review.id}
            className={`rounded-2xl border bg-white p-6 ${
              review.approved ? "border-cream-300" : "border-clay-400"
            }`}
          >
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-lg font-semibold text-ink-900">
                    {review.name}
                  </h2>
                  <Stars rating={review.rating} className="text-sm" />
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      review.approved
                        ? "bg-moss-100 text-moss-700"
                        : "bg-clay-100 text-clay-700"
                    }`}
                  >
                    {review.approved ? "live on site" : "pending"}
                  </span>
                  {review.featured && (
                    <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-bold text-ink-700">
                      ⭐ featured
                    </span>
                  )}
                </div>
                {review.location && (
                  <p className="mt-1 text-sm text-ink-400">{review.location}</p>
                )}
              </div>
              <p className="text-xs text-ink-400">
                {formatDateTime(review.created_at)}
              </p>
            </header>

            <p className="mt-3 rounded-xl bg-cream-100 p-4 text-sm leading-relaxed text-ink-700">
              {review.message}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <form action={setReviewApproval}>
                <input type="hidden" name="id" value={review.id} />
                <input
                  type="hidden"
                  name="approved"
                  value={review.approved ? "false" : "true"}
                />
                <button
                  type="submit"
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                    review.approved
                      ? "bg-cream-100 text-ink-500 hover:bg-cream-200"
                      : "bg-moss-600 text-white hover:bg-moss-700"
                  }`}
                >
                  {review.approved ? "Hide from site" : "Approve"}
                </button>
              </form>
              <form action={setReviewFeatured}>
                <input type="hidden" name="id" value={review.id} />
                <input
                  type="hidden"
                  name="featured"
                  value={review.featured ? "false" : "true"}
                />
                <button
                  type="submit"
                  className="rounded-lg bg-moss-100 px-3 py-1.5 text-xs font-bold text-moss-700 hover:bg-moss-200"
                >
                  {review.featured ? "Unpin" : "⭐ Pin to front"}
                </button>
              </form>
              <form action={removeReview}>
                <input type="hidden" name="id" value={review.id} />
                <button
                  type="submit"
                  className="rounded-lg bg-clay-100 px-3 py-1.5 text-xs font-bold text-clay-700 hover:bg-clay-200"
                >
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
        {reviews.length === 0 && (
          <div className="rounded-2xl border border-cream-300 bg-white p-12 text-center text-ink-400">
            No reviews yet. When a visitor writes one on the home page, it
            shows up here for your approval.
          </div>
        )}
      </div>
    </div>
  );
}
