import React, { Fragment, useEffect } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment (props) {

    const {mode, transition, back, history} = useVisualMode(EMPTY)
 
    return (
        <article className="appointment">

            <Header 
                time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview && props.interview.student}
                    interviewer={props.interview && props.interview.interviewer}
                    onEdit={() => console.log("Clicked onEdit")}
                    onDelete={() => console.log("Clicked onADelete")}
                />
            )}
            {mode === CREATE && 
                <Form 

                    interviewers={props.interviewers}
                    onSave={() => {console.log("Clicked onSave!!")}}
                    onCancel={() => back()}

                />}

        </article>

    )
}

