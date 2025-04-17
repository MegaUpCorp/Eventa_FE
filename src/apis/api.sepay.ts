import { sepayInstance } from 'src/utils/sepayHttp'

const sepayAPI = {
  getBankAccounts: async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await sepayInstance.get<{ data: any[] }>('sepay/bank-accounts')
    return data.data
  }
}

export default sepayAPI
