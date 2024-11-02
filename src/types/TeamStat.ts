export interface TeamStat {
  team: {
    id: string
    displayName: string
    logos: { href: string }[]
  }
  stats: TeamStatDetail[]
}

export interface TeamStatDetail {
  name: string
  value: number | string
}
