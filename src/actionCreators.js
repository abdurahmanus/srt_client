import * as actions from './actions'
import debounce from 'lodash/debounce'
import { translate } from './api'

export const setParseResults = (results) => ({
    type: actions.SET_PARSE_RESULTS,
    results
})

export const toggleSelectWord = (word) => ({
    type: actions.TOGGLE_SELECT_WORD,
    word
})

export const selectWords = () => ({
    type: actions.SELECT_WORDS
})

export const selectWordsAndFetchTranslations = () => (dispatch, getState) => {
    dispatch(selectWords())
    getState().get('selectedWords').forEach((_, word) => {
        dispatch(fetchTranslation(word, word))
    })
}

export const editWord = (word, newWord) => ({
    type: actions.EDIT_WORD,
    word,
    newWord
})

export const editWordAndFetchTranslation = (word, newWord) => (dispatch) => {
    dispatch(editWord(word, newWord))
    dispatch(fetchTranslationDebounced(word, newWord))
}

export const editTranslation = (word, newTranslation) => ({
    type: actions.EDIT_TRANSLATION,
    word,
    newTranslation
})

export const editTranscription = (word, newTranscription) => ({
    type: actions.EDIT_TRANSCRIPTION,
    word,
    newTranscription
})

export const editSentences = (word, newSentences) => ({
    type: actions.EDIT_SENTENCES,
    word,
    newSentences
})

// todo: refactor this
// maybe use this: https://github.com/ryanseddon/redux-debounced
const innerFetch = (originalWord, word, dispatch) => {
    dispatch({
        type: actions.REQUEST_TRANSLATION,
        word: originalWord
    })

    translate(word).then(
        ({translation, transcription}) => dispatch({
            type: actions.RECEIVE_TRANSLATION,
            word: originalWord,
            translation,
            transcription
        }),
        err => console.log(err)
    )
}

// it works because inner function is only "created" once
const innerFetchDebounced = debounce(innerFetch, 500)

const fetchTranslation = (originalWord, word) => dispatch =>
    innerFetch(originalWord, word, dispatch)

const fetchTranslationDebounced = (originalWord, word) => dispatch => 
    innerFetchDebounced(originalWord, word, dispatch)