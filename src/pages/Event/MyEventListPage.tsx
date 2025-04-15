import React from 'react'
import ViewMyEventList from 'src/features/Events/ViewEvents/ViewMyEventList';
import { useGetMyEventList } from 'src/features/Events/ViewEvents/useGetMyEventList'

const MyEventListPage = () => {
  const {data: events} = useGetMyEventList();
  return(
    <ViewMyEventList eventData={events?.data || []} />
  )
}
export default MyEventListPage
