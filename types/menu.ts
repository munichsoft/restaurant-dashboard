export type MenuItem = {
  Gerichtkategorie: string
  Gerichtnummer: string
  Bezeichnung: string
  Standardzutaten?: string
  Zutaten?: string
  Preis: string
  Größen?: Array<{ Größe: string; Preis: string }>
}

export type MenuCategory = {
  name: string
  items: MenuItem[]
}

