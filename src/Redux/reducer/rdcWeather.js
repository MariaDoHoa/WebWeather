import actWeather from "../action/actWeather";

const initialState = {
    lsDataWeather: [],
    lsDetail: [],
    lsDays: ""
}
const rdcWeather = (state = initialState, { type, payload }) => {
    switch (type) {
        case actWeather.SET_DATA_WEATHER:
            return {
                ...state,
                lsDataWeather: payload
            }
        case actWeather.SET_DATA_DETAIL:
            return {
                ...state,
                lsDetail: payload
            }
        case actWeather.SET_DAYS:
            return {
                ...state,
                lsDays: state.lsDetail[payload]
            }
        default:
            return state
    }
}
export default rdcWeather;