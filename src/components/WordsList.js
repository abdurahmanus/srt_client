import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SelectWord from './SelectWord'
import { toggleSelectWord, selectWordsAndFetchTranslations } from '../actionCreators'
import { getWords } from '../reducer'

export class WordsList extends PureComponent {
    render() {
        const { words, onToggle, onConfirmSelection } = this.props
        return (
            <div>
                {words.map(([word, wordData]) => (
                    <SelectWord
                        key={word}
                        word={word}
                        selected={wordData.get('selected')}
                        onToggle={onToggle} />
                ))}
                {!!words.size && <button onClick={onConfirmSelection}>Next -></button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    words: getWords(state)
})

export const WordsListContainer = connect(
    mapStateToProps,
    {
        onToggle: toggleSelectWord, 
        onConfirmSelection: selectWordsAndFetchTranslations
    }
)(WordsList)