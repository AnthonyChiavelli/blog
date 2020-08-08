import * as React from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  Image,
  Heading,
  Flex,
  Text
} from 'rebass'

export default function() {
  return (
  <Flex flexDirection="column" alignItems="center" justifyContent="flex-start" pt={3}>
    <div>
      <Link to="/">Home</Link>
    </div>
   <div>
      <Link to="/blog">Blog</Link>
    </div>
  </Flex>
  )
}
