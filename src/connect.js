import React, { Component } from "react"

export default function connect(observerMap) {
  return class extends Component {
    updateObservers() {
      const ownProps = Object.assign({}, this.props, this.state)
      const udpates = []

      _.entries(observerMap).forEach(e => {
        const key = e[0]
        const observer = e[1]
        const { query, fetch } = observer(ownProps)

        if (query === observer.currentQuery) {
          return
        }

        // stop current fetch
        if (observer.currentQuery) {
          if (observer.cancel) {
            observer.cancel()
            observer.cancel = null
          }
          observer.currentQuery = null
        }

        observer.currentQuery = query

        const update = () => 
          observer.cancel = fetch(value => {
            this.setState({
              [key]: value
            })
          })

        udpates.push(update)
      })

      updates.forEach(u => u())
    }

    componentDidMount() {
      this.updateObservers()
    }

    componentDidUpdate() {
      this.updateObservers()
    }

    componentDidUnmount() {
      Object.values(observerMap)
        .filter(o => o.cancel)
        .forEach(o => o.cancel())
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
}
