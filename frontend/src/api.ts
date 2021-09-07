import axios, { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'

export default {
  getBlogPosts(publishedOnly = true): Promise<AxiosResponse<IBlogPost[]>> {
    return axios.get(`/api/posts/?includeDrafts=${!publishedOnly}`)
  },
  getBlogPost(id: string): Promise<AxiosResponse<IBlogPost>> {
    return axios.get(`/api/posts/${id}`)
  },
  getAdminStatus(token: string): Promise<AxiosResponse<{ isAdmin: boolean }>> {
    return axios.get(`/api/adminStatus/?token=${token}`)
  },
}

// TODO set up circle CI
