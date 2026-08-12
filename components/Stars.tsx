export function Stars({
  rating,
  className = "text-base",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className={i <= rating ? "text-clay-500" : "text-cream-300"}
        >
          ★
        </span>
      ))}
    </span>
  );
}
