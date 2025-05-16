"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const menuData = [
  {
    category: "Pizza",
    items: [
      {
        number: 1,
        name: "Margherita",
        ingredients: "Tomatensoße, Mozarella",
        sizes: [
          { size: "Groß", price: 6 },
          { size: "Klein", price: 4.5 },
        ],
      },
      {
        number: 2,
        name: "Salami",
        ingredients: "Tomatensoße, Mozarella, Salami",
        sizes: [
          { size: "Groß", price: 7 },
          { size: "Klein", price: 5.5 },
        ],
      },
      {
        number: 3,
        name: "Schinken",
        ingredients: "Tomatensoße, Mozarella, Schinken",
        sizes: [
          { size: "Groß", price: 7 },
          { size: "Klein", price: 5.5 },
        ],
      },
      {
        number: 4,
        name: "Hawaii",
        ingredients: "Tomatensoße, Mozarella, Schinken, Ananas",
        sizes: [
          { size: "Groß", price: 7.5 },
          { size: "Klein", price: 6 },
        ],
      },
      {
        number: 5,
        name: "Vegetaria",
        ingredients: "Tomatensoße, Mozarella, Gemüse",
        sizes: [
          { size: "Groß", price: 7.5 },
          { size: "Klein", price: 6 },
        ],
      },
      {
        number: 6,
        name: "Tonno",
        ingredients: "Tomatensoße, Mozarella, Thunfisch",
        sizes: [
          { size: "Groß", price: 8 },
          { size: "Klein", price: 6.5 },
        ],
      },
      {
        number: 7,
        name: "Calzone",
        ingredients: "Tomatensoße, Mozarella, Schinken, Käse",
        sizes: [{ size: "Groß", price: 8 }],
      },
    ],
  },
  {
    category: "Pasta",
    items: [
      {
        number: 8,
        name: "Spaghetti Napoli",
        ingredients: "Spaghetti, Tomatensoße, Basilikum",
        sizes: [{ size: "-", price: 6 }],
      },
      {
        number: 9,
        name: "Spaghetti Aglio e Olio",
        ingredients: "Spaghetti, Knoblauch, Olivenöl, Chili",
        sizes: [{ size: "-", price: 6.5 }],
      },
      {
        number: 10,
        name: "Spaghetti Carbonara",
        ingredients: "Spaghetti, Eier, Pancetta, Pecorino Romano",
        sizes: [{ size: "-", price: 8 }],
      },
      {
        number: 11,
        name: "Spaghetti Bolognese",
        ingredients: "Spaghetti, Bolognese Soße",
        sizes: [{ size: "-", price: 8 }],
      },
      {
        number: 12,
        name: "Spaghetti Arrabiata",
        ingredients: "Spaghetti, Tomatensoße, Chili",
        sizes: [{ size: "-", price: 7 }],
      },
    ],
  },
  {
    category: "Auflauf",
    items: [
      {
        number: 54,
        name: "Veggi",
        ingredients: "Tomaten-Sahne-Sauce, Paprika, Mais, Champignons, Zwiebeln, Brokkoli",
        sizes: [{ size: "-", price: 8 }],
      },
      {
        number: 55,
        name: "Hawaii",
        ingredients: "Tomaten-Sahne-Sauce, Schinken, Ananas",
        sizes: [{ size: "-", price: 7.5 }],
      },
      {
        number: 56,
        name: "Hähnchen",
        ingredients: "Curry-Sahne-Sauce, Hähnchen, Ananas, Zwiebeln",
        sizes: [{ size: "-", price: 7.5 }],
      },
      {
        number: 57,
        name: "Sucuk",
        ingredients: "Tomaten-Sahne-Sauce, Knoblauchwurst, Zwiebeln, Tomaten, Oliven",
        sizes: [{ size: "-", price: 7.5 }],
      },
      {
        number: 58,
        name: "Kebab",
        ingredients: "Kebabfleisch, Curry-Sahne-Sauce, Peperoni, Zwiebeln, Oliven",
        sizes: [{ size: "-", price: 9 }],
      },
    ],
  },
  {
    category: "Salat",
    items: [
      {
        number: 59,
        name: "Mista",
        ingredients: "Romanasalat, Rucola, Champignon, Kirschtomaten, Karotten, Gurken",
        sizes: [{ size: "-", price: 7.5 }],
      },
      {
        number: 60,
        name: "Nizza",
        ingredients: "Romanasalat, Rucola, Thunfisch, gekochtes Ei, Oliven, Zwiebeln",
        sizes: [{ size: "-", price: 8 }],
      },
      {
        number: 61,
        name: "Cesare",
        ingredients: "Romanasalat, Croutons, Parmesan, Hähnchenbrustfilet",
        sizes: [{ size: "-", price: 8 }],
      },
      {
        number: 62,
        name: "Burrata",
        ingredients: "Romanasalat, Rucola, Gurken, Kirschtomaten, Burrata",
        sizes: [{ size: "-", price: 8 }],
      },
      {
        number: 63,
        name: "Pollo Salat",
        ingredients: "Romanasalat, Rucola, Kirschtomaten, Mais, Gurken, Hähnchenbrustfilet",
        sizes: [{ size: "-", price: 8 }],
      },
    ],
  },
]

export default function MenuPage() {
  const { t } = useTranslation()
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMenu = menuData.filter(
    (category) =>
      categoryFilter === "all" || category.category.toLowerCase() === categoryFilter.toLowerCase(),
  ).flatMap((category) =>
    category.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const categories = ["all", ...new Set(menuData.map((c) => c.category))]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">{t("menu")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("filters")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>{t("category")}</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? t("allCategories") : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>{t("search")}</Label>
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t("number")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("ingredients")}</TableHead>
                <TableHead className="text-left">{t("size")}</TableHead>
                <TableHead className="text-right">{t("price")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMenu.map((item) => (
                <TableRow key={item.number}>
                  <TableCell>{item.number}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.ingredients}</TableCell>
                  <TableCell colSpan={2}>
                    <div className="flex flex-col divide-y divide-gray-200">
                      {item.sizes.map((size) => (
                        <div 
                          key={`${item.number}-${size.size}`}
                          className="flex justify-between items-center py-1"
                        >
                          <span>{size.size !== "-" ? size.size : ""}</span>
                          <span>{size.price.toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

