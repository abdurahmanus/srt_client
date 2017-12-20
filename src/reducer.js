import { Map, fromJS } from 'immutable'
import * as actions from './actions'

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
                    word: word, 
                    sentences: map.get('sentences'),
                    transLoading: false,
                    transLoaded: false
                }))
        )
        .remove('words')
}

function editWord(state, word, newWord) {
    return state.updateIn(
        ['selectedWords', word, 'word'], 
        () => newWord
    )
}

function editTranslation(state, word, newTranslation) {
    return state.updateIn(
        ['selectedWords', word, 'translation'], 
        () => newTranslation
    )
}

function editTranscription(state, word, newTranscription) {
    return state.updateIn(
        ['selectedWords', word, 'transcription'], 
        () => newTranscription
    )
}

function editSentences(state, word, newSentences) {
    return state.updateIn(
        ['selectedWords', word, 'sentences'], 
        () => newSentences
    )
}

function requestTranslation(state, word) {
    return state.updateIn(
        ['selectedWords', word],
        wordData => wordData.merge({
            transLoading: true,
            transLoaded: false
        })
    )
}

function receiveTranslation(state, word, translation, transcription) {
    return state.updateIn(
        ['selectedWords', word],
        wordData => wordData.merge({
            translation: translation || '',
            transcription: transcription || '',
            transLoading: false,
            transLoaded: true
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
            return editWord(state, action.word, action.newWord)
        case actions.EDIT_TRANSLATION:
            return editTranslation(state, action.word, action.newTranslation)
        case actions.EDIT_TRANSCRIPTION:
            return editTranscription(state, action.word, action.newTranscription)
        case actions.EDIT_SENTENCES:
            return editSentences(state, action.word, action.newSentences)
        case actions.REQUEST_TRANSLATION:
            return requestTranslation(state, action.word)
        case actions.RECEIVE_TRANSLATION:
            return receiveTranslation(state, action.word, action.translation, action.transcription)
        default:
            return state
    }
}