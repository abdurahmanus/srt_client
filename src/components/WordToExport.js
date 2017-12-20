import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

export class WordToExport extends PureComponent {
    render() {
        const { 
            word,
            wordData, 
            editWordAndFetchTranslation, 
            editTranslation,
            editTranscription,
            editSentences
        } = this.props
        
        return (
            <tr>
                <td>
                    <input 
                        type="text" 
                        value={wordData.get('word')} 
                        onChange={e => editWordAndFetchTranslation(word, e.target.value)} />
                </td>
                <td>
                    {wordData.get('transLoading') ? 
                    '...' : 
                    <textarea 
                        value={wordData.get('translation')} 
                        onChange={e => editTranslation(word, e.target.value)} />}
                </td>
                <td>
                    {wordData.get('transLoading') ? 
                    '...' : 
                    <input 
                        value={wordData.get('transcription')} 
                        onChange={e => editTranscription(word, e.target.value)} />}
                </td>
                <td>
                    <textarea 
                        value={wordData.get('sentences')} 
                        onChange={e => editSentences(word, e.target.value)} />
                </td>
            </tr>
        )
    }
}

export const WordToExportContainer = connect(null, actionCreators)(WordToExport)