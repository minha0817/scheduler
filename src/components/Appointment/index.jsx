import React, { Fragment, useEffect } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
            .catch(error => {transition(ERROR_SAVE, true)})

    }

    function confirm() {
        transition(DELETE, true)
        props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(error => {transition(ERROR_DELETE, true)})

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
            {mode === ERROR_SAVE && 
                <Error 
                    message={`Oopsy, Saving doesn't work at this moment. Please try again `}
                    onClose={() => back()}
                />
            }
            {mode === ERROR_DELETE && 
                <Error 
                    message={`Oopsy, Deleting doesn't work at this moment. Please try again `}
                    onClose={() => back()}
                />
            }
        </article>

    )
}

