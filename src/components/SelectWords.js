import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SelectWord from './SelectWord'
import { toggleSelectWord, selectWordsAndFetchTranslations } from '../actionCreators'
import { getWords } from '../reducers'

export class SelectWords extends PureComponent {
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

export const SelectWordsContainer = connect(
    mapStateToProps,
    {
        onToggle: toggleSelectWord, 
        onConfirmSelection: selectWordsAndFetchTranslations
    }
)(SelectWords)