<template>
  <Button
    :label="isDark ? 'Dark' : 'Light'"
    :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
    @click="toggleDarkMode()"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
</script>

<style scoped></style>
