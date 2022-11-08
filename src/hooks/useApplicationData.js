import { useState, useEffect } from "react"
import axios from "axios";


export function useApplicationData () {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    })
    
    //it sets the day inside state.
    const setDay = (day) => setState( prev => ({ ...prev, day }));
    
    // const setDays = (days) => setState(prev => ({ ...prev, days }));

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
    },[])


    const bookInterview  = function (id, interview) { //appointment id
        // console.log(interview, "interview in book interview")
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
    
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
    
        return axios
            .put(`/api/appointments/${id}`, {interview})
            .then(() =>  setState({...state, appointments}))
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
    
        return axios
            .delete(`/api/appointments/${id}`)
            .then(() => setState({...state, appointments})) 
        
        }
    

                //updateSpots
                //With getAppointmentsForDay, We have all the appointments for day and we can check if the interview is null or not.
                //When do we update? when create -> onSave happened. we minus one (update the state with the new number of spots in bookInterview funciton)
                //                   when confirm -> onConfirm happened. we plus one. (update the state with the new number of spots in the cancelInterview function )  
                    
    

    // day 
    // {
    //     id: 1,
    //     name: "Monday",
    //     appointments: [1,2,3,4,5]
    //     spots: 2      //이 spots을 업데이트해서 day를 setState 하는건 알겠는데...
    //   }


    return {state, setDay, bookInterview, cancelInterview, updateSpots}

}


