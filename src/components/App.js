import React, {useEffect, useState} from 'react';
import Stopwatch from './stopwatch/Stopwatch';
import style from './App.module.css';
import {fromEvent, timer} from "rxjs";
import {buffer, debounceTime, filter, map} from "rxjs/operators";

const App = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const intervalTime = timer(1000);
    const [run, setRun] = useState(false);
    useEffect(() => {
        let h = hours;
        let m = minutes;
        let s = seconds;
        let interval = null;
        interval = intervalTime.subscribe(() => {
            if (run) {
                s++;
                setSeconds(s);
                if (seconds >= 59) {
                    setSeconds(0);
                    m++;
                    setMinutes(m);
                    if (minutes >= 59) {
                        setMinutes(0);
                        h++;
                        setHours(h);
                    }
                }
            }
        });
        return () => interval.unsubscribe();
    }, [run, hours, minutes, seconds, intervalTime]);
    const buttonReset =() => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setRun(true);
    }


    const buttonStart = () => {
        setRun(true);
        setSeconds(0);
    }

    const buttonStop = () => {
        setRun(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }


    const buttonWait  = (e) => {
        const click$ = fromEvent(e.target, e.type);
        const doubleClick = click$.pipe(
            buffer(click$.pipe(debounceTime(300))),
            map(clicks => clicks.length),
            filter(clicksLength => clicksLength === 2));
        doubleClick.subscribe(() => {
            setRun(false);
        });
    }

    return (
        <div className={style.content}>
            <h2 className={style.headline}>Stopwatch</h2>
            <Stopwatch hours={hours} minutes={minutes} seconds={seconds}/>
            <button className={style.button} onClick={buttonStart}>start</button>
            <button className={style.button} onClick={buttonStop}>stop</button>
            <button className={style.button} onClick={buttonWait}>wait</button>
            <button className={style.button} onClick={buttonReset}>reset</button>
        </div>
    )
};
export default App;

