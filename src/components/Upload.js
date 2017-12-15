import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { connect } from 'react-redux'
import * as actionCreators from '../action-creators'

export class Upload extends Component {
    constructor(props) {
        super(props)
        this.onDrop = this.onDrop.bind(this)
    }

    render() {
        return (
            <div>
                <Dropzone name="srt" accept=".srt" multiple={false} onDrop={this.onDrop}>
                    Drop .srt file here
                </Dropzone>
            </div>
        )
    }

    onDrop(acceptedFiles, rejectedFiles) {
        if (acceptedFiles && acceptedFiles[0]) {
            const url = process.env.REACT_APP_API_URL
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