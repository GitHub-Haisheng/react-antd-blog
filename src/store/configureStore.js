import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { promiseMiddleware } from '../utils/redux';
export const history = hashHistory;
const reduxRouterMiddleware = routerMiddleware(hashHistory);
let createStoreWithMiddleware;
if (process.env.NODE_ENV !== 'production') {
    const devFuncs = [
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ];
    createStoreWithMiddleware = compose(applyMiddleware(reduxRouterMiddleware, thunkMiddleware, promiseMiddleware), ...devFuncs)(createStore); //调用 applyMiddleware，使用 middleware 增强 createStore：
}
else {
    createStoreWithMiddleware = compose(applyMiddleware(reduxRouterMiddleware, thunkMiddleware, promiseMiddleware))(createStore); //从右到左来组合多个函数。
}
export default function configureStore(rootReducer, initialState) {
    // return createStoreWithMiddleware(rootReducer, initialState)
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}
