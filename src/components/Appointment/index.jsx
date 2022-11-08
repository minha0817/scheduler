import React, { Fragment, useEffect } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

    }

    function confirm() {
        transition(DELETE)
        props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
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
                    onEdit={() => transition(EDIT)}
                    onDelete={() => transition(CONFIRM)}
                />
            )}
            {mode === CREATE && 
                <Form 

                    interviewers={props.interviewers}
                    onSave={save}
                    onCancel={() => back()}
                />}
            {mode === EDIT && 
                <Form
                    name={props.interview && props.interview.student}
                    interviewers={props.interviewers}
                    interviewer={props.interview && props.interview.interviewer.id}
                    onSave={save}
                    onCancel={() => back()}

                />}
            {mode === SAVING && 
                <Status 
                    message={"Saving..."}
                />}

            {mode === DELETE && 
                <Status 
                    message={"Deleting..."}
                />}
            
            {mode === CONFIRM && 
                <Confirm 
                    message={"Are you sure you want to cancel?"}
                    //
                    onCancel={() => transition(SHOW)}
                    onConfirm={confirm}
                />
            }
        </article>

    )
}

