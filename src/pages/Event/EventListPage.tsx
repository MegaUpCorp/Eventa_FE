import React from 'react'
import ViewEventList from 'src/features/Events/ViewEvents/ViewEventList'
import { useGetEventList } from 'src/features/Events/ViewEvents/useGetEventList'

const EventListPage = () => {
  const {data: events} = useGetEventList();
  return(
    <ViewEventList eventData={events?.data || []} />
  )
}
export default EventListPage
