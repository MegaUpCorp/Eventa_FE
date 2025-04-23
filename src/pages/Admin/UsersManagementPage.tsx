import React from 'react'
import { useGetListUser } from 'src/features/Admin/UserManagement/useGetListUser'
import ViewUserManagement from 'src/features/Admin/UserManagement/viewUserManagement'

const UsersManagementPage = () => {
   const { data: users } = useGetListUser()
  return (
    <ViewUserManagement
    userList={users?.data || []}/>
  )
}

export default UsersManagementPage