import Api from 'api'
import { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default function (): React.ReactElement {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = React.useState<IBlogPost | undefined>()
  React.useEffect(() => {
    Api.getBlogPost(id).then((res: AxiosResponse<IBlogPost>) => {
      setPost(res.data)
    })
  }, [])
  return (
    <Container>
      <div>pooost</div>
      <div>{post ? post.body : 'loading'}</div>
    </Container>
  )
}
