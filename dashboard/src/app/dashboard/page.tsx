import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col text-zinc-900 dark:text-zinc-50">
            {/* Dashboard Top Navigation */}
            <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 gap-4 justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
                                <span className="text-xs font-bold text-white dark:text-zinc-900">T</span>
                            </div>
                        </Link>
                        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="font-medium text-sm">acme.com</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            <Link href="/dashboard" className="text-zinc-900 dark:text-zinc-50">Overview</Link>
                            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Realtime</Link>
                            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Settings</Link>
                        </nav>
                        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                            <span className="text-xs font-medium">JD</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Here's what's happening on your site today.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>This month</option>
                        </select>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {[
                        { label: 'Unique Visitors', value: '45.2K', change: '+12.5%', positive: true },
                        { label: 'Total Pageviews', value: '128.4K', change: '+18.2%', positive: true },
                        { label: 'Bounce Rate', value: '42.3%', change: '-2.4%', positive: true },
                        { label: 'Avg. Visit Duration', value: '2m 14s', change: '-0.8%', positive: false },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</span>
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-3xl font-bold">{stat.value}</span>
                                <span className={`text-xs font-medium ${stat.positive ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-base font-semibold">Traffic Overview</h2>
                    </div>
                    {/* Mock Chart */}
                    <div className="h-64 w-full flex items-end gap-2 sm:gap-4 relative">
                        <div className="absolute inset-x-0 bottom-0 top-0 grid grid-rows-4 pointer-events-none">
                            <div className="border-b border-zinc-100 dark:border-zinc-800 border-dashed w-full h-full"></div>
                            <div className="border-b border-zinc-100 dark:border-zinc-800 border-dashed w-full h-full"></div>
                            <div className="border-b border-zinc-100 dark:border-zinc-800 border-dashed w-full h-full"></div>
                            <div className="border-b border-zinc-100 dark:border-zinc-800 border-dashed w-full h-full"></div>
                        </div>

                        {/* Mock bars */}
                        {[20, 35, 25, 45, 60, 50, 75, 65, 80, 95, 85, 100, 70, 60].map((height, i) => (
                            <div key={i} className="flex-1 bg-zinc-900 dark:bg-zinc-50 rounded-t-sm z-10 transition-all hover:opacity-80" style={{ height: `${height}%` }}></div>
                        ))}
                    </div>
                </div>

                {/* Detailed Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Pages */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-base font-semibold mb-4">Top Pages</h2>
                        <div className="space-y-3">
                            {[
                                { path: '/', views: '45,021' },
                                { path: '/blog', views: '12,430' },
                                { path: '/pricing', views: '8,214' },
                                { path: '/about', views: '4,102' },
                                { path: '/contact', views: '2,891' },
                            ].map((page, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-400 truncate pr-4">{page.path}</span>
                                    <span className="font-medium">{page.views}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Referrers */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-base font-semibold mb-4">Top Sources</h2>
                        <div className="space-y-3">
                            {[
                                { source: 'Direct', visitors: '22,431' },
                                { source: 'Google', visitors: '14,210' },
                                { source: 'Twitter', visitors: '4,012' },
                                { source: 'GitHub', visitors: '2,981' },
                                { source: 'Hacker News', visitors: '1,567' },
                            ].map((referrer, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-400">{referrer.source}</span>
                                    <span className="font-medium">{referrer.visitors}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}