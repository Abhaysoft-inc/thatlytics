import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
                        <span className="text-xs font-bold text-white dark:text-zinc-900">T</span>
                    </div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Thatlytics
                    </span>
                </div>

                <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                    <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                        Documentation
                    </Link>
                    <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                        Terms of Service
                    </Link>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    © {new Date().getFullYear()} Thatlytics. All rights reserved.
                </p>
            </div>
        </footer>
    );
}