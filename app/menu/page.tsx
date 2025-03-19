"use client"
import type { MenuItem } from "@/types/menu"
import type React from "react"

import { useState } from "react"

const menuData: MenuItem[] = [
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "1",
    Bezeichnung: "Margherita",
    Zutaten: "Tomatensoße, Mozarella",
    Preis: "6",
  },
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "2",
    Bezeichnung: "Salami",
    Zutaten: "Tomatensoße, Mozarella, Salami",
    Preis: "7",
  },
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "3",
    Bezeichnung: "Schinken",
    Zutaten: "Tomatensoße, Mozarella, Schinken",
    Preis: "7",
  },
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "4",
    Bezeichnung: "Hawaii",
    Zutaten: "Tomatensoße, Mozarella, Schinken, Ananas",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "5",
    Bezeichnung: "Vegetaria",
    Zutaten: "Tomatensoße, Mozarella, Gemüse",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "6",
    Bezeichnung: "Tonno",
    Zutaten: "Tomatensoße, Mozarella, Thunfisch",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Pizza",
    Standardzutaten: "Tomatensoße, Käse",
    Gerichtnummer: "7",
    Bezeichnung: "Calzone",
    Zutaten: "Tomatensoße, Mozarella, Schinken, Käse",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Pasta",
    Standardzutaten: "Nudeln, Tomatensoße",
    Gerichtnummer: "8",
    Bezeichnung: "Spaghetti Napoli",
    Zutaten: "Spaghetti, Tomatensoße, Basilikum",
    Preis: "6",
  },
  {
    Gerichtkategorie: "Pasta",
    Standardzutaten: "Nudeln, Tomatensoße",
    Gerichtnummer: "9",
    Bezeichnung: "Spaghetti Aglio e Olio",
    Zutaten: "Spaghetti, Knoblauch, Olivenöl, Chili",
    Preis: "6.5",
  },
  {
    Gerichtkategorie: "Pasta",
    Standardzutaten: "Nudeln, Tomatensoße",
    Gerichtnummer: "10",
    Bezeichnung: "Spaghetti Carbonara",
    Zutaten: "Spaghetti, Eier, Pancetta, Pecorino Romano",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Pasta",
    Standardzutaten: "Nudeln, Tomatensoße",
    Gerichtnummer: "11",
    Bezeichnung: "Spaghetti Bolognese",
    Zutaten: "Spaghetti, Bolognese Soße",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Pasta",
    Standardzutaten: "Nudeln, Tomatensoße",
    Gerichtnummer: "12",
    Bezeichnung: "Spaghetti Arrabiata",
    Zutaten: "Spaghetti, Tomatensoße, Chili",
    Preis: "7",
  },
  {
    Gerichtkategorie: "Auflauf",
    Standardzutaten: "Wird mit Nudeln zubereitet und Goudakäse überbacken",
    Gerichtnummer: "54",
    Bezeichnung: "Veggi",
    Zutaten: "saftiger Tomaten-Sahne-Sauce, Paprika, Mais, Champignons, Zwiebeln und Brokkoli",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Auflauf",
    Standardzutaten: "Wird mit Nudeln zubereitet und Goudakäse überbacken",
    Gerichtnummer: "55",
    Bezeichnung: "Hawaii",
    Zutaten: "Tomaten-Sahne-Sauce, Schinken und Ananas",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Auflauf",
    Standardzutaten: "Wird mit Nudeln zubereitet und Goudakäse überbacken",
    Gerichtnummer: "56",
    Bezeichnung: "Hähnchen",
    Zutaten: "Curry-Sahne-Sauce, Hähnchen, Ananas und Zwiebeln",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Auflauf",
    Standardzutaten: "Wird mit Nudeln zubereitet und Goudakäse überbacken",
    Gerichtnummer: "57",
    Bezeichnung: "Sucuk",
    Zutaten: "Tomaten-Sahne-Sauce, Knoblauchwurst (Sucuk), Zwiebeln, Tomaten und Oliven",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Auflauf",
    Standardzutaten: "Wird mit Nudeln zubereitet und Goudakäse überbacken",
    Gerichtnummer: "58",
    Bezeichnung: "Kebab",
    Zutaten: "Kebabfleisch, Curry-Sahne-Sauce, Peperoni, Zwiebeln und Oliven",
    Preis: "9",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "59",
    Bezeichnung: "Mista",
    Zutaten: "Romanasalat, Rucola, Champginon, Kirschtomaten, Karotten, rote Zwiebeln, Gurken, Paprika, Weißkäse",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "60",
    Bezeichnung: "Nizza",
    Zutaten: "Romanasalat, Rucola, Thunfisch, gekochtes Ei, Oliven, Zwiebeln",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "61",
    Bezeichnung: "Cesare",
    Zutaten: "Romanasalat, Croutons, Parmesan, Hähnchenbrustfilet",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "62",
    Bezeichnung: "Burrata",
    Zutaten: "Romanasalat, Rucola, Gurken, Kirschtomaten, Burrata",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "63",
    Bezeichnung: "Pollo Salat",
    Zutaten: "Romanasalat, Rucola, Kirschtomaten, Zwiebeln, Mais, Gurken und Hähnchenbrustfilet",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "64",
    Bezeichnung: "Tonno Salat",
    Zutaten: "Romanasalat, Rucola, Thunfisch, Mais und rote Zwiebeln",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "65",
    Bezeichnung: "Garnelen Salat",
    Zutaten: "Romanasalat, Rucola, Garnelen, Tomaten, Gurken und rote Zwiebeln",
    Preis: "9",
  },
  {
    Gerichtkategorie: "Salat",
    Standardzutaten: "Dressing: Joghurt, Honig-Senf, Cocktail",
    Gerichtnummer: "66",
    Bezeichnung: "Kebab Salat",
    Zutaten: "Kebab vom Drehspieß, Tomaten, Gurken, Zwiebeln",
    Preis: "8",
  },
  {
    Gerichtkategorie: "Baguettes",
    Standardzutaten:
      "Mit Salatbeilage und einer Sauce nach Wahl: Knoblauch, Kräuter-, Curry-, Joghurt- oder Cocktailsauce",
    Gerichtnummer: "67",
    Bezeichnung: "Baguette Prosciutto",
    Zutaten: "Schinken, Tomaten, Gurken",
    Preis: "6.5",
  },
  {
    Gerichtkategorie: "Baguettes",
    Standardzutaten:
      "Mit Salatbeilage und einer Sauce nach Wahl: Knoblauch, Kräuter-, Curry-, Joghurt- oder Cocktailsauce",
    Gerichtnummer: "68",
    Bezeichnung: "Baguette Salami",
    Zutaten: "Salami, Tomaten, Gurken",
    Preis: "6.5",
  },
  {
    Gerichtkategorie: "Baguettes",
    Standardzutaten:
      "Mit Salatbeilage und einer Sauce nach Wahl: Knoblauch, Kräuter-, Curry-, Joghurt- oder Cocktailsauce",
    Gerichtnummer: "69",
    Bezeichnung: "Baguette Hawaii",
    Zutaten: "Schinken, Ananas",
    Preis: "7",
  },
  {
    Gerichtkategorie: "Baguettes",
    Standardzutaten:
      "Mit Salatbeilage und einer Sauce nach Wahl: Knoblauch, Kräuter-, Curry-, Joghurt- oder Cocktailsauce",
    Gerichtnummer: "70",
    Bezeichnung: "Baguette Tonno",
    Zutaten: "Thunfisch, rote Zwiebeln",
    Preis: "7",
  },
  {
    Gerichtkategorie: "Baguettes",
    Standardzutaten:
      "Mit Salatbeilage und einer Sauce nach Wahl: Knoblauch, Kräuter-, Curry-, Joghurt- oder Cocktailsauce",
    Gerichtnummer: "71",
    Bezeichnung: "Baguette Kebab",
    Zutaten: "Kebab vom Drehspieß, Zwiebeln, Tomaten, Gurken",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Baguettes",
    Standardzutaten:
      "Mit Salatbeilage und einer Sauce nach Wahl: Knoblauch, Kräuter-, Curry-, Joghurt- oder Cocktailsauce",
    Gerichtnummer: "72",
    Bezeichnung: "Baguette Hackfleisch",
    Zutaten: "Rinderhackfleisch, Jalapenos, gekochtes Ei",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Kebab",
    Standardzutaten: "Krautsalat, Blattsalat, Tsatsiki, Cocktailsauce, rote Zwiebeln",
    Gerichtnummer: "74",
    Bezeichnung: "Kebab Pita",
    Preis: "6",
  },
  {
    Gerichtkategorie: "Kebab",
    Standardzutaten: "Krautsalat, Blattsalat, Tsatsiki, Cocktailsauce, rote Zwiebeln",
    Gerichtnummer: "75",
    Bezeichnung: "Kebab-Dürüm",
    Preis: "6.5",
  },
  {
    Gerichtkategorie: "Kebab",
    Standardzutaten: "Krautsalat, Blattsalat, Tsatsiki, Cocktailsauce, rote Zwiebeln",
    Gerichtnummer: "76",
    Bezeichnung: "Kebab-Teller mit Pommes",
    Preis: "8.5",
  },
  {
    Gerichtkategorie: "Kebab",
    Standardzutaten: "Krautsalat, Blattsalat, Tsatsiki, Cocktailsauce, rote Zwiebeln",
    Gerichtnummer: "77",
    Bezeichnung: "Falafel Pita",
    Preis: "5",
  },
  {
    Gerichtkategorie: "Kebab",
    Standardzutaten: "Krautsalat, Blattsalat, Tsatsiki, Cocktailsauce, rote Zwiebeln",
    Gerichtnummer: "78",
    Bezeichnung: "Falafel Dürüm",
    Preis: "6",
  },
  {
    Gerichtkategorie: "Kebab",
    Standardzutaten: "Krautsalat, Blattsalat, Tsatsiki, Cocktailsauce, rote Zwiebeln",
    Gerichtnummer: "79",
    Bezeichnung: "Falafel-Teller",
    Preis: "7.5",
  },
  {
    Gerichtkategorie: "Finger Food",
    Bezeichnung: "Chicken Wings",
    Zutaten: "8 knusprige Chicken Wings",
    Preis: "6",
  },
  {
    Gerichtkategorie: "Finger Food",
    Bezeichnung: "Chicken Strippers",
    Zutaten: "8 herzhaft panierte Hähnchenbruststreifen",
    Preis: "6",
  },
  {
    Gerichtkategorie: "Finger Food",
    Bezeichnung: "Chicken Box",
    Zutaten: "6 Chicken Wings, 6 Chicken Strippers, 6 Chicken Nuggets",
    Preis: "13.5",
  },
  {
    Gerichtkategorie: "Finger Food",
    Bezeichnung: "Pommes",
    Preis: "3",
  },
  {
    Gerichtkategorie: "Finger Food",
    Bezeichnung: "6er Chicken Nuggets",
    Preis: "4.5",
  },
  {
    Gerichtkategorie: "Finger Food",
    Bezeichnung: "9er Chicken Nuggets",
    Preis: "5.7",
  },
  {
    Gerichtkategorie: "Deals",
    Bezeichnung: "Burger Deal",
    Zutaten: "Burger nach Wahl + Pommes + 0,33l Getränk",
    Preis: "9.9",
  },
  // Add more deals here
]

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value)
  }

  const filteredMenuData = menuData.filter(
    (item) =>
      (categoryFilter === "all" || item.Gerichtkategorie === categoryFilter) &&
      ((item.Bezeichnung && item.Bezeichnung.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.Zutaten && item.Zutaten.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.Standardzutaten && item.Standardzutaten.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Suche..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="border border-gray-300 px-3 py-2 rounded"
        >
          <option value="all">Alle Kategorien</option>
          {Array.from(new Set(menuData.map((item) => item.Gerichtkategorie))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Nr.</th>
            <th className="border border-gray-300 p-2">Bezeichnung</th>
            <th className="border border-gray-300 p-2">Zutaten</th>
            <th className="border border-gray-300 p-2">Größe</th>
            <th className="border border-gray-300 p-2 text-right">Preis</th>
          </tr>
        </thead>
        <TableBody>
          {filteredMenuData.map((item) => (
            <TableRow key={item.Gerichtnummer}>
              <TableCell>{item.Gerichtnummer}</TableCell>
              <TableCell className="font-medium">{item.Bezeichnung}</TableCell>
              <TableCell>{item.Zutaten || item.Standardzutaten || "-"}</TableCell>
              <TableCell>{item.Größen ? item.Größen.map((g) => g.Größe).join(", ") : "-"}</TableCell>
              <TableCell className="text-right">
                {item.Größen ? item.Größen.map((g) => `${g.Größe}: ${g.Preis} €`).join(", ") : `${item.Preis} €`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  )
}

const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>
const TableRow = ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>
const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border border-gray-300 p-2">{children}</td>
)

