import React, { Component } from 'react'
import { Header, Icon, Segment, Container } from 'semantic-ui-react'

type ErrorBoundaryProps = {}
type ErrorBoundaryState = {
  hasError: boolean
  errorMessage: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    
    this.state = { 
      hasError: false,
      errorMessage: ''
    }
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      errorMessage: error.message
    })
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Container style={{ paddingTop: '3em' }}>
          <Header as='h2'
            color='red'
            attached='top'
          >
            <Icon name='close' />
            Something went wrong
          </Header>
          <Segment attached>
            <h4>{this.state.errorMessage}</h4>
          </Segment>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary