import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { WordToExportContainer } from './WordToExport'
import { getSelectedWords } from '../reducer'
import { Download } from './Download'

export class SelectedWords extends PureComponent {
    render() {
        const { words } = this.props 
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Слово</th>
                            <th>Перевод</th>
                            <th>Транскрипция</th>
                            <th>Предложения</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map(([word, wordData]) => (
                            <WordToExportContainer
                                key={word} 
                                word={word}
                                wordData={wordData} />
                        ))}
                    </tbody>
                </table>
                
                <Download words={words} />
            </div>
        )
    }
}

export const SelectedWordsContainer = connect(
    state => ({
        words: getSelectedWords(state)
    })
)(SelectedWords)