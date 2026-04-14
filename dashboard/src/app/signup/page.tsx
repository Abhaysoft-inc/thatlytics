
import React from 'react';
import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex text-zinc-900 dark:text-zinc-50 bg-white dark:bg-zinc-950">
            {/* Left Banner Section */}
            <div className="hidden lg:flex w-1/2 bg-zinc-100 dark:bg-zinc-900 flex-col justify-between p-12 border-r border-zinc-200 dark:border-zinc-800">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
                            <span className="text-sm font-bold text-white dark:text-zinc-900">T</span>
                        </div>
                        <span className="font-semibold text-lg tracking-tight">Thatlytics</span>
                    </Link>
                </div>
                <div>
                    <blockquote className="space-y-6">
                        <p className="text-xl font-medium leading-relaxed">
                            &quot;We&apos;ve transformed how we understand our user behavior. The simplest, most effective analytics platform we&apos;ve ever used.&quot;
                        </p>
                        <footer className="text-sm text-zinc-500 dark:text-zinc-400">
                            Sofia Davis, Product Designer
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Signup Form Section */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 relative">
                <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Home
                </Link>
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            Enter your details below to get started
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition-colors"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-zinc-900 dark:bg-zinc-50 px-3 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-colors mt-6"
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
