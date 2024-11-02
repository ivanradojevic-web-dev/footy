export interface League {
  id: string
  name: string
  slug: string
  abbr: string
  logos: {
    light: string
    dark: string
  }
}

export interface LeagueDisplay {
  name: string
  logo: string
  slug: string
}
