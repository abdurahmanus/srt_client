import React from 'react'
import { connect } from 'react-redux'

import { UploadContainer } from "./Upload"
import { WordsListContainer } from "./WordsList"
import { SelectedWordsContainer } from './SelectedWords'
import './App.css'

export const App = ({selectionConfirmed}) => (
  <div className="App">
    <UploadContainer />
    {!selectionConfirmed 
        ? <WordsListContainer /> 
        : <SelectedWordsContainer /> 
    }
  </div>
)

export const AppContainer = connect(state => ({
  selectionConfirmed: state.get('selectionConfirmed')
}))(App)