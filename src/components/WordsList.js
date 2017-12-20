import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SelectWord from './SelectWord'
import * as actionCreators from '../actionCreators'

export class WordsList extends PureComponent {
    render() {
        const { words, toggleSelectWord, selectWordsAndFetchTranslations } = this.props
        return (
            <div>
                {words.map((val, word) => (
                    <SelectWord
                        key={word}
                        word={word}
                        selected={val.get('selected')}
                        onToggle={e => toggleSelectWord(word)} />
                )).toArray()}
                {!!words.size && <button onClick={ selectWordsAndFetchTranslations }>Next -></button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    words: state.get('words')
})

export const WordsListContainer = connect(
    mapStateToProps,
    actionCreators
)(WordsList)