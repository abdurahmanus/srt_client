import { Map, fromJS } from 'immutable'
import * as actions from './actions'

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

const editWord = (state, word, newWord) => 
    state.updateIn(
        ['selectedWords', word, 'word'], 
        () => newWord
    )

const editTranslation = (state, word, newTranslation) => 
    state.updateIn(
        ['selectedWords', word, 'translation'], 
        () => newTranslation
    )

const editTranscription = (state, word, newTranscription) => 
    state.updateIn(
        ['selectedWords', word, 'transcription'], 
        () => newTranscription
    )

const editSentences = (state, word, newSentences) => 
    state.updateIn(
        ['selectedWords', word, 'sentences'], 
        () => newSentences
    )

const requestTranslation = (state, word) =>
    state.updateIn(
        ['selectedWords', word],
        wordData => wordData.merge(fromJS({
            transLoading: true,
            transLoaded: false
        }))
    )

const receiveTranslation = (state, word, translation, transcription) =>
    state.updateIn(
        ['selectedWords', word],
        wordData => wordData.merge(fromJS({
            translation: translation || '',
            transcription: transcription || '',
            transLoading: false,
            transLoaded: true
        }))
    )

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