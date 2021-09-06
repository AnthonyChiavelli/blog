import Api from 'api'
import { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, List } from 'semantic-ui-react'

export default function (): React.ReactElement {
  const [articles, setArticles] = React.useState<IBlogPost[]>([])
  React.useEffect(() => {
    Api.getBlogPosts().then((res: AxiosResponse<IBlogPost[]>) => {
      setArticles(res.data)
    })
  }, [])
  return (
    <Container>
      <List>
        {articles.map((a) => (
          <List.Item key={a._id}>
            <Link to={`/blog/${a._id}`}>{a.title}</Link>
          </List.Item>
        ))}
      </List>
    </Container>
  )
}
