import { ref, type Ref } from 'vue'
import axios from 'axios'
import type { League, LeagueDisplay } from '@/types/Leagues'

export function useLeagues() {
  const leagues: Ref<LeagueDisplay[]> = ref([])
  const fetched: Ref<boolean> = ref(false)

  const fetchLeagues = async () => {
    const cachedData = localStorage.getItem('leagues')
    if (cachedData) {
      leagues.value = JSON.parse(cachedData) as LeagueDisplay[]
      fetched.value = true
      return
    }

    if (!fetched.value) {
      try {
        const response = await axios.get<{ status: boolean; data: League[] }>(
          'https://football-standings-api.vercel.app/leagues',
        )
        leagues.value = response.data.data.map(league => ({
          name: league.name,
          logo: league.logos.light,
          slug: league.slug,
        }))

        // Cache the fetched data in localStorage
        localStorage.setItem('leagues', JSON.stringify(leagues.value))
        fetched.value = true
      } catch (error) {
        console.error('Error fetching leagues:', error)
      }
    }
  }

  return { leagues, fetchLeagues }
}
