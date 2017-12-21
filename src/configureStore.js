import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import throttle from 'lodash/throttle'
import reducer from './reducers/reducer'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
        // other store enhancers if any
    )

    const persistedState = fromJS(loadState())
    const store = createStore(
        reducer, 
        persistedState, 
        enhancer
    )
    
    store.subscribe(throttle(() => {
        saveState(store.getState())
    }, 1000))
    
    return store
}

export default configureStore