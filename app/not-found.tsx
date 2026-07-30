import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl">🙀</p>
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink-900">
        This page wandered off
      </h1>
      <p className="mt-3 max-w-md text-ink-500">
        Like a kitten chasing a sunbeam, whatever you were looking for isn't
        here anymore.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-clay-500 px-7 py-3.5 font-bold text-white transition-colors hover:bg-clay-600"
      >
        Back home
      </Link>
    </div>
  );
}
