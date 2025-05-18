import { ref } from 'vue'
import type { RequestParams } from '@/utils/types'

const searchResults = ref<number[]>([])
const currentRankedURL = ref('')
const currentSearchTerms = ref('')
const currentSearchEngine = ref('')
const currentResultsAmount = ref(0)
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
  const getCurrentURLMatches = ({
    rankedURL,
    searchTerms,
    searchEngine,
    resultsAmount,
  }: RequestParams) => {
    isLoading.value = true
    hasSearched.value = true
    currentRankedURL.value = rankedURL
    currentSearchTerms.value = searchTerms
    currentSearchEngine.value = searchEngine
    currentResultsAmount.value = resultsAmount
    const matches = generateRandomIntegers(resultsAmount)
    return new Promise((resolve) => {
      setTimeout(() => {
        searchResults.value = matches
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
    currentRankedURL,
    currentSearchTerms,
    currentSearchEngine,
    currentResultsAmount,
  }
}
