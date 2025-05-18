import { ref } from 'vue'
import type { SearchParams } from '@/utils/types'
import { useSearchHistory } from '@/stores/searchHistory'

const searchResults = ref<number[]>([])
const currentParams = ref<SearchParams>({
  rankedURL: '',
  searchTerms: '',
  searchEngine: 'Google',
  resultsAmount: 0,
})
const isLoading = ref(false)
const hasSearched = ref(false)

const generateRandomIntegers = (n: number) => {
  const denominator = 10
  const lowRand = Math.floor(Math.random() * n) || Math.round(Math.random())
  if (n <= denominator) return lowRand ? [lowRand] : []

  const maxCount = Math.floor(n / denominator)
  const count = Math.floor(Math.random() * maxCount)
  const set: Set<number> = new Set()

  while (set.size < count) {
    const rand = Math.floor(Math.random() * n) || 1
    set.add(rand)
  }

  return Array.from(set).sort((a, b) => a - b)
}

export const useMockApi = () => {
  const { addToSearchHistory } = useSearchHistory()
  const getCurrentURLMatches = ({
    rankedURL,
    searchTerms,
    searchEngine,
    resultsAmount,
  }: SearchParams) => {
    isLoading.value = true
    hasSearched.value = true
    currentParams.value = {
      rankedURL,
      searchTerms,
      searchEngine,
      resultsAmount,
    }
    const matches = generateRandomIntegers(resultsAmount)
    return new Promise((resolve) => {
      setTimeout(() => {
        searchResults.value = matches
        addToSearchHistory({
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          rankedURL,
          searchTerms,
          searchEngine,
          resultsAmount,
          searchResults: matches,
        })
        isLoading.value = false
        resolve({ data: { matches } })
      }, 500)
    })
  }

  return {
    getCurrentURLMatches,
    searchResults,
    isLoading,
    hasSearched,
    currentParams,
  }
}
