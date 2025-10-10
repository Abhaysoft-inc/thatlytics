"use client"

import { Home, ChartNoAxesColumn, Settings, Users, Bell, FileIcon, Moon, Sun } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

const menu_items = [
  { name: "Home", url: "/" ,icon: Home},
  { name: "Analytics", url: "/analytics" ,icon:ChartNoAxesColumn },
  { name: "Projects", url: "/projects" ,icon: FileIcon},
  { name: "Users", url: "/users" ,icon: Users},
  { name: "Events", url: "/events" ,icon: Bell},
  { name: "Settings", url: "/settings" ,icon: Settings},
]

export function AppSidebar() {
  const [isDark, setIsDark] = useState<boolean | null>(null)

  useEffect(() => {
    // initialize from localStorage or prefers-color-scheme
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        document.documentElement.classList.add("dark")
        setIsDark(true)
      } else {
        document.documentElement.classList.remove("dark")
        setIsDark(false)
      }
    }
  }, [])

  function toggleTheme() {
    const willDark = !isDark
    if (willDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    }
  }

  return (
        <Sidebar>
      <SidebarContent>
     
  <div className="px-4 py-6 border-b border-sidebar-border">
          <a href="/" className="flex items-center gap-3">
        
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-violet-400 text-white font-bold"> 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 12c2-4 6-7 10-7s8 3 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                <path d="M3 17c2-3 6-5 10-5s8 2 10 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
              </svg>
            </span>
            <span className="text-lg font-semibold">thatlytics</span>
          </a>
        </div>
          <SidebarMenu>
              {menu_items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        {/* Footer area with theme toggle */}
        <div className="mt-auto px-4 py-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex items-center justify-center rounded-full h-9 w-9 border bg-background text-muted-foreground hover:bg-accent"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}