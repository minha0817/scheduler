import { useState, useEffect } from "react"
import axios from "axios";


export default function useApplicationData () {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });
    
    // It sets the day inside state.
    const setDay = (day) => setState( prev => ({ ...prev, day }));
    
    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ]).then((all) => {

            setState((prev) => ({
            ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
            }))
    
        })
    },[]);

    // Function to update the remaining spots for each day.
    const updateSpots = function(update) {
        
        const index = state.days.findIndex(d => d.name === state.day)
        const dayObj = state.days[index]

        let spots = dayObj.spots

        if(update === "decrease") {
            spots = spots - 1
        }

        if(update === "increase"){
            spots = spots + 1
        }

        let day = {...dayObj,spots}
        let days = [...state.days]
        days[index] = day;

        return days
    }

    
    const bookInterview  = function (id, interview) { 

        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
    
        const appointments = {           
            ...state.appointments,
            [id]: appointment
        };

        const days = state.appointments[id].interview ? state.days : updateSpots("decrease") 

        return axios
            .put(`/api/appointments/${id}`, {interview})
            .then(() =>  setState({...state, appointments, days}))
    }
    
    
    const cancelInterview = function (id) {
    
        const appointment = {
            ...state.appointments[id],
            interview: null
        }
    
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        
        const days = updateSpots("increase")

        return axios
            .delete(`/api/appointments/${id}`)
            .then(() => setState({...state, appointments, days})) 
        }

    return {state, setDay, bookInterview, cancelInterview}

}
