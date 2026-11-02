import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center max-w-md shadow-2xl">
        <h1 className="text-4xl font-extrabold text-indigo-400">404</h1>
        <h2 className="mt-2 text-lg font-bold">Page Not Found</h2>
        <p className="mt-2 text-xs text-slate-400">
          The requested reporting page or route does not exist.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
        >
          Return to Portal
        </Link>
      </div>
    </div>
  );
}

