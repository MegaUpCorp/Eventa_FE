import appwriteAPI from 'src/apis/api.appwrite'
import { useMutation } from '@tanstack/react-query'

export const useUpload = () => {
  return useMutation({
    mutationFn: appwriteAPI.upload
  })
}
