import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils'
import { EditText } from './EditText'

describe('EditText', () => {
    
    it('renders word', () => {
        const component = renderIntoDocument(
            <EditText text="test-word" />
        )
        const word = scryRenderedDOMComponentsWithClass(component, 'EditText--text')[0]

        expect(word.textContent).toContain('test-word')
    })
})