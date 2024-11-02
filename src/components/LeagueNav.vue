<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import type { LeagueDisplay } from '@/types/League'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{ leagues: LeagueDisplay[] }>()

// Select top 5 leagues
const topLeagues = props.leagues.filter(league =>
  ['eng.1', 'esp.1', 'ita.1', 'ger.1', 'fra.1'].includes(league.slug),
)

// Remaining leagues excluding the top 5
const remainingLeagues = props.leagues.filter(
  league =>
    !['eng.1', 'esp.1', 'ita.1', 'ger.1', 'fra.1'].includes(league.slug),
)

// Divide remaining leagues into 2 columns
const resourcesColumns = [
  remainingLeagues.slice(0, Math.ceil(remainingLeagues.length / 2)),
  remainingLeagues.slice(Math.ceil(remainingLeagues.length / 2)),
]
</script>

<template>
  <nav>
    <Popover class="relative isolate z-50 shadow">
      <div class="bg-white py-5">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <PopoverButton
            class="inline-flex items-center gap-x-1 text-sm font-semibold text-gray-900"
          >
            <div>Leagues</div>
            <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
          </PopoverButton>
        </div>
      </div>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <PopoverPanel
          v-slot="{ close }"
          class="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5"
        >
          <div
            class="mx-auto grid max-w-7xl grid-cols-3 gap-x-8 gap-y-10 px-6 py-10 lg:px-8"
          >
            <div class="col-span-3 md:col-span-1">
              <div class="text-sm font-medium text-gray-500">Top Leagues</div>
              <div class="mt-6 flow-root">
                <ul class="-my-2">
                  <li
                    v-for="league in topLeagues"
                    :key="league.slug"
                    class="list-none"
                  >
                    <RouterLink
                      class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900"
                      :to="{ name: 'league', params: { slug: league.slug } }"
                      @click="close"
                    >
                      <img
                        :src="league.logo"
                        :alt="`${league.name} logo`"
                        width="32"
                        height="32"
                      />
                      <span>{{ league.name }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-span-3 md:col-span-2 grid sm:grid-cols-2">
              <div
                v-for="(column, columnIndex) in resourcesColumns"
                :key="columnIndex"
              >
                <div class="sr-only">
                  Remaining Leagues Column {{ columnIndex + 1 }}
                </div>
                <div class="flow-root">
                  <ul class="-my-2">
                    <li
                      v-for="league in column"
                      :key="league.slug"
                      class="list-none"
                    >
                      <RouterLink
                        class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900"
                        :to="{ name: 'league', params: { slug: league.slug } }"
                        @click="close"
                      >
                        <img
                          :src="league.logo"
                          :alt="`${league.name} logo`"
                          width="32"
                          height="32"
                        />
                        <span>{{ league.name }}</span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </nav>
</template>
