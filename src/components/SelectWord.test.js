import React from 'react'
import ReactDOM from 'react-dom'
import { 
    renderIntoDocument, 
    Simulate,
    scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils'
import SelectWord from './SelectWord'

describe('SelectWord', () => {
    
    it('invokes onToggle when checkbox changed', () => {
        let toggleInvoked = false
        const component = renderIntoDocument(
            <SelectWord onToggle={() => toggleInvoked = true} />
        )
        Simulate.change(ReactDOM.findDOMNode(component.refs.checkbox))

        expect(toggleInvoked).toEqual(true)
    })

    it('renders correct word', () => {
        const component = renderIntoDocument(
            <SelectWord word="some-word" />
        )
        const label = scryRenderedDOMComponentsWithTag(component, 'label')[0]
        
        expect(label.textContent).toContain('some-word')
    })

    it('renders checked checkbox correctly', () => {
        const component = renderIntoDocument(
            <SelectWord selected={true} onToggle={() => {}} />
        )
        const checkbox = ReactDOM.findDOMNode(component.refs.checkbox)
        
        expect(checkbox.checked).toEqual(true)
    })

    it('renders unchecked checkbox correctly', () => {
        const component = renderIntoDocument(
            <SelectWord selected={false} onToggle={() => {}} />
        )
        const checkbox = ReactDOM.findDOMNode(component.refs.checkbox)
        
        expect(checkbox.checked).toEqual(false)
    })
})