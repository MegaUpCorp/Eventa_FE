import { Client, Storage } from 'appwrite'

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

if (!projectId) {
  throw new Error('Appwrite project ID is missing')
}

const appwriteClient = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(projectId)

export const appwriteStorage = new Storage(appwriteClient)
