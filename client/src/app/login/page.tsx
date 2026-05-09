import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
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

            {/* Right Login Form Section */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 relative">
                <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Home
                </Link>
                <LoginForm />
            </div>
        </div>
    );
}
