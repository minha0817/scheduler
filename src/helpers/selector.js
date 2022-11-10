
// Helper function to find an array of appointments for day
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

// Helper function to find interview
const getInterview = function(state, interview) {

    if(interview === null){
        return null;
    }
    return {...interview, interviewer: state.interviewers[interview.interviewer]}

}

// Helper function to find an array of interviewers for day
const getInterviewersForDay = function (state, day) {

    const filteredDay = state.days.find(user => user.name === day);

    if(filteredDay === undefined){
        return [];
    }

    const assortedInterviewers = filteredDay.interviewers

    const interviewers = assortedInterviewers.map((id) => {
        return state.interviewers[id]
    })

    return interviewers;

}

export {getAppointmentsForDay , getInterview, getInterviewersForDay }
