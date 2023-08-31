import React, { useEffect, useState } from 'react'
import "./Home.scss"
import { connect } from 'react-redux'
import actWeather from '../../Redux/action/actWeather'
import Hour from '../Hour/Hour'
import { type } from '@testing-library/user-event/dist/type'

function Home(props) {
    const [name, setName] = useState("")
    const [day, setDay] = useState("")

    const Search = (event) => {
        if (event.keyCode === 13) {
            let key = event.target.value
            props.GetDataWeather(key)
        }
    }
    const Handle = (name, lat, lon) => {
        props.GetDetail(name, lat, lon)
    }
    const HandleDays = (setday, i) => {
        props.GetDays(i)
    }
    const lsDetailDays = props.data.lsDays

    const sunrise = new Date(lsDetailDays.sunrise * 1000).toLocaleString('en-Us', { hour: '2-digit', minute: '2-digit' })
    const sunset = new Date(lsDetailDays.sunset * 1000).toLocaleString('en-Us', { hour: '2-digit', minute: '2-digit' })
    const moonrise = new Date(lsDetailDays.moonrise * 1000).toLocaleString('en-Us', { hour: '2-digit', minute: '2-digit' })
    const moonset = new Date(lsDetailDays.moonset * 1000).toLocaleString('en-Us', { hour: '2-digit', minute: '2-digit' })
    return (
        <div className='Home'>
            <div className='SearchWeather'>
                <div className='ImportSearch'>
                    <input onKeyDown={Search} placeholder='Search...' />
                    <p>Enter to Search</p>
                </div>
                {
                    props.data.lsDataWeather.map((n, i) => {
                        let lat = n.coord.lat
                        let lon = n.coord.lon
                        let name = n.name
                        return (
                            <div onClick={() => { Handle(setName(name), lat, lon) }} key={i} className='ResulftSearch'>
                                <h4><img src={`https://openweathermap.org/images/flags/${n.sys.country.toLowerCase()}.png`} /> {n.name}</h4>
                                <p><span>{Math.round(n.main.temp * 1 - 273)} °C</span> temperature from {Math.round(n.main.temp_min * 1 - 273)} to {Math.round(n.main.temp_max * 1 - 273)} °C <br />
                                    wind {n.wind.speed} m/s. clods {n.clouds.all}% <br />
                                    Geo coords [{n.coord.lat}, {n.coord.lon}]</p>
                            </div>
                        )
                    })
                }

            </div>
            <div className='DetailWeather'>
                <Hour />
                <div className='DetailWeatherrr'>
                    {
                        name ? <h1>{"Welcome to " + name}</h1> : ""
                    }
                    <div className='Car'>
                        {
                            props.data.lsDetail?.map((n, i) => {
                                const day = new Date(n.dt * 1000).toLocaleString('en-Us', { weekday: "short" })
                                return (
                                    <div key={i} onClick={() => { HandleDays(setDay(day), i) }} className='mainCar'>
                                        <div>
                                            <img src={`https://openweathermap.org/img/wn/${n.weather[0].icon}@2x.png`} />
                                            <h3>{day}</h3>
                                            <h4>{Math.round(n.temp.day)} °C</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <hr />
                <div className='DetailGetDays'>
                    {
                        day ? <h1>{day}day</h1> : ""
                    }
                    {
                        lsDetailDays ? <div className='mainCar'>
                            <div className='Car'>
                                <h3>Sun and Moon</h3>
                                <h4>Sunrise: {sunrise} </h4>
                                <h4>Sunset: {sunset} </h4>
                                <h4>Moonrise: {moonrise} </h4>
                                <h4>Moonset: {moonset} </h4>
                            </div>
                            <div className='Car'>
                                <h3>Temperature</h3>
                                <h4>Day: {Math.round(lsDetailDays.temp.day)} °</h4>
                                <h4>Min: {Math.round(lsDetailDays.temp.min)} °</h4>
                                <h4>Max: {Math.round(lsDetailDays.temp.max)} °</h4>
                                <h4>Night: {Math.round(lsDetailDays.temp.night)} °</h4>
                            </div>
                            <div className='Car'>
                                <h3>Feels like</h3>
                                <h4>Day: {Math.round(lsDetailDays.feels_like.day)} °</h4>
                                <h4>Night: {Math.round(lsDetailDays.feels_like.night)}  °</h4>
                                <h4>Evening: {Math.round(lsDetailDays.feels_like.eve)}  °</h4>
                                <h4>Morning: {Math.round(lsDetailDays.feels_like.morn)}  °</h4>
                            </div>
                            <div className='Car'>
                                <h3>Other</h3>
                                <h4>Wind degrees: {lsDetailDays.wind_deg} °</h4>
                                <h4>Wind speed: {lsDetailDays.wind_speed} m/s</h4>
                                <h4>Cloud: {lsDetailDays.clouds} %</h4>
                                <h4>UV: {lsDetailDays.uvi} </h4>
                            </div>
                        </div> : ""
                    }

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        data: globalState.dataManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetDataWeather: (key) => {
            dispath({
                type: actWeather.GET_DATA_WEATHER,
                payload: key
            })
        },
        GetDetail: (name, lat, lon) => {
            dispath({
                type: actWeather.GET_DATA_DETAIL,
                payload: {
                    name: name,
                    lat: lat,
                    lon: lon
                }
            })
        },
        GetDays: (i) => {
            dispath({
                type: actWeather.SET_DAYS,
                payload: i
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
