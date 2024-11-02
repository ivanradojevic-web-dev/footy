<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLeagues } from '@/composables/useLeagues'
import LeagueNav from '@/components/LeagueNav.vue'

const { leagues, fetchLeagues } = useLeagues()

fetchLeagues()
</script>

<template>
  <header>
    <LeagueNav :leagues="leagues" />
  </header>

  <main class="container mx-auto">
    <RouterView />
  </main>
</template>
