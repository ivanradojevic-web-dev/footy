<script setup lang="ts">
import { defineProps, watchEffect } from 'vue'
import { useLeagueStandings } from '@/composables/useLeagueStandings'
import type { TeamStat } from '@/types/TeamStat'
import defaultLogo from '@/assets/default-logo.png'

const props = defineProps<{ slug: string }>()

const {
  leagueStandings,
  leagueName,
  seasonDisplay,
  fetchLeagueStandings,
  loading,
} = useLeagueStandings()

watchEffect(() => {
  fetchLeagueStandings(props.slug)
})

const getStatValue = (
  teamStat: TeamStat,
  statName: string,
): string | number => {
  const stat = teamStat.stats.find(s => s.name === statName)
  return stat ? stat.value : '-'
}
</script>

<template>
  <div class="bg-gray-900 py-10">
    <h1
      v-show="!loading"
      class="px-4 text-base font-semibold text-white sm:px-6 lg:px-8"
    >
      {{ leagueName }} - Season {{ seasonDisplay }}
    </h1>
    <table v-show="!loading" class="mt-6 w-full text-left">
      <thead class="border-b border-white/10 text-sm text-white">
        <tr>
          <th class="py-2 pl-4 pr-8 font-semibold">Team</th>
          <th class="py-2 pr-4 font-semibold">MP</th>
          <th class="py-2 pr-4 font-semibold">W</th>
          <th class="py-2 pr-4 font-semibold">D</th>
          <th class="py-2 pr-4 font-semibold">L</th>
          <th class="py-2 pr-4 font-semibold">GF</th>
          <th class="py-2 pr-4 font-semibold">PTS</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5 text-white">
        <tr v-for="teamStat in leagueStandings" :key="teamStat.team?.id">
          <td class="py-4 pl-4 pr-8">
            <div class="flex items-center gap-x-4">
              <img
                :src="teamStat.team?.logos?.[0]?.href || defaultLogo"
                alt=""
                class="h-8 w-8 rounded-full bg-gray-800"
              />
              <span
                >{{ getStatValue(teamStat, 'rank') || '-' }}.
                {{ teamStat.team?.displayName }}</span
              >
            </div>
          </td>
          <td class="py-4 pr-4">
            {{ getStatValue(teamStat, 'gamesPlayed') || '-' }}
          </td>
          <td class="py-4 pr-4">{{ getStatValue(teamStat, 'wins') || '-' }}</td>
          <td class="py-4 pr-4">{{ getStatValue(teamStat, 'ties') || '-' }}</td>
          <td class="py-4 pr-4">
            {{ getStatValue(teamStat, 'losses') || '-' }}
          </td>
          <td class="py-4 pr-4">
            {{ getStatValue(teamStat, 'pointsFor') || '-' }}
          </td>
          <td class="py-4 pr-4 font-semibold">
            {{ getStatValue(teamStat, 'points') || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
