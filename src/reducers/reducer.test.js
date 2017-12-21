import { fromJS } from 'immutable'
import reducer from './reducer'
import { setParseResults, toggleSelectWord, selectWords, editWord } from '../actionCreators'

describe('reducer', () => {
    
    it('handles SET_PARSE_RESULTS correctly if initial state is undefined', () => {
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
                word1: { 
                    selected: false,
                    sentences: 'lorem ipsum word1\nlorem ipsum dolor word1'
                },
                word2: { 
                    selected: false,
                    sentences: 'lorem word2'
                },
                word3: { 
                    selected: false,
                    sentences: 'ipsum word3'
                },
            },
            selectionConfirmed: false
        }))
    })

    it('confirms words selection correctly', () => {
        const state = fromJS({
            words: {
                word1: {
                    selected: true,
                    sentences: 'Whatsover'
                },
                word2: {
                    selected: false,
                    sentences: 'Whatsover'
                }
            },
            selectionConfirmed: false
        })
        const nextState = reducer(state, selectWords())
        expect(nextState).toEqual(fromJS({
            selectedWords: {
                word1: {
                    word: 'word1',
                    sentences: 'Whatsover',
                    transLoading: false,
                    transLoaded: false
                }
            },
            selectionConfirmed: true
        }))
    })

    it('edits word and skip other values', () => {
        const state = fromJS({
            selectedWords: {
                word1: {
                    word: 'word1',
                    sentences: 'Original sentences',
                    tranlation: 'Original translation',
                    transcription: 'Original transcription'
                }
            }
        })
        const newState = reducer(state, editWord('word1', 'edited-word'))
        expect(newState).toEqual(fromJS({
            selectedWords: {
                word1: {
                    word: 'edited-word',
                    sentences: 'Original sentences',
                    tranlation: 'Original translation',
                    transcription: 'Original transcription'
                }
            }
        }))
    })

    it('resets existing state correctly when we set new parse results', () => {
        const existingState = fromJS({
            selectedWords: {
                oldWord1: { 
                    word: 'oldWord1', 
                    edit: false, 
                    sentences: ['sentence with oldWord1'] 
                },
                oldWord2: { 
                    word: 'oldWord2', 
                    edit: false, 
                    sentences: ['sentence with oldWord2'] 
                }
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
                newWord1: { 
                    selected: false,
                    sentences: 'lorem ipsum newWord1\nlorem ipsum dolor newWord1'
                },
                newWord2: { 
                    selected: false,
                    sentences: 'lorem newWord2'
                },
                newWord3: { 
                    selected: false,
                    sentences: 'ipsum newWord3'
                },
            },
            selectionConfirmed: false
        }))
    })
    
    it('handles TOGGLE_SELECT_WORD correctly', () => {
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