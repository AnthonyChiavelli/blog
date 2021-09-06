import axios, { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'

export default {
  getBlogPosts(): Promise<AxiosResponse<IBlogPost[]>> {
    return axios.get('/api/posts/')
  },
  getBlogPost(id: string): Promise<AxiosResponse<IBlogPost>> {
    return axios.get(`/api/posts/${id}`)
  },
}
