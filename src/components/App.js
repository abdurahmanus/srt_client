import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { UploadContainer } from "./Upload"
import { WordsListContainer } from "./WordsList"
import { SelectedWordsContainer } from './SelectedWords'
import './App.css'

export class App extends PureComponent {
  render() {
    const { selectionConfirmed } = this.props
    return (
      <div className="App">
        <UploadContainer />
        {!selectionConfirmed 
            ? <WordsListContainer /> 
            : <SelectedWordsContainer /> 
        }
      </div>
    )
  }
}

export const AppContainer = connect(state => ({
  selectionConfirmed: state.get('selectionConfirmed')
}))(App)