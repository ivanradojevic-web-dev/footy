import { ref } from 'vue'
import axios from 'axios'
import type { TeamStat } from '@/types/TeamStat'
import type { LeagueStandings } from '@/types/League'

export function useLeagueStandings() {
  const leagueStandings = ref<TeamStat[]>([])
  const leagueName = ref('')
  const seasonDisplay = ref('')
  const loading = ref(false)

  const fetchLeagueStandings = async (slug: string) => {
    loading.value = true
    try {
      const response = await axios.get<LeagueStandings>(
        `https://football-standings-api.vercel.app/leagues/${slug}/standings?season=2024&sort=asc`,
      )
      leagueStandings.value = response.data.data.standings
      leagueName.value = response.data.data.name
      seasonDisplay.value = response.data.data.seasonDisplay
    } catch (error) {
      console.error('Error fetching league standings:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    leagueStandings,
    leagueName,
    seasonDisplay,
    fetchLeagueStandings,
    loading,
  }
}
