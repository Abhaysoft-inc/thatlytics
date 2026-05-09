import React from 'react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-16">
                <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-900 mb-8 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
                    <span className="flex h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-50 mr-2"></span>
                    Thatlytics Beta is now live
                </div>
                <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl lg:text-8xl">
                    Analytics that <br className="hidden sm:inline" /> actually make sense.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Thatlytics gives you privacy-focused, real-time insights into how users interact with your product. No complex setups, just clear, actionable data.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/signup"
                        className="flex h-11 w-full sm:w-auto items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-offset-zinc-950"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        href="/docs"
                        className="flex h-11 w-full sm:w-auto items-center justify-center rounded-md border border-zinc-200 bg-transparent px-8 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:focus:ring-offset-zinc-950"
                    >
                        View Documentation
                    </Link>
                </div>
            </div>
        </section>
    );
}