import axios, { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'

export default {
  getBlogPosts(status: 'published' | 'draft' | 'all'): Promise<AxiosResponse<IBlogPost[]>> {
    return axios.get(`/api/posts/?status=${status}`)
  },
  getBlogPost(id: string): Promise<AxiosResponse<IBlogPost>> {
    return axios.get(`/api/posts/${id}`)
  },
  updateBlogPost(id: string, data: Partial<IBlogPost>): Promise<AxiosResponse<IBlogPost>> {
    return axios.patch(`/api/posts/${String(id)}`, data)
  },
  createBlogPost(data: Partial<IBlogPost>): Promise<AxiosResponse<IBlogPost>> {
    return axios.post(`/api/posts/`, data)
  },
  getAdminStatus(token: string): Promise<AxiosResponse<{ isAdmin: boolean }>> {
    return axios.get(`/api/adminStatus/?token=${token}`)
  },
}

// TODO set up circle CI
