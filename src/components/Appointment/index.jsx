import React, { Fragment, useEffect } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"

export default function Appointment (props) { 
  
    const {mode, transition, back, history} = useVisualMode(props.interview ? SHOW : EMPTY)

    function save(name, interviewer){ 
        const interview = {             
          student: name,      
          interviewer
        }

        transition(SAVING)
        props.bookInterview(props.id, interview)
            .then(() =>  transition(SHOW))
        // transition(SHOW)
      }
    
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
                    onSave={save}
                    onCancel={() => back()}

                />}
            
            {mode === SAVING && 
                <Status 
                    message={"Saving..."}
                />}

        </article>

    )
}

