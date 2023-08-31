import { call, put, takeEvery } from "redux-saga/effects";
import actWeather from "../action/actWeather";

async function GetAPI(key) {
    let res = await fetch(`https://openweathermap.org/data/2.5/find?q=${key}&appid=439d4b804bc8187953eb36d2a8c26a02`)
    let data = await res.json()
    return data
}
function* GetDataWeather({ type, payload }) {
    let data = yield call(GetAPI, payload)
    yield put({
        type: actWeather.SET_DATA_WEATHER,
        payload: data.list
    })
}
async function GetKey(lat, lon) {
    let res = await fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=439d4b804bc8187953eb36d2a8c26a02`)
    let data = await res.json()
    return data
}
function* GetDetail({ type, payload }) {
    let data = yield call(GetKey, payload.lat, payload.lon)
    yield put({
        type: actWeather.SET_DATA_DETAIL,
        payload: data.daily
    })
}
function* mySaga(params) {
    yield takeEvery(actWeather.GET_DATA_WEATHER, GetDataWeather)
    yield takeEvery(actWeather.GET_DATA_DETAIL, GetDetail)
}
export default mySaga;