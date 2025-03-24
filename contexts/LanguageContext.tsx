"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        dashboard: "Dashboard",
        orders: "Orders",
        menu: "Menu",
        settings: "Settings",
        totalRevenue: "Total Revenue",
        pendingOrders: "Pending Orders",
        preparing: "Preparing",
        averagePrepTime: "Average Prep Time",
        todaysOrders: "Today's Orders",
        clearFilters: "Clear Filters",
        pending: "Pending",
        ready: "Ready",
        delivered: "Delivered",
        language: "Language",
        english: "English",
        spanish: "Spanish",
        german: "German",
        filters: "Filters",
        category: "Category",
        search: "Search",
        searchPlaceholder: "Search by name or ingredients",
        number: "Number",
        name: "Name",
        ingredients: "Ingredients",
        size: "Size",
        price: "Price",
        selectCategory: "Select category",
        allCategories: "All categories",
        mostSoldDishes: "Most Sold Dishes",
        topCategories: "Top Categories by Sales",
        analytics: "Analytics",
        revenue: "Revenue",
        overview: "Overview",
        reports: "Reports",
        total_revenue_today: "Total Revenue (today)",
        minutes: "Minutes",
        dishRevenue: "Dish Revenue",
        categoryRevenue: "Category Revenue",
        login: "Login",
        username: "Username",
        password: "Password",
        logIn: "Log In",
        invalidCredentials: "Invalid credentials",
        detailedView: "Detailed View: {{item}}",
        orderId: "Order ID",
        customer: "Customer",
        items: "Items",
        total: "Total Amount",
        status: "Status",
        actions: "Actions",
        order_details: "Order Details",
        time: "Time",
        close: "Close",
        changeStatus: "Change Status",
      },
    },
    es: {
      translation: {
        dashboard: "Tablero",
        orders: "Pedidos",
        menu: "Menú",
        settings: "Ajustes",
        totalRevenue: "Ingresos Totales",
        pendingOrders: "Pedidos Pendientes",
        preparing: "Preparando",
        averagePrepTime: "Tiempo Promedio de Preparación",
        todaysOrders: "Pedidos de Hoy",
        clearFilters: "Limpiar Filtros",
        pending: "Pendiente",
        ready: "Listo",
        delivered: "Entregado",
        language: "Idioma",
        english: "Inglés",
        spanish: "Español",
        login: "Iniciar sesión",
        username: "Nombre de usuario",
        password: "Contraseña",
        logIn: "Iniciar sesión",
        invalidCredentials: "Credenciales inválidas",
        detailedView: "Vista detallada: {{item}}",
      },
    },
    de: {
      translation: {
        dashboard: "Dashboard",
        orders: "Bestellungen",
        menu: "Speisekarte",
        settings: "Einstellungen",
        totalRevenue: "Gesamtumsatz",
        pendingOrders: "Ausstehende Bestellungen",
        preparing: "In Zubereitung",
        averagePrepTime: "Durchschnittliche Zubereitungszeit",
        todaysOrders: "Heutige Bestellungen",
        clearFilters: "Alle",
        pending: "Ausstehend",
        ready: "Bereit",
        delivered: "Geliefert",
        language: "Sprache",
        english: "Englisch",
        spanish: "Spanisch",
        german: "Deutsch",
        orderId: "Bestellnummer",
        customer: "Kunde",
        items: "Artikel",
        total: "Gesamtbetrag",
        status: "Status",
        actions: "Aktionen",
        filters: "Filter",
        category: "Kategorie",
        search: "Suche",
        searchPlaceholder: "Nach Name oder Zutaten suchen",
        number: "Nummer",
        name: "Name",
        ingredients: "Zutaten",
        size: "Größe",
        price: "Preis",
        selectCategory: "Kategorie auswählen",
        allCategories: "Alle Kategorien",
        mostSoldDishes: "Meistverkaufte Gerichte",
        topCategories: "Top-Kategorien nach Verkauf",
        analytics: "Analysen",
        revenue: "Umsatz",
        overview: "Übersicht",
        reports: "Berichte",
        total_revenue_today: "Gesamtumsatz (heute)",
        minutes: "Minuten",
        dishRevenue: "Umsatz pro Gericht",
        categoryRevenue: "Umsatz pro Kategorie",
        login: "Anmelden",
        username: "Benutzername",
        password: "Passwort",
        logIn: "Anmelden",
        invalidCredentials: "Ungültige Anmeldeinformationen",
        detailedView: "Detailansicht: {{item}}",
        order_details: "Bestelldetails",
        time: "Zeit",
        changeStatus: "Status ändern",
        close: "Schließen"
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en"
    }
    return "en"
  })

  useEffect(() => {
    i18n.changeLanguage(language)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}