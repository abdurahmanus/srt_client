import React, { PureComponent } from 'react'

export class Download extends PureComponent {
    constructor() {
        super()
        this.download = this.download.bind(this)
    }
    
    render() {
        return (
            <button onClick={this.download}>Download \/</button>
        )
    }

    download() {
        const text = this._createText(this.props.words) 
        const file = new Blob(
            [text], 
            {type: 'text/plain'}
        )
        this._createLink(URL.createObjectURL(file))
            .click()
    }

    // TODO: Maybe move to some service function?
    // But in that case our component won't be reusable
    // Maybe parent (Smart) component should delegate this logic to service,
    // but in that case this component won't be useful at all.
    _createText(words) {
        return words
            .map(this._createLine)
            .toArray()
            .join('\r\n')
    }

    _createLine([_, wordData]) {
        return wordData.get('word') + 
            '\t' + wordData.get('translation') +
            '\t' + wordData.get('transcription') +
            '\t' + wordData.get('sentences')
    }

    _createLink(url) {
        const element = document.createElement('a')
        element.href = url
        element.download = 'result.txt'
        return element
    }
}