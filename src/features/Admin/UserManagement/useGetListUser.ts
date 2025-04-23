import { useQuery } from "@tanstack/react-query"
import adminAPI from "src/apis/api.admin"

export const useGetListUser = () => {

  return useQuery({
    queryKey: ['getMyCalendars'],
    queryFn: adminAPI.getUsers,
  })
}