import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SelectWord from './SelectWord'
import * as actionCreators from '../action-creators'

export class WordsList extends PureComponent {
    render() {
        const { words, toggleSelectWord, selectWords } = this.props
        return (
            <div>
                {!!words.size && <button onClick={ selectWords }>Next</button>}
                {words.map((val, word) => (
                    <SelectWord
                        key={word}
                        word={word}
                        selected={val.get('selected')}
                        onToggle={e => toggleSelectWord(word)} />
                )).toArray()}
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