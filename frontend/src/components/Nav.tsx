import * as React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

export default function (): React.ReactElement {
  return (
    <Grid centered style={{ border: 'none !important', marginBottom: '20' }}>
      <Grid.Column>
        <Link to="/">Home</Link>
      </Grid.Column>

      <Grid.Column>
        <Link to="/blog">Blog</Link>
      </Grid.Column>
    </Grid>
  )
}
