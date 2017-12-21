import { Map, fromJS } from 'immutable'
import * as actions from '../actions'
import word from './word'

// todo: refactor (split to several reducers)
function setParseResults(state, newResults) {    
    
    const sentences = newResults.matches.reduce((acc, m) => ({
        ...acc,
        [m.word]: m.sentences.join('\n')
    }), {})
    
    const words = newResults.words.sort().reduce((acc, word) => ({
        ...acc,
        [word]: { selected: false, sentences: sentences[word] }
    }), {})
    
    const newState = fromJS({ words, selectionConfirmed: false })
    return state
        .merge(newState)
        .remove('selectedWords')
}

const toggleSelectWord = (state, word) => 
    state.updateIn(
        ['words', word, 'selected'], 
        selected => !selected
    )

const selectWords = (state) => 
    state
    .set('selectionConfirmed', true)
    .set('selectedWords', 
        state
            .get('words')
            .filter(m => m.get('selected'))
            .map((map, word) => Map({ 
                word: word, 
                sentences: map.get('sentences'),
                transLoading: false,
                transLoaded: false
            }))
    )
    .remove('words')

export default function reducer(
    state = Map({
        words: Map(),
        selectionConfirmed: false
    }), 
    action) {
    
    switch(action.type) {
        case actions.SET_PARSE_RESULTS:
            return setParseResults(state, action.results)
        case actions.TOGGLE_SELECT_WORD:
            return toggleSelectWord(state, action.word)
        case actions.SELECT_WORDS:
            return selectWords(state)
        case actions.EDIT_WORD:
        case actions.EDIT_TRANSLATION:
        case actions.EDIT_TRANSCRIPTION:
        case actions.EDIT_SENTENCES:
        case actions.REQUEST_TRANSLATION:
        case actions.RECEIVE_TRANSLATION:
            return state.updateIn(
                ['selectedWords', action.word],
                w => word(w, action)
            )
        default:
            return state
    }
}

// selectors
export const getWords = (state) => 
    state.get('words').entrySeq()

export const getSelectedWords = (state) =>
    state.get('selectedWords').entrySeq()