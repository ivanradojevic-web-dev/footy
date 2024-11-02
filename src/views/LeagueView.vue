<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ slug: string }>()
</script>

<template>
  <div>
    <h1>League: {{ props.slug }}</h1>
  </div>
</template>
