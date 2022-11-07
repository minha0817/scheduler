
const  getAppointmentsForDay  = function (state, day) {

    const filteredDay = state.days.find(user => user.name === day);

    if(filteredDay === undefined){
        return [];
    }

    const assortedAppointments = filteredDay.appointments 

    const result = assortedAppointments.map((id) => {
        return state.appointments[id]
    })

    return result;
};

// result of appointments
// {
//     0: {id: 1, time: '12pm', interview: null}
//     1: {id: 2, time: '1pm', interview: null}
//     2: {id: 3, time: '2pm', interview: null}
//     3: {id: 4, time: '3pm', interview: null}
//     4: {
    //     id: 5,
    //     time: "4pm",
    //     interview: {
    //     student: "Archie Cohen",
    //     interviewer: 2
//     }
// }


const getInterview = function(state, interview) {

    if(interview === null){
        return null;
    }
    return {...interview, interviewer: state.interviewers[interview.interviewer]}

}

//result of getInterview
// {
//     student: 'Archie Cohen',
//     interviewer: {
//       id: 2,
//       name: 'Tori Malcolm',
//       avatar: 'https://i.imgur.com/Nmx0Qxo.png'
//     }
//   }

const getInterviewersForDay = function (state, day) {

    const filteredDay = state.days.find(user => user.name === day);


    if(filteredDay === undefined){
        return [];
    }

    //this is an array. [1,2]
    const assortedInterviewers = filteredDay.interviewers

    const interviewers = assortedInterviewers.map((id) => {
        return state.interviewers[id]
    })

//interviewers an array of objects 
// [{  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }, {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   }]


    return interviewers;

}



export {getAppointmentsForDay , getInterview, getInterviewersForDay }
