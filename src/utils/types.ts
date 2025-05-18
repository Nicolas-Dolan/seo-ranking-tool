export type SearchEngine = 'Google' | 'Bing' | 'Yahoo' | 'DuckDuckGo'

export interface RequestParams {
  rankedURL: string
  searchTerms: string
  searchEngine: SearchEngine
  resultsAmount: number
}
