import Nav from 'components/Nav'
import BlogList from 'pages/BlogList'
import BlogPost from 'pages/BlogPost'
import Home from 'pages/Home'
import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

export default function (): React.ReactElement {
  return (
    <Container style={{ marginTop: '2em' }}>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Container>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/blog/">
              <BlogList />
            </Route>
            <Route exact path="/blog/:id">
              <BlogPost />
            </Route>
          </Container>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}
