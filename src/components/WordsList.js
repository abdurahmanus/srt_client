import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SelectWord from './SelectWord'
import { toggleSelectWord, selectWordsAndFetchTranslations } from '../actionCreators'

export class WordsList extends PureComponent {
    render() {
        const { words, onToggle, onConfirmSelection } = this.props
        return (
            <div>
                {words.map((wordData, word) => (
                    <SelectWord
                        key={word}
                        word={word}
                        selected={wordData.get('selected')}
                        onToggle={onToggle} />
                )).toArray()}
                {!!words.size && <button onClick={onConfirmSelection}>Next -></button>}
            </div>
        )
    }
}

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