<template>
  <Panel header="Search History">
    <div class="buttons-container">
      <Button
        severity="secondary"
        label="Clear search history"
        size="small"
        @click="clearSearchHistory"
      />
      <Button
        severity="secondary"
        label="Clear filters"
        size="small"
        icon="pi pi-filter-slash"
        @click="clearFilters"
      />
    </div>
    <DataTable
      v-model:filters="filters"
      :value="searchHistory"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      sortField="timestamp"
      :sortOrder="-1"
      filterDisplay="menu"
      dataKey="id"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No results found</template>
      <Column
        field="searchResults"
        header="Ranking"
        sortable
        :sortField="customSortResults"
        style="width: 25%"
      >
        <template #body="{ data }">
          {{ displaySearchResults(data.searchResults) }}
        </template></Column
      >
      <Column
        field="searchEngine"
        header="Search Engine"
        filterField="searchEngine"
        filterMatchMode="in"
        style="width: 25%"
        :showFilterMatchModes="false"
      >
        <template #body="{ data }">
          {{ data.searchEngine }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="searchEngines"
            placeholder="Any"
            style="min-width: 14rem"
          >
            <template #option="slotProps">
              <span>{{ slotProps.option }}</span>
            </template>
          </MultiSelect>
        </template></Column
      >
      <Column field="searchTerms" header="Search Terms" style="width: 25%">
        <template #body="{ data }">
          {{ data.searchTerms }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by keyword"
          /> </template
      ></Column>
      <Column field="rankedURL" header="Ranked URL" style="width: 25%">
        <template #body="{ data }">
          {{ data.rankedURL }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by URL"
          /> </template
      ></Column>
      <Column
        field="resultsAmount"
        header="Results Considered"
        sortable
        style="width: 25%"
      ></Column>
      <Column field="timestamp" header="Search Date" sortable style="width: 25%">
        <template #body="{ data }">
          {{ convertTimestampToDate(data.timestamp) }}
        </template></Column
      >
    </DataTable>
  </Panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Column from 'primevue/column'
import { useSearchHistory } from '@/stores/searchHistory'
import { FilterMatchMode } from '@primevue/core/api'
import type { SearchEngine } from '@/utils/types'
import { convertTimestampToDate } from '@/utils/methods'

const { searchHistory, clearSearchHistory } = useSearchHistory()
const filters = ref({
  searchTerms: { value: null, matchMode: FilterMatchMode.CONTAINS },
  rankedURL: { value: null, matchMode: FilterMatchMode.CONTAINS },
  searchEngine: { value: null, matchMode: FilterMatchMode.IN },
})

const searchEngines: SearchEngine[] = ['Google', 'Bing', 'Yahoo', 'DuckDuckGo']

const displaySearchResults = (searchResults: number[]) => {
  return searchResults.length > 0 ? searchResults.join(', ') : 'No results found'
}

const customSortResults = (event) => {
  return event.searchResults?.[0] ?? 1001
}

const clearFilters = () => {
  filters.value.searchTerms.value = null
  filters.value.rankedURL.value = null
  filters.value.searchEngine.value = null
}
</script>

<style scoped lang="scss">
.buttons-container {
  display: flex;
  gap: 1rem;
}
</style>
