import { useQuery } from '@tanstack/react-query'
import AdminEventList from '../AdminEventList/AdminEventList'
import eventApi from 'src/apis/event.api'
import { Skeleton } from 'antd'

const TableEventList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['eventListPending'],
    queryFn: () => eventApi.getPendingEventListAdmin()
  })

  console.log(data?.data.data.events.length)
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event operator name</th>
            <th>Capacity</th>
            <th>Ticket price</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isFetching &&
            data?.data.data.events.length != 0 &&
            data?.data.data.events.map((event) => (
              <AdminEventList key={event._id} event={event} />
            ))}
          {isFetching && (
            <tr>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isFetching && data?.data.data.events.length == 0 && (
        <div className='flex justify-center items-center'>
          <h1 className='mt-2 text-white-A700'>There are no event pending</h1>
        </div>
      )}
    </div>
  )
}

export default TableEventList
