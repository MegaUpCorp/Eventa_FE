import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CreditCard, MoreHorizontal, Search } from 'lucide-react'
import React, { useState, useMemo } from 'react'
import { Transaction } from 'src/@types/transaction.type'
import { User } from 'src/@types/users.type'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu'
import { Input } from 'src/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table'
import { useGetListUser } from '../UserManagement/useGetListUser'

type TransactionList = Transaction[]
const ViewAllTransaction: React.FC<{ transList: TransactionList }> = ({ transList }) => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const { data: userData } = useGetListUser()

  const getUsernameByAccountId = (accountId: string) => {
    if (!userData) return accountId

    const users = Array.isArray(userData) ? userData : userData.data

    if (!users || !Array.isArray(users)) return accountId

    const user = users.find((user: User) => user.id === accountId)
    return user ? `${user.username}` : accountId
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const calculateTotalRevenue = (transactions: TransactionList): number => {
    return transactions.reduce((sum, transaction) => {
      // Only count transactions with "paid" payment status (case insensitive)
      if (transaction.paymentStatus?.toLowerCase() !== 'paid') {
        return sum
      }

      const transactionTotal = transaction.total
        ? typeof transaction.total === 'string'
          ? parseFloat(transaction.total)
          : transaction.total
        : 0

      return !isNaN(transactionTotal) ? sum + transactionTotal : sum
    }, 0)
  }

  const totalRevenue = useMemo(() => {
    return calculateTotalRevenue(transList)
  }, [transList])

  return (
    <div className='flex-1 space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>Transactions Management</h2>
        <div className='bg-card p-4 rounded-lg shadow'>
          <div className='flex flex-col items-center '>
            <Button variant='outline'>
              <CreditCard className='mr-2 h-4 w-4' />
              <h3 className='text-lg font-medium'>Total Revenue</h3>
              <p className='text-2xl font-bold'>{totalRevenue.toLocaleString()} VND</p>
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction</CardTitle>
          <CardDescription>Manage your transaction and revenus.</CardDescription>
          <div className='flex items-center gap-2 pt-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search by user or transaction info...'
                className='w-full pl-8'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button variant='outline'>Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transList.map((trans) => (
                <TableRow key={trans.orderId}>
                  <TableCell className=''>
                    <div className='font-medium'>{getUsernameByAccountId(trans.accountID)}</div>
                    <div className='text-xs text-muted-foreground'>{trans.accountID}</div>
                  </TableCell>
                  <TableCell className='flex items-center gap-2'>
                    <div>
                      <div className='font-medium'>{trans.name}</div>
                      <div className='text-sm text-muted-foreground'>{trans.createdAt}</div>
                    </div>
                  </TableCell>
                  <TableCell>{trans.orderType === 'AdminProfit' ? '5% platform fee' : trans.orderType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trans.paymentStatus === 'Unpaid'
                          ? 'destructive'
                          : trans.paymentStatus === 'paid'
                            ? 'outline'
                            : 'default'
                      }
                      className='!text-white'
                    >
                      {trans.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{trans.paymentMethod}</TableCell>
                  <TableCell>
                    <div className='font-medium'>{trans.total.toLocaleString()} VND</div>
                  </TableCell>

                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit transaction</DropdownMenuItem>
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-destructive'>Suspend user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {transList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className='text-center py-4'>
                    No transactions found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Button variant='outline' size='sm'>
              Previous
            </Button>
            <Button variant='outline' size='sm'>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewAllTransaction
