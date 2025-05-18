export type SearchEngine = 'Google' | 'Bing' | 'Yahoo' | 'DuckDuckGo'

export interface SearchParams {
  rankedURL: string
  searchTerms: string
  searchEngine: SearchEngine
  resultsAmount: number
}

export interface SearchHistoryItem extends SearchParams {
  id: string
  timestamp: number
  searchResults: number[]
}
