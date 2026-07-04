import Link from "next/link";

interface SectionListPageProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionListPage({
  title,
  children,
}: SectionListPageProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <Link
        href="/"
        className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
      >
        ← back
      </Link>

      <section className="rounded-lg border border-gray-200 p-4">
        <h1 className="mb-6 font-mono text-sm lowercase text-zinc-400">
          {title}
        </h1>
        {children}
      </section>
    </div>
  );
}
