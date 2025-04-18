/* eslint-disable @typescript-eslint/no-explicit-any */
import { sepayInstance } from 'src/utils/sepayHttp'

const sepayAPI = {
  getBankAccounts: async () => {
    const { data } = await sepayInstance.get<{ data: { data: any[] } }>('sepay/bank-accounts')
    return data.data.data
  }
}

export default sepayAPI
