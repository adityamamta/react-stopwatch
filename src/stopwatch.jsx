import React, {useEffect, useState, useRef} from 'react';
import icon from './icons.jsx';

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    const [record, setRecord] = useState([]);

    function timer() {
        setRecord(r => [...r, formatTime()]);
    }

    useEffect(() => {

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start() {
        if (!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;
        } else {
            setIsRunning(false);
        }
    }

    // function stop() {
    //     setIsRunning(false);
    // }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setRecord([]);
    }

    function formatTime() {

        let hours = Math.floor(elapsedTime / 1000 * 60 * 60);
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % (1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

 

    return (
        <>
            <div className="stopwatch">
                <h1 className="display-time">{formatTime()}</h1>
                <div className="controls">
                    {/* <button className="stop-btn" onClick={stop}>
                        {icon.stop}
                    </button> */}
                    <button className="reset-btn" onClick={reset}>
                        {icon.reset}
                    </button>
                    <button className="start-btn" onClick={start}>
                        {isRunning ? icon.pause : icon.play}
                    </button>
                    <button onClick={timer} className="timer-btn">
                        {icon.timer}
                    </button>
                </div>
            </div>

            <ul className="timer-list">
                {record.map((time, index) => 
                    <li key={index} className='timer-list-item'>
                        <span className='index'>{index + 1}.</span>
                        <span className="time">{time}</span>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Stopwatch;