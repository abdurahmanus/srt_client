import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'
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
                    <Textarea 
                        type="text" 
                        value={wordData.get('word')} 
                        onChange={e => editWordAndFetchTranslation(word, e.target.value)} />
                </td>
                <td>
                    {wordData.get('transLoading') ? 
                    '...' : 
                    <Textarea 
                        value={wordData.get('translation')} 
                        onChange={e => editTranslation(word, e.target.value)} />}
                </td>
                <td>
                    {wordData.get('transLoading') ? 
                    '...' : 
                    <Textarea 
                        value={wordData.get('transcription')} 
                        onChange={e => editTranscription(word, e.target.value)} />}
                </td>
                <td>
                    <Textarea 
                        value={wordData.get('sentences')} 
                        onChange={e => editSentences(word, e.target.value)}
                        onHeightChange={(height, instance) => console.log(height, instance.rowCount)} />
                </td>
            </tr>
        )
    }
}

export const WordToExportContainer = connect(null, actionCreators)(WordToExport)