import Api from 'api'
import { AxiosResponse } from 'axios'
import { IBlogPost } from 'model'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon, Image, List } from 'semantic-ui-react'

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
          <List.Item key={a._id} style={{ marginBottom: 50 }}>
            <Container>
              <Header as={'h2'} style={{ marginBottom: 20 }}>
                {a.title}
              </Header>
              <AuthorAttribution article={a} />
              <Image src={a.imageUrl}></Image>
              <Container style={{ marginBottom: 15 }}>{a.blurb}</Container>
              <Link to={`/blog/${a._id}`}>
                <Button animated color="blue">
                  <Button.Content visible>Read On</Button.Content>
                  <Button.Content hidden>
                    <Icon name="reply" />
                  </Button.Content>
                </Button>
              </Link>
            </Container>
          </List.Item>
        ))}
      </List>
    </Container>
  )
}

function AuthorAttribution({ article }: { article: IBlogPost }) {
  return (
    <Container style={{ marginBottom: 15 }}>
      {moment(article.publishedAt).format('MMM D YYYY')} by Anthony Chiavelli
    </Container>
  )
}
