import React, { useState, useEffect, useRef } from "react";

import "../styles/Stopwatch.css";

function Stopwatch () {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lapsArray, setLapsArray] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const lapStartTimeRef = useRef(0);

    useEffect (() => {
        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    // Start stopwatch
    const start = () => {
        if(!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;
            lapStartTimeRef.current = Date.now();           
        }
    }

    // Stop stopwatch
    const stop = () => {
        setIsRunning(false);
    }

    // Lap stopwatch
    const lap = () => {
        if(isRunning) {
            let newTime = formatTime(Date.now() - lapStartTimeRef.current);
            lapStartTimeRef.current = Date.now();
            setLapsArray((prevState) => {
                return [...prevState, newTime];
            });
        }
    }

    // Reset stopwatch
    const reset = () => {
        setElapsedTime(0);
        setLapsArray([]);
        setIsRunning(false);
    }

    // format the time to display
    const formatTime = (time) => {

        // let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / (1000) % 60);
        let milliseconds = Math.floor(time % 1000 / 10);

        // hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="container">
            <div className="stopwatch">
                <div className="display">
                    {formatTime(elapsedTime)}
                </div>
                <div className="controls">
                    <button onClick={start} className="start-button">Start</button>
                    <button onClick={stop} className="stop-button">Stop</button>
                    <button onClick={lap} className="lap-button">Lap</button>
                    <button onClick={reset} className="reset-button">Reset</button>
                </div>
            </div>
            <div className="lap-container">
                    {lapsArray.length > 0 &&
                        lapsArray.map((lap) => (<div key={lap} className="lap-time">Lap-{lapsArray.indexOf(lap) + 1}: {lap}</div>))
                    }
            </div>
        </div>
    );
}

export default Stopwatch;