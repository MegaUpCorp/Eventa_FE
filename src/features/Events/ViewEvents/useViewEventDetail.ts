import { useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import eventAPI from 'src/apis/api.event'

export const useViewEventDetail = (publicUrl:string) => {
    return useQuery({
      queryKey: ['event', publicUrl],
      queryFn: () => eventAPI.getEventDetail(publicUrl)
    })
}
