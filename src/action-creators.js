import * as actions from './actions'

export const setParseResults = results => ({
    type: actions.SET_PARSE_RESULTS,
    results
})

export const toggleSelectWord = word => ({
    type: actions.TOGGLE_SELECT_WORD,
    word
})

export const selectWords = () => ({
    type: actions.SELECT_WORDS
})

export const editWord = word => ({
    type: actions.EDIT_WORD,
    word
})

export const saveEditedWord = (word, editedWord) => ({
    type: actions.SAVE_EDITED_WORD,
    word,
    editedWord
})