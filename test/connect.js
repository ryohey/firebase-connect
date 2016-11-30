import React, { Component } from "react"
import { connect } from "../src/index"

describe("connect", () => {
  it("should pass props", () => {
    const TestComponent = connect({barProp: props => ({
      query: "",
      fetch: callback => {
        callback()
      }
    })})(props => {
      return <div />
    })
  
    const tree = TestUtils.renderIntoDocument(
      <TestComponent fooProp="bar" />
    )
  })

  it("should invoke fetch and set props", () => {

  })
})