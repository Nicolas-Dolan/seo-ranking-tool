<template>
  <Panel header="Rankings">
    <div v-if="!hasSearched">Click submit to see results</div>
    <div v-else-if="isLoading">
      <Skeleton></Skeleton>
      <Skeleton v-for="i in 4" :key="i" width="5rem"></Skeleton>
    </div>
    <div v-else>
      <h3>
        Showing rankings of <strong>{{ currentParams.rankedURL }}</strong> when searching the
        keywords <strong>"{{ currentParams.searchTerms }}"</strong> on
        <strong>{{ currentParams.searchEngine }}</strong>
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

<style scoped></style>
