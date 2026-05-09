import React from 'react';
import Link from 'next/link';

export function CtaSection() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-20 shadow-2xl dark:bg-zinc-50 sm:px-16 sm:py-24 lg:px-24">
                    <div className="relative mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white dark:text-zinc-900 sm:text-4xl">
                            Start understanding your users today.
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-300 dark:text-zinc-600">
                            Join hundreds of developers building better products with fast, privacy-friendly analytics.
                        </p>
                        <div className="mt-10 flex cursor-pointer items-center justify-center gap-4">
                            <Link
                                href="/signup"
                                className="flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                            >
                                Create your account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}