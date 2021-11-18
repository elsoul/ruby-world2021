import React from 'react'

type State = {
  error?: Error | null
}

type Props = {
  children: React.ReactNode
  handleNetworkError: () => void
}

export default class PageTabErrorBoundary extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error): State {
    console.log(error)
    return { error: error }
  }

  render() {
    if (this.state.error) {
      this.props.handleNetworkError()
      return <></>
    }
    return this.props.children
  }
}
