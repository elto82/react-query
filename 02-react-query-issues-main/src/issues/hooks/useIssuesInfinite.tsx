import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces"
import { githubApi } from "../../api/githubApi"

interface Props {
  state: State
  labels: string[]
  page?: number
}

interface QueryProps {
  pageParam?: number
  queryKey: (string | Props)[]
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey
  const { state, labels } = args as Props

  const params = new URLSearchParams()
  if (state) params.append("state", state)
  if (labels.length > 0) {
    const labelsString = labels.join(",")
    params.append("labels", labelsString)
  }

  params.append("page", pageParam.toString())
  params.append("per_page", "5")

  const { data } = await githubApi.get<Issue[]>("/issues", { params })
  //console.log(data)
  return data
}

export const useIssuesInfinite = ({ state, labels, page }: Props) => {

  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinte', { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lasPage, pages) => {
        if (lasPage.length === 0) return
        return pages.length + 1
      },

    }

  )

  return {
    issuesQuery
  }

}

