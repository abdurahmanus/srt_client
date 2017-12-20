import React from 'react'
import { connect } from 'react-redux'
import SelectWord from './SelectWord'
import { toggleSelectWord, selectWordsAndFetchTranslations } from '../actionCreators'

// todo: map immutable words Map to pure js array of objects via so-called Selector
export const WordsList = ({words, onToggle, onConfirmSelection}) => (
    <div>
        {words.map((wordData, word) => (
            <SelectWord
                key={word}
                word={word}
                selected={wordData.get('selected')}
                onToggle={() => onToggle(word)} />
        )).toArray()}
        {!!words.size && <button onClick={ onConfirmSelection }>Next -></button>}
    </div>
)

const mapStateToProps = (state) => ({
    words: state.get('words')
})

export const WordsListContainer = connect(
    mapStateToProps,
    {
        onToggle: toggleSelectWord,
        onConfirmSelection: selectWordsAndFetchTranslations
    }
)(WordsList)