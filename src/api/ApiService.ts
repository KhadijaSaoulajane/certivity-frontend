import axios from 'axios'
import { useQuery } from 'react-query'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

type CustomResponse = {
  message: string
}

type Page = {
  text: string
  html: string
  length: string
  sort: string
  createdAt: Date
  modifiedAt: Date
}

const useGetHelloWorld = () => {
  return useQuery<CustomResponse, Error>(['hello'], async () => {
    const response = await apiClient.get<CustomResponse>('/')
    return response.data
  })
}

const getURLContent = async (url) => {
    const response = await apiClient.get<Page[]>('/getPageContent?url='+url)
    return response.data

}

const getPages = async () => {
  const response = await apiClient.get<Page[]>('/getPages')
  return response.data;

}

const getAudits = async () => {
  const response = await apiClient.get<any>('/getAudits')
  return response.data
}

const addComment = async (pageID,comment) => {
  const response = await apiClient.post<any>('/addComment/'+pageID,comment);
  return response.data
}

const deleteComment = async (pageID,comment) => {
  const response = await apiClient.post<any>('/deleteComment/'+pageID,comment);
  return response.data
}


const ApiService = {
  useGetHelloWorld,
  getURLContent,
  getAudits,
  addComment,
  getPages,
  deleteComment
}
export default ApiService
