import { useMutation } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase.config'

export const useUpload = () => {
  return useMutation({
    mutationFn: async (acceptedFile: File) => {
      const storageRef = ref(storage, `images/${acceptedFile.name}`)
      await uploadBytes(storageRef, acceptedFile)
      const downloadURL = await getDownloadURL(storageRef)
      console.log('downloadURL', downloadURL)
      return downloadURL
    }
  })
}
