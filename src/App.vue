<script setup lang="ts">
import SeoForm from './components/SeoForm.vue'
import ResultsPanel from './components/ResultsPanel.vue'
import SearchHistoryTable from './components/SearchHistoryTable.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>SEO Keyword Ranking Tool</h1>
      <DarkModeToggle />
    </header>
    <SeoForm />
    <ResultsPanel />
    <SearchHistoryTable />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: min(2rem, 4%);
  padding-top: 1rem;
  max-width: 60rem;
  margin: auto;
}
</style>
