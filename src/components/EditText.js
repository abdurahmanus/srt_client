import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class EditText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editedText: this.props.text
        }
    }
    
    render() {
        const { text, edit, onEdit, onSave } = this.props

        return (
            <div>
                {!edit 
                    ? <button className="EditText--text" onClick={onEdit}>{text}</button>
                    : <input 
                        type="text"
                        ref="editField"
                        value={this.state.editedText}
                        onChange={e => this.edit(e.target.value)}
                        onBlur={() => onSave(this.state.editedText)} /> 
                }
            </div>
        )
    }

    edit(text) {
        this.setState(() => ({
            editedText: text
        }))
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.edit && this.props.edit) {
            const node = ReactDOM.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }
}