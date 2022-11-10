import React, {useState} from "react";

export default function useVisualMode(initial) {

    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    const transition = function(mode, replace = false) {

        setMode(() => {
            return mode;
        });

        setHistory((prev) => {
            const current = [...prev];

            if(replace){
                current.pop();
            }

            current.push(mode);

            return current;
        })
    }


    const back = function () {

        if(history.length === 1) {
            return 
        }

        const backToHistory = [...history]

        backToHistory.pop()

        setHistory((history) => (backToHistory))
        setMode(backToHistory[backToHistory.length - 1])
        
    }


    return {mode, transition, back, history}
}