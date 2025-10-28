"use client"
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { cn } from "@/lib/utils";
import React, { useState } from 'react'
import { motion } from "motion/react";
import Dashboard from '@/components/dashboard/MainArea';
import links from '@/utils/dashlinks'

const ClientDashboard = () => {


    const [open, setOpen] = useState(false);
    return (
        <div className={cn(
            "flex w-full h-screen overflow-hidden bg-gray-100 dark:bg-neutral-900"
        )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className='justify-between gap-10'>
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Your Name",
                                href: "#",
                                icon: (
                                    <div className="h-7 w-7 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {/* add dashboard here */}

            <Dashboard />



        </div>
    )
}

// Logo component for expanded sidebar
const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                Thatlytics
            </motion.span>
        </a>
    );
};

// Logo icon for collapsed sidebar
const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};



export default ClientDashboard