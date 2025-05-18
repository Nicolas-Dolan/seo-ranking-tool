export type SearchEngine = 'Google' | 'Bing' | 'Yahoo' | 'DuckDuckGo'

export interface RequestParams {
  url: string
  searchTerms: string
  searchEngine: SearchEngine
  resultsAmount: number
}
