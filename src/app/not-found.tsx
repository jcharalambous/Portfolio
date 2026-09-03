import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center font-sans">
      <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">404</p>
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Page not found
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <ButtonLink href="/">Go home</ButtonLink>
    </div>
  );
}
