import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
