import React, { useEffect, useState } from 'react'
import "./Hour.scss"

export default function Hour() {
    const [hour, setHour] = useState("")
    const [minute, setMinute] = useState("")
    const [second, setSecond] = useState("")
    useEffect(() => {
        let id = setInterval(() => {
            let t = new Date()
            let h = t.getHours()
            let m = t.getMinutes()
            let s = t.getSeconds()

            if (h < 10) {
                h = "0" + h
            }
            if (m < 10) {
                m = "0" + m
            }
            if (s < 10) {
                s = "0" + s
            }
            setHour(h)
            setMinute(m)
            setSecond(s)
        }, 1000);
        return () => clearInterval(id)
    }, [])
    const date = new Date().toLocaleString('en-Us', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <div className='Hour'>
            <h1>{hour}:{minute}:{second}</h1>
            <h4>{date}</h4>
        </div>
    )
}
