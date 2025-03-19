"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants, Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingCart, Menu, Settings, LogOut, User, Sun, Moon, Monitor, Sidebar } from "lucide-react"
import { useTranslation } from "react-i18next"

interface SidebarNavProps {
  sidebarVisible: boolean
  sidebarCollapsed: boolean
  toggleSidebarCollapse: () => void
  toggleContextMenu: () => void
  contextMenuVisible: boolean
  handleLogout: () => void
  handleThemeChange: (newTheme: string) => void
  username: string
  className?: string
  sidebarNavItems: {
    title: string
    href: string
    icon: string
  }[]
}

export function SidebarNav({
  className,
  sidebarNavItems = [],
  sidebarCollapsed,
  handleLogout,
  toggleSidebarCollapse,
  toggleContextMenu,
  contextMenuVisible,
  handleThemeChange,
  username,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard":
        return <LayoutDashboard className="h-4 w-4" />
      case "ShoppingCart":
        return <ShoppingCart className="h-4 w-4" />
      case "Menu":
        return <Menu className="h-4 w-4" />
      case "Settings":
        return <Settings className="h-4 w-4" />
      case "LogOut":
        return <LogOut className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-30 h-screen w-64 shrink-0 overflow-y-auto transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64",
        className,
      )}
      {...props}
    >
      <div className="flex justify-between items-center p-4">
        {!sidebarCollapsed && <h2 className="text-lg font-semibold italic">Pizza DEL RE</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse} className="ml-auto">
          {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <Sidebar className="h-4 w-4" />}
        </Button>
      </div>
      <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", sidebarCollapsed ? "items-center" : "items-start")}>
        {sidebarNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              sidebarCollapsed ? "justify-center" : "justify-start",
              "w-full",
              sidebarCollapsed ? "h-12 p-0" : "h-10 px-4 py-2",
            )}
          >
            {getIcon(item.icon)}
            {!sidebarCollapsed && <span className="ml-2">{item.title}</span>}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <Button variant="ghost" size="icon" onClick={toggleContextMenu}>
          <User className="h-6 w-6" />
        </Button>
        {contextMenuVisible && (
          <div className="absolute bottom-16 left-0 w-48 bg-white shadow-lg rounded-md p-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-700">{username}</div>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => router.push("/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              {t("settings")}
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("Sign Out")}
            </Button>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">{t("language")}</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                value={i18n.language}
              >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                {/* Add more languages as needed */}
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">{t("Theme")}</label>
              <div className="flex space-x-2 mt-1">
                <Button variant="ghost" size="icon" onClick={() => handleThemeChange("system")}>
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleThemeChange("dark")}>
                  <Moon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleThemeChange("light")}>
                  <Sun className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

