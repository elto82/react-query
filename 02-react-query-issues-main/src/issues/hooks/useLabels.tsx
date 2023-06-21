import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Label } from "../interfaces/label"
import { sleep } from "../../helpers/sleep"

const getlabels = async (): Promise<Label[]> => {
  await sleep(2)
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100')
  // console.log(data)
  //data[0]
  return data
}

export const useLabels = () => {
  const labelsQuery = useQuery(
    ['labels'],
    getlabels,
    {
      staleTime: 1000 * 60 * 60,//update the data one hour
      //refetchOnWindowFocus: false,//no reload the data every time I go to the page
      //initialData: [ //sirbe la data del cache
      placeholderData: [
        {
          id: 2281766624,
          node_id: "MDU6TGFiZWwyMjgxNzY2NjI0",
          url: "https://api.github.com/repos/facebook/react/labels/,Component:%20Scheduling%20Profiler",
          name: "Component: Scheduling Profiler",
          color: "1dc3d6",
          default: false,
          description: "",
        },
        {
          id: 52079258,
          node_id: "MDU6TGFiZWw1MjA3OTI1OA==",
          url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20starter",
          name: "Difficulty: starter",
          color: "94ce52",
          default: false,
          description: '',
        }
      ]
    }
  )

  return labelsQuery

}