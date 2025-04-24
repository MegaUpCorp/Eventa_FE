import { useGetListTransaction } from 'src/features/Admin/TransactionManagementAdmin/useGetListTransaction'
import ViewAllTransaction from 'src/features/Admin/TransactionManagementAdmin/ViewAllTransaction'

const TransactionManagementPage = () => {
   const { data: transList } = useGetListTransaction()
  return (
    <ViewAllTransaction transList={transList?.data || []} />
  )
}

export default TransactionManagementPage