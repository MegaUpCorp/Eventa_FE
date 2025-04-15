import { useQuery } from "@tanstack/react-query"
import eventAPI from "src/apis/api.event"

export const useGetMyEventList = () => {
  return useQuery({
    queryKey: ['myEvents'],
    queryFn: eventAPI.getMyEvents,
  })
}