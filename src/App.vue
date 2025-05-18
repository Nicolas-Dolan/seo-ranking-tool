<script setup lang="ts">
import SeoForm from './components/SeoForm.vue'
import ResultsPanel from './components/ResultsPanel.vue'
import SearchHistoryTable from './components/SearchHistoryTable.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
</script>

<template>
  <div class="wrapper">
    <DarkModeToggle />
    <h1>SEO Keyword Ranking Tool</h1>
    <SeoForm />
    <ResultsPanel />
    <SearchHistoryTable />
  </div>
</template>
