import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { SearchHistoryItem } from '@/utils/types'

export const useSearchHistory = defineStore('searchHistory', () => {
  const searchHistory = useStorage<SearchHistoryItem[]>('searchHistory', [])

  function addToSearchHistory(item: SearchHistoryItem) {
    searchHistory.value.push(item)
  }

  function clearSearchHistory() {
    searchHistory.value.splice(0, searchHistory.value.length)
  }

  return { searchHistory, addToSearchHistory, clearSearchHistory }
})
