import React, { useState , useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay , getInterview, getInterviewersForDay } from '../helpers/selector';
import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

                    //Application state when interview is null
                    // {
                    //   day: "",
                    //   days: [],
                    //   appointments: {
                    //     "1": {
                    //       id: 1,
                    //       time: "12pm",
                    //       interview: null
                    //     }
                    //   },
                    //   interviewers: {}
                    // }  
                    //-------------------------------------//
                    //How "days" look like 
                      // const days = [
                      //   {
                      //     id: 1,
                      //     name: "Monday",
                      //     spots: 2,
                      //   }
                      // ];

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {

    return (
      <Appointment 

        key={appointment.id}
        {...appointment}
        time={appointment.time}
        interviewers={interviewers}
        interview={getInterview(state, appointment.interview)}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
      />
    )
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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}

