import { useQuery } from "@tanstack/react-query"
import adminAPI from "src/apis/api.admin"

export const useGetListTransaction = () => {

  return useQuery({
    queryKey: ['getListTransaction'],
    queryFn: adminAPI.getAllTransactions,
  })
}