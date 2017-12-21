import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { WordToExportContainer } from './WordToExport'

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
                        {words.map((wordData, word) => (
                            <WordToExportContainer
                                key={word} 
                                word={word}
                                wordData={wordData} />
                        )).toArray()}
                    </tbody>
                </table>

                <button onClick={this.download.bind(this)}>Download</button>
            </div>
        )
    }

    download() {
        const text = this.props.words.map(wd => 
            `${wd.get('word')}\t${wd.get('translation')}\t${wd.get('transcription')}\t${wd.get('sentences')}`
        ).toArray().join('\r\n')
        const element = document.createElement('a')
        const file = new Blob([text], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download = 'result.txt'
        element.click()
    }
}

export const SelectedWordsContainer = connect(
    state => ({
        words: state.get('selectedWords')
    })
)(SelectedWords)