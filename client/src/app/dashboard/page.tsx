import Link from 'next/link';
import { ProjectConsole } from '@/components/dashboard/project-console';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
            <header className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-50">
                            <span className="text-xs font-bold text-white dark:text-zinc-900">T</span>
                        </div>
                        <span className="font-semibold tracking-tight">Thatlytics</span>
                    </Link>

                    <nav className="flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        <Link href="/dashboard" className="text-zinc-900 dark:text-zinc-50">Projects</Link>
                        <Link href="/login" className="hover:text-zinc-900 dark:hover:text-zinc-50">Log in</Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 max-w-3xl space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Workspace</p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Create a project and connect a source.</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Use this screen to create the project record that the collector expects, then add a source so the tracker SDK can send pageviews.
                    </p>
                </div>

                <ProjectConsole />
            </main>
        </div>
    );
}