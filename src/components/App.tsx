import * as React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import { ThemeProvider } from 'emotion-theming';
// import preset from '@rebass/preset'

import {
  Box,
  Card,
  Image,
  Heading,
  Flex,
  Text
} from 'rebass'
import Nav from 'components/Nav'
import BlogPage from 'pages/blog'

export default function() {
  return (
    // <ThemeProvider>
      <BrowserRouter>
        <Flex flexDirection="row" height="100%">
          <Box width={1/12} height="100%" backgroundColor="tomato">
            <Nav/>
          </Box>
          <Box width={11/12} height="100%" padding={3}>
            <Switch>
              <Route exact path="/">
                Homebo
              </Route>
              <Route exact path="/blog/">
                <BlogPage/>
              </Route>
            </Switch>
          </Box>
        </Flex>
      </BrowserRouter>
    // </ThemeProvider>
  )
}

