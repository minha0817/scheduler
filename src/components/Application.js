import React, { useState , useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay , getInterview} from '../helpers/selector';

export default function Application(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })


  const setDay = (day) => setState( prev => ({ ...prev, day }));

  // const setDays = (days) => setState(prev => ({ ...prev, days }));


  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment 

        key={appointment.id}
        {...appointment}
        interview={interview}
      
      />
    )
  })

  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('./api/interviewers')
  ]).then((all) => {

    setState((prev) => ({
      ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
    }))

  })

  // useEffect(() => {
  //   console.log("interviewers data:" , state.interviewers)
  // },[state.interviewers])


  return (
    <main className="layout">

      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>

    </main>
  );
}
