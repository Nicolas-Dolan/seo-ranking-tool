<template>
  <Panel header="Rankings">
    <div v-if="!hasSearched">Click submit to see results</div>
    <div v-else-if="isLoading">
      <Skeleton class="skeleton-description"></Skeleton>
      <div class="skeleton-container">
        <Skeleton v-for="i in 4" :key="i" width="33px" height="31px"></Skeleton>
      </div>
    </div>
    <div v-else>
      <p class="results-description">
        Showing rankings of <span class="highlighted-text">{{ currentParams.rankedURL }}</span> when
        searching the keywords
        <span class="highlighted-text">"{{ currentParams.searchTerms }}"</span> on
        <span class="highlighted-text">{{ currentParams.searchEngine }}</span>
      </p>
      <div v-if="!searchResults.length">
        {{ noMatchesMessage }}
      </div>
      <div v-else class="results-container">
        <Tag
          v-for="result in searchResults"
          :key="result"
          :value="result"
          :severity="getResultSeverity(result)"
        ></Tag>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMockApi } from '@/composables/mockApi'
import Panel from 'primevue/panel'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'

const { searchResults, hasSearched, isLoading, currentParams } = useMockApi()

const noMatchesMessage = computed(() => {
  const { resultsAmount } = currentParams.value
  return `No matches found in the first ${resultsAmount === 1 ? 'result' : resultsAmount + ' results'}`
})

const getResultSeverity = (result: number) => {
  if (result <= 10) return 'success'
  if (result <= 25) return 'warn'
  return 'danger'
}
</script>

<style scoped lang="scss">
.results-description,
.skeleton-description {
  margin-bottom: 1rem;
}
.results-container,
.skeleton-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.highlighted-text {
  font-weight: bold;
  color: var(--text-color);
}
</style>
