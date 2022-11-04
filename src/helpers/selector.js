


const  getAppointmentsForDay  = function (state, day) {

    const filteredDay = state.days.find(user => user.name === day);

    if(filteredDay === undefined){
        return [];
    }

    const assortedAppointments = filteredDay.appointments 

    const result = assortedAppointments.map((id) => {
        // console.log("result:", state.appointments[id])
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


export {getAppointmentsForDay , getInterview}

