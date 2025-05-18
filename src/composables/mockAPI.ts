import type { RequestParams } from '@/utils/types'

export const useMockApi = () => {
  const getCurrentURLMatches = (params: RequestParams) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: `Mocked response for ${JSON.stringify(params)}` })
      }, 1000)
    })
  }

  return { getCurrentURLMatches }
}
