export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="py-16 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
