import goongAPI from 'src/apis/api.goong'
import { useQuery } from '@tanstack/react-query'

export const useGetLocation = (locationId: string) => {
  return useQuery({
    queryKey: ['locationDetail', locationId],
    queryFn: () => goongAPI.getLocationDetailById(locationId),
    enabled: !!locationId
  })
}
