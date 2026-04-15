import React from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 relative">
            <Link href="/login" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Back to log in
            </Link>

            <div className="w-full max-w-sm space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900 dark:text-zinc-50">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Check your email
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        We sent a verification link to your email address. Please click the link to verify your account.
                    </p>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                    <button
                        type="button"
                        className="w-full rounded-md bg-zinc-900 dark:bg-zinc-50 px-3 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-colors"
                    >
                        Open email app
                    </button>

                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                        Didn&apos;t receive the email?{' '}
                        <button className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline focus:outline-none bg-transparent border-none p-0 cursor-pointer">
                            Click to resend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}