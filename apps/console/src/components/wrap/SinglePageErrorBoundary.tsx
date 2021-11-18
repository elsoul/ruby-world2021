import React from 'react'

type State = {
  error?: Error | null
}

type Props = {
  children: React.ReactNode
  handleNotExistError: () => void
  handleNetworkError: () => void
}

export default class SinglePageErrorBoundary extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error): State {
    return { error: error }
  }

  render() {
    if (this.state.error) {
      if (this.state.error.message.includes("Couldn't find")) {
        this.props.handleNotExistError()
        return <></>
      } else {
        this.props.handleNetworkError()
        return <></>
      }
    }
    return this.props.children
  }
}
