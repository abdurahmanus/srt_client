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
                    <div key={word}>
                        <EditText 
                            text={map.get('editedWord')}
                            edit={map.get('edit')}
                            onEdit={() => editWord(word)}
                            onSave={edited => saveEditedWord(word, edited)} />
                        <div>
                            {map.get('sentences').map((m, idx) => (
                                <p key={idx}>{m}</p>
                            ))}
                        </div>
                    </div>
                )).toArray()}

                <button onClick={this.download.bind(this)}>Download</button>
            </div>
        )
    }

    download() {
        const text = 'Text\tto download\r\nNewLine'
        const element = document.createElement('a')
        const file = new Blob([text], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download = 'myFile.txt'
        element.click()
    }
}

export const SelectedWordsContainer = connect(
    state => ({
        words: state.get('selectedWords')
    }),
    actionCreators
)(SelectedWords)