
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



const getInterview = function(state, interview) {

    if(interview === null){
        return null;
    }

    return {...interview, interviewer: state.interviewers[interview.interviewer]}

}



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
