"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AUTH_API_BASE } from '../../lib/api';

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch(`${AUTH_API_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Failed to log in");
            }

            setSuccess(true);
            
            // Save the token as a cookie so the middleware can read it
            document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`;

            setTimeout(() => {
                router.push("/dashboard"); // Redirect to dashboard on success
            }, 1000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-8">
            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Welcome back
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    Enter your details below to log in
                </p>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 rounded-md">
                    Logged in successfully! Redirecting...
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
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
                        autoComplete="current-password"
                        required
                        className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <div className="flex items-center justify-end">
                    <Link href="/forgot-password" className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-zinc-900 dark:bg-zinc-50 px-3 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>
            </form>

            <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;