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
        const toggleCallback = jest.fn()
        const component = renderIntoDocument(
            <SelectWord onToggle={toggleCallback} />
        )
        Simulate.change(ReactDOM.findDOMNode(component.refs.checkbox))

        expect(toggleCallback).toBeCalled()
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