import React, { PureComponent } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { setParseResults } from '../actionCreators'
import { uploadSrt } from '../api'

export class Upload extends PureComponent {
    constructor() {
        super()
        this.dropHandler = this.dropHandler.bind(this)
    }
    
    render() {
        return (
            <div>
                <Dropzone 
                    name="srt" 
                    accept=".srt" 
                    multiple={false} 
                    onDrop={this.dropHandler}>
                    Drop .srt file here
                </Dropzone>
            </div>
        )
    }

    dropHandler(acceptedFiles, rejectedFiles) {
        if (acceptedFiles && acceptedFiles[0]) {
            uploadSrt(acceptedFiles[0])
                .then(
                    res => this.props.onUpload(res),
                    err => console.log(err)
                )
        }
    }
}

export const UploadContainer = connect(
    null,
    {
        onUpload: setParseResults
    }
)(Upload)