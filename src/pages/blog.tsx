import React from 'react'
import Api from 'api'
import { AxiosResponse } from 'axios'
import { IArticle } from 'model'

export default function() {
  const [articles, setArticles] = React.useState<IArticle[]>([])
  React.useEffect(() => {
    Api.getArticles().then((res: AxiosResponse<IArticle[]>) => {
      setArticles(res.data)
    })
  })
  return (
    <div>
      Blog:
      {articles.map(a => (
        <div>{a.body}</div>
      ))}
    </div>
  )
}
