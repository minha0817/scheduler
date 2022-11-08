import { useState, useEffect } from "react"
import axios from "axios";


export default function useApplicationData () {

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

//update spots

//1. daysOfWeek 으로 각각 day의 id 찾기 (Monday : 0 .....)
const findDayId = function (day) {
    const days = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4
    }
    return days[day]  // 0
}

const dayId = findDayId(state.day)

    const bookInterview  = function (id, interview) { //appointment id
        // console.log(interview, "interview in book interview")
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
    
        const appointments = {            //  {1:{appointment}, 2:{appointment}, .....} 
            ...state.appointments,
            [id]: appointment
        };
        //appointement
        // {
        //     "id": 1,
        //     "time": "12pm",
        //     "interview": {
        //         "student": "Archie Cohen",
        //         "interviewer": 4
        //     }
        // }

        let day = {
            ...state.days[dayId],
            spots: state.days[dayId].spots
        }

        if(!state.appointments[id].interview){
            day = {
                ...state.days[dayId],
                spots: state.days[dayId].spots - 1
            }
        } else {
            day = {
                ...state.days[dayId],
                spots: state.days[dayId].spots - 1
            }
        }


        let days = state.days
        days[dayId] = day;

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
        
        const day = {
            ...state.days[dayId],
            spots: state.days[dayId].spots + 1
        }

        let days = state.days
        days[dayId] = day

        return axios
            .delete(`/api/appointments/${id}`)
            .then(() => setState({...state, appointments, days})) 
        
        }

    return {state, setDay, bookInterview, cancelInterview}

}



//       state.days
// [{
//     "id": 1,
//     "name": "Monday",
//     "appointments": [
//         1,
//         2,
//         3,
//         4,
//         5
//     ],
//     "interviewers": [
//         1,
//         3,
//         4,
//         6,
//         7
//     ],
//     "spots": 2
// },
// ...
// ]