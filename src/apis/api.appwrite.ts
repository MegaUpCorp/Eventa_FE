import { ID } from 'appwrite'
import { appwriteStorage } from 'src/config/appwrite/appwrite'

const appwriteAPI = {
  upload: async (files: File) => {
    const response = await appwriteStorage.createFile(
      import.meta.env.VITE_APPWRITE_IMAGES_STORAGE_ID,
      ID.unique(),
      files
    )
    return response
  }
}

export default appwriteAPI
