"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarNav } from "@/components/sidebar-nav"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { WebSocketProvider } from "@/contexts/WebSocketContext"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [theme, setTheme] = useState("system")
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      const storedUsername = localStorage.getItem("username") || "User"
      setUsername(storedUsername)
    }
    if (!loggedIn && window.location.pathname !== "/login") {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    router.push("/login")
  }

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleContextMenu = () => {
    setContextMenuVisible(!contextMenuVisible)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    // Apply the theme change logic here
  }

  const { t, i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    i18n.changeLanguage(savedLanguage)
  }, [i18n])

  const sidebarNavItems = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: "LayoutDashboard",
    },
    {
      title: t("orders"),
      href: "/orders",
      icon: "ShoppingCart",
    },
    {
      title: t("menu"),
      href: "/menu",
      icon: "Menu",
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: "Settings",
    },
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <WebSocketProvider>
              <div className="flex min-h-screen flex-col">
                {isLoggedIn ? (
                  <div className="flex-1 flex">
                    <SidebarNav
                      sidebarVisible={sidebarVisible}
                      sidebarCollapsed={sidebarCollapsed}
                      toggleSidebarCollapse={toggleSidebarCollapse}
                      toggleContextMenu={toggleContextMenu}
                      contextMenuVisible={contextMenuVisible}
                      handleLogout={handleLogout}
                      handleThemeChange={handleThemeChange}
                      username={username}
                      sidebarNavItems={sidebarNavItems}
                    />
                    <main
                      className={cn(
                        "flex-1 overflow-hidden transition-all duration-300 ease-in-out",
                        sidebarVisible ? (sidebarCollapsed ? "ml-16" : "ml-64") : "ml-0",
                      )}
                    >
                      <div className="p-4 relative">
                        {children}
                      </div>
                    </main>
                  </div>
                ) : (
                  children
                )}
              </div>
            </WebSocketProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}