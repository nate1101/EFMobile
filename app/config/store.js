/* import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk));
export default store; */

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['notifications', 'user', 'token']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
