import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

export class Upload extends Component {
    render() {
        return (
            <div>
                <Dropzone 
                    name="srt" 
                    accept=".srt" 
                    multiple={false} 
                    onDrop={this.dropHandler.bind(this)}>
                    Drop .srt file here
                </Dropzone>
            </div>
        )
    }

    dropHandler(acceptedFiles, rejectedFiles) {
        if (acceptedFiles && acceptedFiles[0]) {
            const url = `${process.env.REACT_APP_API_URL}/upload`
            const req = request
                .post(url)
                .withCredentials()
            req.attach("srt", acceptedFiles[0])
            req.then(
                res => this.props.setParseResults(JSON.parse(res.text)),
                err => console.log(err)
            )
        }
    }
}

export const UploadContainer = connect(
    null,
    actionCreators
)(Upload)