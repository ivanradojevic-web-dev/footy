import type { TeamStat } from './TeamStat'

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

export interface LeagueStandings {
  status: boolean
  data: {
    name: string
    abbreviation: string
    seasonDisplay: string
    season: number
    standings: TeamStat[]
  }
}
