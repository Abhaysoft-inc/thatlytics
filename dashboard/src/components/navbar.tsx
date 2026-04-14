import React from 'react';
import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
                            <span className="text-xs font-bold text-white dark:text-zinc-900">T</span>
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            Thatlytics
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/docs" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                            Documentation
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-offset-zinc-950 transition-colors shadow-sm"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
