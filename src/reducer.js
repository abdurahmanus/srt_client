import { Map, fromJS } from 'immutable'
import * as actions from './actions'

function setParseResults(state, newResults) {    
    
    const matches = newResults.matches.reduce((acc, m) => ({
        ...acc,
        [m.word]: m.sentences
    }), {})
    
    const words = newResults.words.reduce((acc, word) => ({
        ...acc,
        [word]: { selected: false, sentences: matches[word] }
    }), {})
    
    const newState = fromJS({ words, selectionConfirmed: false })
    return state
        .merge(newState)
        .remove('selectedWords')
}

function toggleSelectWord(state, word) {
    return state.updateIn(['words', word, 'selected'], selected => !selected)
}

function selectWords(state) {
    return state
        .set('selectionConfirmed', true)
        .set('selectedWords', 
            state
                .get('words')
                .filter(m => m.get('selected'))
                .map((map, word) => Map({ 
                    editedWord: word, 
                    edit: false, 
                    sentences: map.get('sentences') 
                }))
        )
        .remove('words')
}

function editWord(state, word) {
    return state.updateIn(
        ['selectedWords', word, 'edit'], 
        () => true
    )
}

function saveEditedWord(state, word, editedWord) {
    return state.updateIn(
        ['selectedWords', word], 
        map => map.merge({
            editedWord: editedWord,
            edit: false
        }) 
    )
}

export default function reducer(state = Map({
    words: Map(),
    selectionConfirmed: false
}), action) {
    switch(action.type) {
        case actions.SET_PARSE_RESULTS:
            return setParseResults(state, action.results)
        case actions.TOGGLE_SELECT_WORD:
            return toggleSelectWord(state, action.word)
        case actions.SELECT_WORDS:
            return selectWords(state)
        case actions.EDIT_WORD:
            return editWord(state, action.word)
        case actions.SAVE_EDITED_WORD:
            return saveEditedWord(state, action.word, action.editedWord)
        default:
            return state
    }
}