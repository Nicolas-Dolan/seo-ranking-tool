<template>
  <div v-tooltip="'Toggle Dark Mode'">
    <Button
      :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
      @click="toggleDarkMode()"
      rounded
      aria-label="Toggle Dark Mode"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
</script>

<style scoped></style>
