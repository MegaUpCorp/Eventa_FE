import { useQuery } from '@tanstack/react-query'
import React from 'react'
import eventAPI from 'src/apis/api.event'
import EventList from 'src/components/Event/EventList'

const EventListPage = () => {
  const { data } = useQuery({
    queryKey: ['events'],
    queryFn: () => eventAPI.getEvents()
  })
  console.log("data", data)

  return(
    <EventList eventData={data?.data || []} />
  )
}
export default EventListPage
