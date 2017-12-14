import { Map, List, fromJS } from 'immutable'
import reducer from './reducer'
import { setParseResults, toggleSelectWord } from './action-creators'

describe('reducer', () => {
    
    describe('SET_PARSE_RESULTS', () => {

        it('handles correctly if initial state is undefined', () => {
            const action = setParseResults({
                words: ['word1', 'word2', 'word3'],
                sentenses: ['lorem ipsum word1', 'lorem ipsum dolor word1', 'lorem word2', 'ipsum word3'],
                matches: [
                    { word: 'word1', sentences: ['lorem ipsum word1', 'lorem ipsum dolor word1'] },
                    { word: 'word2', sentences: ['lorem word2'] },
                    { word: 'word3', sentences: ['ipsum word3'] },
                ]
            })
            const nextState = reducer(undefined, action)
            
            expect(nextState).toEqual(fromJS({
                words: {
                    word1: { selected: false },
                    word2: { selected: false },
                    word3: { selected: false },
                },
                selectionConfirmed: false
            }))
        })
    
        it('resets existing state correctly', () => {
            const existingState = fromJS({
                words: {
                    oldWord1: { selected: true },
                    oldWord2: { selected: false }
                },
                selectionConfirmed: true
            })
            const action = setParseResults({
                words: ['newWord1', 'newWord2', 'newWord3'],
                sentenses: ['lorem ipsum newWord1', 'lorem ipsum dolor newWord1', 'lorem newWord2', 'ipsum newWord3'],
                matches: [
                    { word: 'newWord1', sentences: ['lorem ipsum newWord1', 'lorem ipsum dolor newWord1'] },
                    { word: 'newWord2', sentences: ['lorem newWord2'] },
                    { word: 'newWord3', sentences: ['ipsum newWord3'] },
                ]
            })
            const nextState = reducer(existingState, action)
    
            expect(nextState).toEqual(fromJS({
                words: {
                    newWord1: { selected: false },
                    newWord2: { selected: false },
                    newWord3: { selected: false },
                },
                selectionConfirmed: false
            }))
        })
    })
    
    describe('TOGGLE_SELECT_WORD', () => {
        
        it('handles it correctly', () => {
            const initialState = fromJS({
                words: {
                    word1: { selected: false },
                    word2: { selected: false },
                    word3: { selected: false },
                },
                selectionConfirmed: false
            })
            const action = toggleSelectWord('word2')
            const nextState = reducer(initialState, action)
            
            expect(nextState).toEqual(fromJS({
                words: {
                    word1: { selected: false },
                    word2: { selected: true },
                    word3: { selected: false },
                },
                selectionConfirmed: false
            }))
        })
    })
})

it('immutable test', () => {

    const m1 = Map({
        list: List.of('l1', 'l2', 'l3'),
        otherItem: true
    })
    expect(m1.updateIn(['list', 1], v => 'new l2')).toEqual(fromJS({
        list: ['l1', 'new l2', 'l3'],
        otherItem: true
    }))

})
