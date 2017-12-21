import * as actions from '../actions'

const word = (state, action) => {
    switch(action.type) {
        case actions.EDIT_WORD:
            return state.merge({
                word: action.newWord
            })
        case actions.EDIT_TRANSLATION:
            return state.merge({
                translation: action.newTranslation
            })
        case actions.EDIT_TRANSCRIPTION:
            return state.merge({
                transcription: action.newTranscription
            })
        case actions.EDIT_SENTENCES:
            return state.merge({
                sentences: action.newSentences
            })
        case actions.REQUEST_TRANSLATION:
            return state.merge({
                transLoading: true,
                transLoaded: false
            })
        case actions.RECEIVE_TRANSLATION:
            return state.merge({
                translation: action.translation || '',
                transcription: action.transcription || '',
                transLoading: false,
                transLoaded: true
            })
        default:
            return state
    }
}

export default word