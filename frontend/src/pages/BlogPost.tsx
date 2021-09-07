import Api from 'api'
import { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Container, Loader } from 'semantic-ui-react'

export default function (): React.ReactElement {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = React.useState<IBlogPost | undefined>()
  const [loading, setLoading] = React.useState<boolean>(false)
  React.useEffect(() => {
    Api.getBlogPost(id).then((res: AxiosResponse<IBlogPost>) => {
      setPost(res.data)
      setLoading(false)
    })
  }, [])

  if (loading || !post) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Section link as={Link} to="/blog">
          Blog
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section>{post.title}</Breadcrumb.Section>
      </Breadcrumb>
      <div>pooost</div>
      <div>{post ? post.body : 'loading'}</div>
    </Container>
  )
}
