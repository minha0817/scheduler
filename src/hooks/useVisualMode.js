import React, {useState} from "react";

export default function useVisualMode(initial) {

    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); //[EMPTY, FORM]

    const transition = function(newMode, replace = false) {

        if(replace){

            const replacedHistory = [...history]
            replacedHistory[replacedHistory.length - 1] = newMode
            setHistory(replacedHistory)
            setMode(newMode)
            return 
        }


        const newHistory = [...history, newMode]
        setMode(newMode)
        setHistory(newHistory)
    }


    const back = function () {

        if(history.length === 1) {
            return 
        }

        const backToHistory = [...history]

        backToHistory.pop()

        setHistory(backToHistory)
        setMode(backToHistory[backToHistory.length - 1])
        
    }


    return {mode, transition, back, history}
}