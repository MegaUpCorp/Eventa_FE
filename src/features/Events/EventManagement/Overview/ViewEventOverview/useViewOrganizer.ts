import { useQuery } from "@tanstack/react-query"
import organizerAPI from "src/apis/api.organizer"

const useOrganizer = (id?: string) => {
  return useQuery({
    queryKey: ['organizer', id],
    queryFn: () => organizerAPI.getOrganizerEventsById(id || ''),
    enabled: !!id // Chỉ gọi API khi id tồn tại
  })
}

export default useOrganizer