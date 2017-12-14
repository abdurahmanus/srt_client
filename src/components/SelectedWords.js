import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { EditText } from './EditText'
import * as actionCreators from '../action-creators'

export class SelectedWords extends PureComponent {
    render() {
        const { words, editWord, saveEditedWord } = this.props 
        return (
            <div>
                {words.map((map, word) => (
                    <div>
                        <EditText 
                            key={word} 
                            text={map.get('editedWord')}
                            edit={map.get('edit')}
                            onEdit={() => editWord(word)}
                            onSave={edited => saveEditedWord(word, edited)} />
                        <div>
                            {map.get('matches').map(m => (
                                <p>{m}</p>
                            ))}
                        </div>
                    </div>
                )).toArray()}
            </div>
        )
    }
}

export const SelectedWordsContainer = connect(
    state => ({
        words: state.get('selectedWords')
    }),
    actionCreators
)(SelectedWords)