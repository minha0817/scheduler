import React, { useState , useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay} from '../helpers/selector';

export default function Application(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })


  const setDay = (day) => setState( prev => ({ ...prev, day }));

  // const setDays = (days) => setState(prev => ({ ...prev, days }));


  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentListItems = dailyAppointments.map(appointment => {
    return (
      <Appointment 

        key={appointment.id}
        {...appointment}
      
      />
    )
  })

  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments')
  ]).then((all) => {

    // console.log("all[0].data", all[0].data)
    // console.log("all[1].data", all[1].data)

    setState((prev) => ({
      ...prev, days: all[0].data, appointments: all[1].data
    }))
  })





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
        {appointmentListItems}
      </section>

    </main>
  );
}
