<template>
  <Panel header="Rankings">
    <div v-if="!hasSearched">Click submit to see results</div>
    <div v-else>
      <h3>
        Showing rankings of <strong>{{ currentRankedURL }}</strong> when searching the keywords
        <strong>"{{ currentSearchTerms }}"</strong> on <strong>{{ currentSearchEngine }}</strong>
      </h3>
      <div v-if="!searchResults.length">
        {{ noMatchesMessage }}
      </div>
      <div v-else>
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
import { ref, computed } from 'vue'
import { useMockApi } from '@/composables/mockApi'
import Panel from 'primevue/panel'
import Tag from 'primevue/tag'

const {
  searchResults,
  hasSearched,
  isLoading,
  currentRankedURL,
  currentSearchTerms,
  currentSearchEngine,
  currentResultsAmount,
} = useMockApi()

const noMatchesMessage = computed(() => {
  return `No matches found in the first ${currentResultsAmount.value === 1 ? 'result' : currentResultsAmount.value + ' results'}`
})

const getResultSeverity = (result: number) => {
  if (result <= 10) return 'success'
  if (result <= 25) return 'warn'
  return 'danger'
}
</script>

<style scoped></style>
