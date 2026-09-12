"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import "@/styles/globals.css";

// Replaces the root layout when it throws, so it must render <html> and <body>.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center font-sans">
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">Error</p>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Something went wrong
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            The site hit an unexpected error. You can try again.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              Reference: {error.digest}
            </p>
          )}
          <Button onClick={() => retry()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
