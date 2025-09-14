import { Navbar } from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

const analyticsCards = [
    {
        id: 'pageviews',
        label: 'Pageviews',
        value: 12857,
        change: 12.4,
        changeDirection: 'up',
        description: 'Last 24 hours',
    },
    {
        id: 'visitors',
        label: 'Unique Visitors',
        value: 4321,
        change: -3.1,
        changeDirection: 'down',
        description: 'Last 24 hours',
    },
    {
        id: 'sources',
        label: 'Top Sources',
        value: 5,
        change: 6.0,
        changeDirection: 'up',
        description: 'Active referrers',
    },
]

const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n)

const ChangeBadge = ({
    value,
    direction,
}: {
    value: number
    direction: 'up' | 'down'
}) => (
    <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide ${direction === 'up'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-600'
            }`}
    >
        {direction === 'up' ? '▲' : '▼'} {Math.abs(value).toFixed(1)}%
    </span>
)

const Dashboard = () => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <main className='flex-1 px-4 py-4 md:px-8'>
                    {/* Analytics summary cards */}
                    <section>
                        <h2 className='mb-4 text-lg font-semibold text-gray-800'>
                            Overview (24h)
                        </h2>
                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            {analyticsCards.map((card) => (
                                <div
                                    key={card.id}
                                    className='group relative overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md'
                                >
                                    <div className='flex items-start justify-between'>
                                        <p className='text-sm font-medium text-gray-500'>
                                            {card.label}
                                        </p>
                                        {/* <ChangeBadge
                                            value={card.change}
                                            direction={
                                                card.changeDirection as 'up' | 'down'
                                            }
                                        /> */}
                                    </div>
                                    <div className='mt-3 flex items-end gap-2'>
                                        <span className='text-3xl font-semibold tracking-tight text-gray-900'>
                                            {formatNumber(card.value)}
                                        </span>
                                    </div>
                                    <p className='mt-2 text-xs text-gray-500'>
                                        {card.description}
                                    </p>
                                    <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100' />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Top Sources detail */}
                    <section className='mt-8 grid gap-6 lg:grid-cols-3'>
                        <div className='lg:col-span-2 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200'>
                            <h3 className='mb-4 text-sm font-semibold tracking-wide text-gray-700'>
                                Traffic Trend
                            </h3>
                            <div className='flex h-40 items-center justify-center text-xs text-gray-400'>
                                {/* Chart placeholder */}
                            </div>
                        </div>

                        <div className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200'>
                            <h3 className='mb-4 text-sm font-semibold tracking-wide text-gray-700'>
                                Top Sources
                            </h3>
                            <ul className='space-y-3 text-sm'>
                                {['google', 'twitter', 'linkedin', 'direct', 'newsletter'].map(
                                    (src, i) => (
                                        <li
                                            key={src}
                                            className='flex items-center justify-between'
                                        >
                                            <span className='capitalize text-gray-600'>
                                                {i + 1}. {src}
                                            </span>
                                            <span className='font-medium text-gray-900'>
                                                {Math.round(1000 - i * 137)}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                    </section>
                </main>
            </div>
        </div>
    )
}

export default Dashboard