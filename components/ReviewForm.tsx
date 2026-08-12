"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewFormState } from "@/app/actions/reviews";
import { SubmitButton } from "./SubmitButton";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200";

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [state, action] = useActionState<ReviewFormState, FormData>(
    submitReview,
    {}
  );

  if (state.success) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-moss-100 p-8 text-center">
        <p className="text-4xl">💛</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900">
          Thank you for your review!
        </h3>
        <p className="mt-2 text-ink-500">
          It means the world to us. Your review will appear here shortly,
          right after a quick look on our side.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-white border border-cream-300 px-7 py-3.5 font-bold text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream-100 hover:shadow-md active:translate-y-0"
        >
          ✍️ Share your experience
        </button>
        <p className="mt-3 text-sm text-ink-400">
          Adopted a kitten from us? We'd love to hear how it's going.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="mx-auto max-w-xl space-y-5 rounded-3xl border border-cream-300 bg-white p-7 shadow-sm text-left"
    >
      <h3 className="font-display text-xl font-semibold text-ink-900">
        Share your experience
      </h3>

      {/* Honeypot: hidden from real visitors, catches bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <span className="mb-1.5 block text-sm font-bold text-ink-700">
          Your rating *
        </span>
        <input type="hidden" name="rating" value={rating} />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${i} star${i === 1 ? "" : "s"}`}
              className={`text-3xl transition-transform duration-150 hover:scale-110 ${
                i <= (hovered || rating) ? "text-clay-500" : "text-cream-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="review-name" className="mb-1.5 block text-sm font-bold text-ink-700">
            Your name *
          </label>
          <input id="review-name" name="name" required className={inputClass} placeholder="The Doe family" />
        </div>
        <div>
          <label htmlFor="review-location" className="mb-1.5 block text-sm font-bold text-ink-700">
            Location (optional)
          </label>
          <input id="review-location" name="location" className={inputClass} placeholder="City, State" />
        </div>
      </div>

      <div>
        <label htmlFor="review-message" className="mb-1.5 block text-sm font-bold text-ink-700">
          Your review *
        </label>
        <textarea
          id="review-message"
          name="message"
          required
          rows={4}
          className={inputClass}
          placeholder="How was adopting from us? How is your kitten settling in?"
        />
      </div>

      {state.error && (
        <p className="rounded-xl bg-clay-100 px-4 py-3 text-sm font-semibold text-clay-700">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <SubmitButton pendingText="Sending…">Submit review</SubmitButton>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-bold text-ink-400 hover:text-ink-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
