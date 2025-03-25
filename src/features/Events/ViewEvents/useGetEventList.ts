import { useQuery } from "@tanstack/react-query"
import eventAPI from "src/apis/api.event"

export const useGetEventList = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventAPI.getEvents
  })
}