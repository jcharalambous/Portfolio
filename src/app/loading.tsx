export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-1 flex-col items-center justify-center py-32 font-sans"
    >
      <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
