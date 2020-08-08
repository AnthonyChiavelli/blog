import { getDB } from 'database'

function createPromiseQuery<T>(queryString: string) {
  return new Promise<T>((resolve, reject) => {
    getDB().query(queryString, (error, results) => {
      if (error) reject(error)
      resolve(results)
    }) 
  })
}

export type ArticleCategory = 'woodworking' | 'voynich' | 'music'

export interface IArticle {
  id: number
  body: string
  category: string
}

export const Articles = {
  getAll: (): Promise<IArticle[]> => createPromiseQuery<IArticle[]>('SELECT * from articles'),
  getbyCategory: (category: ArticleCategory) => createPromiseQuery(`SELECT * from articles WHERE category="${category}"`),
  getOne: (id: number) => createPromiseQuery(`SELECT * from articles WHERE id=${id}`),
}
