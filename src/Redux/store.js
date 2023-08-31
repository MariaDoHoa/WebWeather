import { applyMiddleware, combineReducers, createStore } from "redux";
import rdcWeather from "./reducer/rdcWeather";
import createSagaMiddle from "redux-saga";
import sagaMiddleReSa from "./saga/sagaMiddleReSa";

const Saga = createSagaMiddle()
const globalState = combineReducers({
    dataManage: rdcWeather
})
const store = createStore(
    globalState,
    applyMiddleware(Saga)
)
export default store;
Saga.run(sagaMiddleReSa)